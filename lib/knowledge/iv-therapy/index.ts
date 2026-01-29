import type { KnowledgeEntry } from "../types";

export const IV_THERAPY: readonly KnowledgeEntry[] = [
  {
    id: "iv.iv-therapy-basics",
    topic: "IV therapy — education-first overview",
    category: "iv-therapy",
    explanation:
      "IV therapy is a clinician-guided service that typically involves screening and selecting an appropriate formulation based on safety considerations. Educationally, the focus is on hydration/wellness support, comfort, and clear expectations—not quick-fix promises.",
    whatItHelpsWith: ["Understanding screening and safety framing", "Expectation setting (time, comfort, oversight)"],
    whoItsFor: ["People exploring hydration and wellness support options", "People who want a safety-first approach"],
    whoItsNotFor: ["Anyone seeking individualized medical advice online", "Anyone with urgent symptoms (seek urgent care)"],
    commonQuestions: ["How long does it take?", "Is it safe?", "How do I prepare?"],
    safetyNotes: [
      "No diagnosis or prescribing online.",
      "Screening is required; eligibility depends on health history and clinician evaluation.",
    ],
    escalationTriggers: ["chest pain", "shortness of breath", "fainting", "severe allergic symptoms"],
    relatedTopics: ["safety.general-safety", "expectations.program-based-care"],
    updatedAt: "2026-01-29T00:00:00.000Z",
    version: 1,
  },
  {
    id: "iv.hydration-vs-nutrition",
    topic: "Hydration vs nutrition (education)",
    category: "iv-therapy",
    explanation:
      "Educationally, hydration is about fluid and electrolytes, while nutrition is about overall intake over time. IV therapy may support hydration in certain contexts, but it doesn’t replace balanced nutrition, sleep, stress support, or medical care.",
    whatItHelpsWith: ["Setting realistic expectations", "Reducing ‘quick fix’ thinking"],
    whoItsFor: ["People curious about IV wellness support", "People who want a grounded explanation"],
    whoItsNotFor: ["Anyone seeking medical advice for severe symptoms online"],
    commonQuestions: ["Will an IV fix my fatigue?", "Is IV better than supplements?", "How long do effects last?"],
    safetyNotes: ["Education only; screening and clinician oversight are required."],
    escalationTriggers: ["chest pain", "shortness of breath", "faint", "severe symptoms"],
    relatedTopics: ["iv.iv-therapy-basics", "safety.general-safety"],
    updatedAt: "2026-01-29T00:00:00.000Z",
    version: 1,
  },
  {
    id: "iv.vitamin-absorption-basics",
    topic: "Vitamin absorption basics (education)",
    category: "iv-therapy",
    explanation:
      "Educationally, vitamins can be taken orally or delivered through other routes. Absorption and how you feel can vary. What matters most is safety, appropriate screening, and a plan that supports your long-term habits—not a one-time rescue.",
    whatItHelpsWith: ["Reducing confusion", "Setting long-term expectations"],
    whoItsFor: ["People deciding between injections, IVs, and supplements (education)"],
    whoItsNotFor: ["Anyone seeking medical advice about deficiencies online"],
    commonQuestions: ["Is IV better than oral vitamins?", "Do I need labs?", "How often can I do it?"],
    safetyNotes: ["No diagnosis online; clinician screening is required."],
    escalationTriggers: ["severe symptoms", "allergic reaction", "trouble breathing"],
    relatedTopics: ["iv.iv-therapy-basics", "expectations.program-based-care"],
    updatedAt: "2026-01-29T00:00:00.000Z",
    version: 1,
  },
] as const;

