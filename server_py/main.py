import os
import re
import time
import asyncio
import io
from datetime import datetime
from typing import List
from collections import deque
from urllib.parse import urljoin, urlparse

import httpx
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
import numpy as np

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
PORT = int(os.getenv("PORT", "8787"))
GROQ_BASE_URL = "https://api.groq.com/openai/v1"

INDEX_TTL_SECONDS = 10 * 60
MAX_PAGES = 80
CRAWL_DEPTH = 2
CRAWL_TIMEOUT_SECONDS = 8
ALLOWED_HOSTS = {"www.bocra.org.bw", "bocra.org.bw"}
START_URLS = [
    "https://www.bocra.org.bw/",
    "https://www.bocra.org.bw/licensing",
    "https://www.bocra.org.bw/complaints",
    "https://www.bocra.org.bw/bocra-contact-details",
]
CORE_SOURCES = [
    "https://www.bocra.org.bw/profile",
    "https://www.bocra.org.bw/bocra-contact-details",
    "https://www.bocra.org.bw/licensing",
    "https://www.bocra.org.bw/complaints",
]
SITEMAP_URLS = [
    "https://www.bocra.org.bw/sitemap.xml",
    "https://www.bocra.org.bw/sitemap_index.xml",
]

index_state = {"built_at": 0, "pages": []}
embed_state = {"built_at": 0, "vectors": None, "urls": [], "texts": []}
EMBED_MODEL_NAME = os.getenv("EMBED_MODEL", "all-MiniLM-L6-v2")
EMBED_TTL_SECONDS = 30 * 60
_embedder = None

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def strip_text(text: str) -> str:
    return re.sub(r"\s+", " ", text or "").strip()


def extract_links(html: str, base_url: str):
    soup = BeautifulSoup(html, "html.parser")
    links = []
    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        if href.startswith("#") or href.startswith("mailto:") or href.startswith("tel:"):
            continue
        if re.search(r"\.(jpg|jpeg|png|gif|zip)$", href, re.I):
            continue
        url = urljoin(base_url, href)
        parsed = urlparse(url)
        if parsed.hostname in ALLOWED_HOSTS:
            links.append(url)
    return links


def extract_pdf_text(content: bytes) -> str:
    try:
        reader = PdfReader(io.BytesIO(content))
        text = ""
        for page in reader.pages:
            text += (page.extract_text() or "") + "\n"
        return strip_text(text)
    except Exception:
        return ""


async def fetch_page(client: httpx.AsyncClient, url: str):
    try:
        res = await client.get(url, headers={"User-Agent": "BOCRA-AI/1.0"}, timeout=20)
        if res.status_code != 200:
            return None
        content_type = res.headers.get("content-type", "")
        if "application/pdf" in content_type or url.lower().endswith(".pdf"):
            text = extract_pdf_text(res.content)
            if not text:
                return None
            return {"url": url, "text": text, "html": None}
        if "text/html" not in content_type:
            return None
        html = res.text
        soup = BeautifulSoup(html, "html.parser")
        for tag in soup(["script", "style", "noscript"]):
            tag.decompose()
        text = strip_text(soup.get_text(" "))
        return {"url": url, "text": text, "html": html}
    except Exception:
        return None


async def fetch_sitemap_links(client: httpx.AsyncClient):
    links = []
    for sitemap in SITEMAP_URLS:
        try:
            res = await client.get(sitemap, timeout=15)
            if res.status_code != 200:
                continue
            xml = res.text
            for loc in re.findall(r"<loc>([^<]+)</loc>", xml):
                url = loc.strip()
                parsed = urlparse(url)
                if parsed.hostname in ALLOWED_HOSTS:
                    links.append(url)
        except Exception:
            continue
    return links


async def fetch_core_sources():
    pages = []
    async with httpx.AsyncClient() as client:
        for url in CORE_SOURCES:
            page = await fetch_page(client, url)
            if page and page.get("text"):
                pages.append({"url": page["url"], "text": page["text"]})
    return pages


async def build_index():
    if time.time() - index_state["built_at"] < INDEX_TTL_SECONDS:
        return index_state["pages"]

    visited = set()
    queue = deque([(u, 0) for u in START_URLS])
    pages = []

    async with httpx.AsyncClient() as client:
        sitemap_links = await fetch_sitemap_links(client)
        for link in sitemap_links:
            if link not in visited and len(queue) < MAX_PAGES:
                queue.append((link, 0))

        while queue and len(pages) < MAX_PAGES:
            url, depth = queue.popleft()
            if url in visited:
                continue
            visited.add(url)

            page = await fetch_page(client, url)
            if not page or not page.get("text"):
                continue
            pages.append({"url": page["url"], "text": page["text"]})

            if depth < CRAWL_DEPTH and page.get("html"):
                for link in extract_links(page["html"], url):
                    if link not in visited and len(pages) + len(queue) < MAX_PAGES:
                        queue.append((link, depth + 1))

    index_state["pages"] = pages
    index_state["built_at"] = time.time()
    return pages


def get_embedder():
    global _embedder
    if _embedder is None:
        _embedder = SentenceTransformer(EMBED_MODEL_NAME)
    return _embedder


def build_embeddings(pages: List[dict]):
    texts = [p["text"][:2000] for p in pages]
    urls = [p["url"] for p in pages]
    embedder = get_embedder()
    vectors = embedder.encode(texts, convert_to_numpy=True, normalize_embeddings=True)
    embed_state.update(
        {"built_at": time.time(), "vectors": vectors, "urls": urls, "texts": texts}
    )
    return vectors, urls, texts


def semantic_search(query: str, top_k: int = 5):
    if embed_state["vectors"] is None or time.time() - embed_state["built_at"] > EMBED_TTL_SECONDS:
        pages = index_state.get("pages", [])
        if pages:
            build_embeddings(pages)
    if embed_state["vectors"] is None:
        return []
    embedder = get_embedder()
    qvec = embedder.encode([query], convert_to_numpy=True, normalize_embeddings=True)[0]
    sims = np.dot(embed_state["vectors"], qvec)
    idx = np.argsort(-sims)[:top_k]
    results = []
    for i in idx:
        results.append(
            {
                "url": embed_state["urls"][int(i)],
                "snippet": embed_state["texts"][int(i)][:420],
                "score": float(sims[int(i)]),
            }
        )
    return results


def score_page(page, terms):
    text = page["text"].lower()
    score = 0
    for term in terms:
        if not term:
            continue
        score += text.count(term)
    return score


async def retrieve_sources(query: str):
    try:
        pages = await asyncio.wait_for(build_index(), timeout=CRAWL_TIMEOUT_SECONDS)
    except Exception:
        pages = index_state.get("pages", [])
    if not pages:
        pages = await fetch_core_sources()
    terms = [
        t
        for t in re.sub(r"[^a-z0-9\s]", " ", query.lower()).split()
        if len(t) > 2
    ][:6]
    scored = sorted(
        [{"url": p["url"], "text": p["text"], "score": score_page(p, terms)} for p in pages],
        key=lambda x: x["score"],
        reverse=True,
    )
    top = [p for p in scored if p["score"] > 0][:5]
    if not top and scored:
        top = scored[:3]

    # Inject core sources for better coverage on BOCRA-wide questions
    q = query.lower()
    inject = []
    if "bocra" in q and any(k in q for k in ["about", "role", "mandate", "profile", "what does"]):
        inject.insert(0, "https://www.bocra.org.bw/profile")
    if any(k in q for k in ["contact", "address", "where", "office", "hours", "phone", "email"]):
        inject.append("https://www.bocra.org.bw/bocra-contact-details")
    if any(k in q for k in ["licence", "license", "licensing", "permit", "apply"]):
        inject.append("https://www.bocra.org.bw/licensing")
    if any(k in q for k in ["complaint", "complain", "report", "issue", "problem"]):
        inject.append("https://www.bocra.org.bw/complaints")

    core_texts = {p["url"]: p["text"] for p in pages}
    for url in inject + CORE_SOURCES:
        if url in core_texts and all(p["url"] != url for p in top):
            top.append({"url": url, "text": core_texts[url], "score": 0})

    max_score = max([p["score"] for p in scored], default=0)
    keyword_results = [{"url": p["url"], "snippet": p["text"][:420]} for p in top]

    # If keyword confidence is low, use semantic search
    if max_score < 2 and pages:
        sem = semantic_search(query, top_k=5)
        if sem:
            return [{"url": s["url"], "snippet": s["snippet"]} for s in sem], max_score

    return keyword_results, max_score


def reduce_query(text: str):
    tokens = re.sub(r"[^a-z0-9\s]", " ", text.lower()).split()
    return " ".join([t for t in tokens if len(t) > 3][:6])


def log_no_source_query(query: str):
    try:
        path = os.path.join(os.path.dirname(__file__), "no_source_queries.log")
        ts = datetime.utcnow().isoformat()
        with open(path, "a", encoding="utf-8") as f:
            f.write(f"{ts}\t{query}\n")
    except Exception:
        pass


def summarize_from_sources(sources: list):
    if not sources:
        return None
    text = " ".join([s.get("snippet", "") for s in sources if s.get("snippet")])
    sentences = re.split(r"(?<=[.!?])\s+", text)
    sentences = [s.strip() for s in sentences if len(s.strip()) > 30]
    if not sentences:
        return None
    overview = sentences[0]
    steps = sentences[1:4]
    return {
        "overview": overview,
        "steps": steps,
        "next_action": "Would you like me to open the relevant page on this site?",
    }


async def call_groq(message: str, history, sources):
    system = (
        "You are BOCRA's help desk assistant. Sound like a warm, professional receptionist. "
        "Use brief polite acknowledgements (e.g., 'Got it', 'Happy to help') and keep sentences short. "
        "Answer the user's question directly using the provided sources. "
        "Do not suggest visiting external websites; do not include URLs in the reply. "
        "Always offer a next step or ask a clarifying question. "
        "Never hallucinate. If unsure, say you do not have that information and offer contact details. "
        "Cite sources for every factual statement using the provided URLs only. "
        "Return JSON with keys: overview (string), steps (array of strings), "
        "next_action (string), sources (array of URLs)."
    )

    source_block = "\n\n".join(
        [f"Source {i+1}: {s['url']}\nSnippet: {s['snippet']}" for i, s in enumerate(sources)]
    ) or "No sources found."

    user_prompt = (
        f"User message:\n{message}\n\n"
        "Authoritative sources (use only these URLs):\n"
        f"{source_block}\n\nReturn JSON only."
    )

    messages = [
        {"role": "system", "content": system},
        *(history or []),
        {"role": "user", "content": user_prompt},
    ]

    payload = {"model": GROQ_MODEL, "messages": messages}

    headers = {"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"}
    async with httpx.AsyncClient() as client:
        res = await client.post(
            f"{GROQ_BASE_URL}/chat/completions",
            json=payload,
            headers=headers,
            timeout=30,
        )
        if res.status_code != 200:
            raise RuntimeError(f"Groq error: {res.status_code} {res.text}")
        return res.json()


async def call_groq_disambiguate(message: str):
    system = (
        "You are BOCRA's virtual receptionist. "
        "Your task is to disambiguate user intent into one of the options. "
        "Return JSON with keys: question (string) and options (array of strings). "
        "Do not include URLs."
    )
    options = [
        "Licensing",
        "Complaints",
        "Verify Licence",
        "Contact BOCRA",
        "Type Approval",
        "SIM Registration",
        "Report a Scam",
        "Consumer Rights",
    ]
    user_prompt = (
        f"User message: {message}\n"
        f"Return a short clarifying question and select up to 4 options from: {', '.join(options)}."
    )
    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user_prompt},
        ],
    }
    headers = {"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"}
    async with httpx.AsyncClient() as client:
        res = await client.post(
            f"{GROQ_BASE_URL}/chat/completions",
            json=payload,
            headers=headers,
            timeout=20,
        )
        if res.status_code != 200:
            raise RuntimeError(f"Groq error: {res.status_code} {res.text}")
        return res.json()


def safe_json_parse(text: str):
    try:
        return httpx.Response(200, content=text).json()
    except Exception:
        return None


def sanitize_reply(text: str):
    if not text:
        return text
    return re.sub(r"https?://\S+", "", text).strip()


@app.post("/api/chat")
async def chat(payload: dict):
    if not GROQ_API_KEY:
        raise HTTPException(status_code=500, detail="Missing GROQ_API_KEY on server")

    message = str(payload.get("message", "")).strip()
    if not message:
        raise HTTPException(status_code=400, detail="Missing message")

    if payload.get("mode") == "disambiguate":
        try:
            data = await call_groq_disambiguate(message)
            text = (
                data.get("choices", [{}])[0]
                .get("message", {})
                .get("content", "")
            )
            parsed = safe_json_parse(text)
            if not parsed:
                return {"question": "Which option best matches your request?", "options": ["Licensing", "Complaints", "Contact BOCRA"]}
            question = parsed.get("question") or "Which option best matches your request?"
            options = parsed.get("options") if isinstance(parsed.get("options"), list) else []
            options = [o for o in options if isinstance(o, str)][:4]
            if not options:
                options = ["Licensing", "Complaints", "Contact BOCRA"]
            return {"question": question, "options": options}
        except Exception as exc:
            raise HTTPException(status_code=500, detail=str(exc))

    history = payload.get("history", [])
    sources, max_score = await retrieve_sources(message)
    if max_score < 2 or len(sources) == 0:
        reduced = reduce_query(message)
        if reduced and reduced != message:
            sources, max_score = await retrieve_sources(reduced)
    if max_score < 2 or len(sources) == 0:
        log_no_source_query(message)
    try:
        data = await call_groq(message, history, sources)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    text = (
        data.get("choices", [{}])[0]
        .get("message", {})
        .get("content", "")
    )

    parsed = safe_json_parse(text)
    if not parsed or not isinstance(parsed.get("sources"), list):
        fallback = summarize_from_sources(sources)
        if fallback:
            reply_parts = []
            if fallback.get("overview"):
                reply_parts.append(f"Overview: {fallback['overview']}")
            if fallback.get("steps"):
                reply_parts.append("Steps:")
                reply_parts.extend([f"- {s}" for s in fallback["steps"]])
            if fallback.get("next_action"):
                reply_parts.append(f"Next action: {fallback['next_action']}")
            return {
                "reply": "\n".join(reply_parts).strip(),
                "sections": fallback,
                "sources": [s["url"] for s in sources],
            }
        return {
            "reply": "I do not have verified information for that question yet. Please contact BOCRA for details.",
            "sources": [s["url"] for s in sources],
        }

    overview = sanitize_reply(parsed.get("overview", ""))
    steps = parsed.get("steps") if isinstance(parsed.get("steps"), list) else []
    steps = [sanitize_reply(s) for s in steps if s]
    next_action = sanitize_reply(parsed.get("next_action", ""))

    reply_parts = []
    if overview:
        reply_parts.append(f"Overview: {overview}")
    if steps:
        reply_parts.append("Steps:")
        reply_parts.extend([f"- {s}" for s in steps])
    if next_action:
        reply_parts.append(f"Next action: {next_action}")

    reply_text = "\n".join(reply_parts).strip()
    if not reply_text:
        reply_text = "I do not have verified information for that question yet. Please contact BOCRA for details."

    return {
        "reply": reply_text,
        "sections": {
            "overview": overview,
            "steps": steps,
            "next_action": next_action,
        },
        "sources": parsed["sources"],
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)
