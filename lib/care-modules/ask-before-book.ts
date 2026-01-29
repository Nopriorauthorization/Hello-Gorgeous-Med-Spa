import type { PersonaId } from "@/lib/personas/types";

export const ASK_BEFORE_BOOK_SUGGESTIONS = [
  "Botox vs Dysport—what’s the difference?",
  "How long does swelling last after filler?",
  "What’s normal after microneedling?",
  "I’m nervous—what does a first visit feel like?",
  "What are general safety considerations?",
] as const;

export type AskCategory = "reassurance" | "injectables" | "aesthetics" | "safety" | "unsure";

export const ASK_CATEGORIES: Array<{
  id: AskCategory;
  label: string;
  personaId: PersonaId;
}> = [
  { id: "reassurance", label: "Reassurance / first visit", personaId: "peppi" },
  { id: "injectables", label: "Injectables (Botox/Dysport)", personaId: "beau-tox" },
  { id: "aesthetics", label: "Fillers / facial aesthetics", personaId: "filla-grace" },
  { id: "safety", label: "Safety / eligibility (high-level)", personaId: "ryan" },
  { id: "unsure", label: "Not sure — route me", personaId: "peppi" },
];

export function suggestPersonaForQuestion(text: string): PersonaId {
  const t = text.toLowerCase();
  if (/(contraind|pregnan|breastfeed|medicat|blood thinner|allerg|infection|fever|antibiot|autoimmune|immun)/i.test(t))
    return "ryan";
  if (/(botox|dysport|jeuveau|tox|wrinkle relax|units|forehead|11s|crows)/i.test(t)) return "beau-tox";
  if (/(filler|lip|cheek|jaw|chin|nasolabial|marionette|hyaluronic|dissolv)/i.test(t))
    return "filla-grace";
  if (/(scared|anxious|nervous|first time|pain|hurt|needle)/i.test(t)) return "peppi";
  return "peppi";
}

