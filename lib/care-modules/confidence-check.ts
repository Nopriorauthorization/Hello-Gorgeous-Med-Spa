export type ConfidenceCheckAnswer = {
  bother: string;
  changeStyle: "subtle" | "noticeable" | "unsure";
  firstTime: "yes" | "no" | "unsure";
  timeframe: "asap" | "2-4weeks" | "1-3months" | "just-researching";
  downtimeComfort: "low" | "medium" | "high" | "unsure";
  decisionStyle: "i-know-what-i-want" | "i-need-guidance" | "i-just-want-options";
};

export const CONFIDENCE_CHECK_QUESTIONS: Array<{
  id: keyof ConfidenceCheckAnswer;
  label: string;
  helper?: string;
}> = [
  {
    id: "bother",
    label: "What’s bothering you most right now?",
    helper: "Keep it simple—one sentence is perfect.",
  },
  {
    id: "changeStyle",
    label: "Are you looking for subtle or noticeable change?",
  },
  { id: "firstTime", label: "Is this your first time?" },
  { id: "timeframe", label: "What’s your timeframe?" },
  {
    id: "downtimeComfort",
    label: "How comfortable are you with downtime (redness, swelling, bruising)?",
  },
  {
    id: "decisionStyle",
    label: "How do you like to decide?",
    helper: "This helps us guide you with the right kind of consult conversation.",
  },
];

export function scoreConfidence(a: ConfidenceCheckAnswer) {
  let score = 0; // 0..10
  if (a.bother.trim().length >= 10) score += 2;
  if (a.changeStyle !== "unsure") score += 2;
  if (a.timeframe !== "just-researching") score += 2;
  if (a.decisionStyle === "i-know-what-i-want") score += 3;
  if (a.decisionStyle === "i-just-want-options") score += 2;
  if (a.decisionStyle === "i-need-guidance") score += 1;
  if (a.firstTime === "yes") score -= 1; // first time often needs extra reassurance
  if (a.downtimeComfort === "unsure") score -= 1;
  score = Math.max(0, Math.min(10, score));
  return score;
}

export function confidenceLabel(score0to10: number) {
  if (score0to10 >= 8) return "High";
  if (score0to10 >= 5) return "Medium";
  return "Low";
}

export function suggestedConsultType(a: ConfidenceCheckAnswer) {
  // IMPORTANT: consult type only (no treatment selection).
  const prefersGuidance = a.decisionStyle !== "i-know-what-i-want" || a.changeStyle === "unsure";
  if (prefersGuidance) return "General aesthetic consultation (clarity + education first)";
  return "Goal-focused consultation (confirm expectations + next steps)";
}

export function buildConfidenceSummary(a: ConfidenceCheckAnswer) {
  const score = scoreConfidence(a);
  const level = confidenceLabel(score);
  return [
    "Confidence Check™ Summary (educational only):",
    a.bother ? `- What’s bothering you: ${a.bother}` : "- What’s bothering you: (not provided)",
    `- Style preference: ${a.changeStyle}`,
    `- First time: ${a.firstTime}`,
    `- Timeframe: ${a.timeframe}`,
    `- Downtime comfort: ${a.downtimeComfort}`,
    `- Decision style: ${a.decisionStyle}`,
    "",
    `Confidence level: ${level} (score ${score}/10)`,
    `Suggested consult type: ${suggestedConsultType(a)}`,
    "",
    "Next step (optional): If you’d like, book a consult and we’ll tailor guidance in person.",
  ].join("\n");
}

