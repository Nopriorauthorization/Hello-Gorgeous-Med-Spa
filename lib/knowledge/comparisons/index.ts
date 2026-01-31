import type { KnowledgeEntry } from "../types";

export const COMPARISONS: readonly KnowledgeEntry[] = [
  {
    id: "comparisons.prp-vs-exosomes",
    topic: "PRP vs Exosomes — education-only comparison",
    category: "comparisons",
    explanation:
      "PRP and exosomes are discussed as regenerative options in some skin and hair contexts. Educationally, the differences that matter most are source, handling standards, and whether a protocol is appropriate for you. We don’t select a protocol online.",
    whatItHelpsWith: ["Understanding terms you’ve heard", "Knowing what questions to ask in consult"],
    whoItsFor: ["People exploring regenerative skincare or hair goals", "People comparing options without pressure"],
    whoItsNotFor: ["Anyone seeking a recommendation or protocol online", "Anyone seeking medical advice online"],
    commonQuestions: ["Which is better?", "What’s safer?", "How long until I see results (in general)?"],
    safetyNotes: [
      "No guarantees online; individual response varies.",
      "Selection and appropriateness require clinician evaluation.",
    ],
    escalationTriggers: ["infection", "fever", "severe pain", "allergic reaction"],
    relatedTopics: ["skincare.microneedling-basics", "expectations.gradual-skin-timelines", "safety.general-safety"],
    updatedAt: "2026-01-29T00:00:00.000Z",
    version: 1,
  },
  {
    id: "comparisons.microneedling-tiers",
    topic: "Microneedling tiers (Good / Better / Best) — conceptual only",
    category: "comparisons",
    explanation:
      "People often want a simple way to compare microneedling options. Educationally, “Good / Better / Best” is a concept—not a prescription. The right choice depends on your skin, goals, and downtime comfort, which is decided in a consult.",
    whatItHelpsWith: ["Understanding levels of intensity and commitment", "Setting realistic expectations"],
    whoItsFor: ["People who want to start gently", "People deciding how much downtime they can handle"],
    whoItsNotFor: ["Anyone seeking a protocol or number of sessions online"],
    commonQuestions: ["Which tier is right for me?", "How many sessions do I need?", "Is RF microneedling worth it?"],
    safetyNotes: [
      "No individualized recommendations online.",
      "Candidacy depends on skin type and history—consult required.",
    ],
    escalationTriggers: ["infection", "fever", "worsening redness spreading"],
    relatedTopics: ["skincare.microneedling-basics", "expectations.gradual-skin-timelines", "aftercare.general-aftercare"],
    updatedAt: "2026-01-29T00:00:00.000Z",
    version: 1,
  },
  {
    id: "comparisons.skincare-brands-conceptual",
    topic: "Skincare brands (conceptual) — how to choose without hype",
    category: "comparisons",
    explanation:
      "Brand names matter less than fit. Educationally, the best skincare is the one your skin barrier tolerates and you can use consistently. “Medical‑grade” is often used loosely—look for evidence-informed ingredients, proper packaging, and a plan that matches your sensitivity.",
    whatItHelpsWith: ["Avoiding retail hype", "Understanding barrier-first selection", "Setting expectations for consistency"],
    whoItsFor: ["People overwhelmed by products", "People with sensitive or reactive skin"],
    whoItsNotFor: ["Anyone seeking a personalized product prescription online"],
    commonQuestions: ["Is medical-grade skincare real?", "Do I need more steps?", "Why does my skin react?"],
    safetyNotes: ["We can’t diagnose skin conditions online.", "For severe reactions, seek medical care."],
    escalationTriggers: ["hives", "trouble breathing", "severe swelling", "fever"],
    relatedTopics: ["skincare.skin-barrier", "safety.general-safety"],
    updatedAt: "2026-01-29T00:00:00.000Z",
    version: 1,
  },
] as const;

