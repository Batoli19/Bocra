import { KB_ENTRIES } from "./kbData";

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

export function matchKb(text) {
  const t = normalize(text);
  if (!t) return null;
  for (const entry of KB_ENTRIES) {
    for (const kw of entry.keywords) {
      if (t.includes(kw)) return entry;
    }
  }
  return null;
}
