export type BeautyPriority =
  | "skin-glow"
  | "texture"
  | "fine-lines"
  | "facial-balance"
  | "wellness-energy"
  | "weight-confidence";

export const BEAUTY_PRIORITIES: Array<{ id: BeautyPriority; label: string; note: string }> = [
  { id: "skin-glow", label: "Glow + hydration", note: "Healthy skin habits and clinic support." },
  { id: "texture", label: "Texture + pores", note: "Education on consistency and timelines." },
  { id: "fine-lines", label: "Fine lines (education)", note: "Expectation-setting: softening vs erasing." },
  { id: "facial-balance", label: "Facial balance (education)", note: "Harmony concepts, not “more.”" },
  { id: "wellness-energy", label: "Wellness + energy", note: "Lifestyle + clinician oversight in clinic." },
  { id: "weight-confidence", label: "Weight confidence", note: "Education-only; clinical decisions in consult." },
];

export function buildBeautyRoadmap(priorities: BeautyPriority[], notes?: string) {
  const labels = priorities.length
    ? priorities.map((p) => BEAUTY_PRIORITIES.find((x) => x.id === p)?.label ?? p)
    : ["(none selected)"];

  return [
    "Beauty Roadmap™ (conceptual, educational only)",
    `Focus areas: ${labels.join(", ")}`,
    notes?.trim() ? `Notes: ${notes.trim()}` : "Notes: (none)",
    "",
    "Now (clarity + foundations):",
    "- Clarify your comfort with change (subtle vs noticeable).",
    "- Identify what matters most (skin, lines, balance, wellness).",
    "- Decide your pace and downtime comfort.",
    "",
    "Maintenance (keep it feeling easy):",
    "- Maintain with consistency and check-ins.",
    "- Track what you like, what you don’t, and what feels ‘you’.",
    "- Protect skin health (hydration, barrier, sun protection).",
    "",
    "Long‑term care (aging gracefully):",
    "- Think in seasons, not quick fixes.",
    "- Prioritize safety and realistic expectations.",
    "- Adjust over time with clinician guidance in person.",
    "",
    "Optional next step: Book a consultation to discuss your goals safely in person.",
  ].join("\n");
}

