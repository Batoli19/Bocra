import { INTENTS } from "./intentData";

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

export function matchIntent(text) {
  const t = normalize(text);
  if (!t) return null;

  for (const intent of INTENTS) {
    for (const kw of intent.keywords) {
      if (t.includes(kw)) {
        return intent;
      }
    }
  }

  return null;
}
