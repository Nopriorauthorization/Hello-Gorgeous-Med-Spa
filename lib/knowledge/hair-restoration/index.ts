import type { KnowledgeEntry } from "../types";

export const HAIR_RESTORATION: readonly KnowledgeEntry[] = [
  {
    id: "hair.hair-restoration-overview",
    topic: "Hair restoration — education-first overview",
    category: "hair-restoration",
    explanation:
      "Hair goals can have many causes. Educationally, the safest first step is an evaluation to understand history, timelines, and contributing factors. Online content can explain concepts and what questions to ask, but it can’t diagnose.",
    whatItHelpsWith: ["Knowing what to ask", "Understanding that evaluation matters", "Reducing confusion before booking"],
    whoItsFor: ["People exploring hair goals who want education-first guidance"],
    whoItsNotFor: ["Anyone seeking diagnosis or medication advice online"],
    commonQuestions: ["What causes shedding?", "What should I ask in a consult?", "How long do results take (in general)?"],
    safetyNotes: ["No diagnosis online.", "Seek medical care for severe or sudden symptoms."],
    escalationTriggers: ["sudden hair loss", "scalp infection", "fever", "severe symptoms"],
    relatedTopics: ["safety.general-safety", "expectations.gradual-skin-timelines"],
    updatedAt: "2026-01-29T00:00:00.000Z",
    version: 1,
  },
  {
    id: "hair.why-hair-loss-happens",
    topic: "Why hair loss happens (education)",
    category: "hair-restoration",
    explanation:
      "Hair shedding can have many contributors: stress, hormones, nutrition, genetics, postpartum changes, and medical conditions. Educationally, the safest first step is evaluation so you’re not guessing at the cause.",
    whatItHelpsWith: ["Reducing confusion", "Setting the expectation that causes vary"],
    whoItsFor: ["People noticing shedding or thinning", "People unsure where to start"],
    whoItsNotFor: ["Anyone seeking diagnosis online"],
    commonQuestions: ["Is this normal shedding?", "Could stress cause this?", "Do I need labs?"],
    safetyNotes: ["We can’t diagnose hair loss causes online.", "Seek care for sudden or severe changes."],
    escalationTriggers: ["sudden", "rapid", "scalp infection", "fever", "severe symptoms"],
    relatedTopics: ["hair.hair-restoration-overview", "safety.general-safety"],
    updatedAt: "2026-01-29T00:00:00.000Z",
    version: 1,
  },
  {
    id: "hair.prp-hair-basics",
    topic: "PRP for hair — basics (education)",
    category: "hair-restoration",
    explanation:
      "PRP is discussed as using your own blood-derived components in certain protocols. Educationally, hair timelines are slow—measured in months, not days. Consistency and realistic expectations matter.",
    whatItHelpsWith: ["Understanding PRP conceptually", "Setting patience and timeline expectations"],
    whoItsFor: ["People exploring hair restoration education", "People who want a non-sales overview"],
    whoItsNotFor: ["Anyone seeking a guaranteed result", "Anyone seeking individualized protocols online"],
    commonQuestions: ["How long until I see results?", "How many sessions are typical?", "Is it painful?"],
    safetyNotes: ["Selection requires consult.", "No diagnosis online."],
    escalationTriggers: ["infection", "fever", "severe pain"],
    relatedTopics: ["comparisons.prp-vs-exosomes", "expectations.program-based-care"],
    updatedAt: "2026-01-29T00:00:00.000Z",
    version: 1,
  },
] as const;

