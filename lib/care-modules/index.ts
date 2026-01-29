export { CARE_EXPERIENCE_ENABLED } from "./flags";

export {
  CONFIDENCE_CHECK_QUESTIONS,
  buildConfidenceSummary,
  confidenceLabel,
  scoreConfidence,
  suggestedConsultType,
  type ConfidenceCheckAnswer,
} from "./confidence-check";

export {
  ASK_BEFORE_BOOK_SUGGESTIONS,
  ASK_CATEGORIES,
  suggestPersonaForQuestion,
  type AskCategory,
} from "./ask-before-book";

export {
  TREATMENT_OPTIONS,
  TIMELINE_OPTIONS,
  SYMPTOM_OPTIONS,
  isRedFlagSymptom,
  normalCheck,
  type NormalCheckInput,
  type NormalCheckResult,
  type TreatmentType,
  type TimelineBucket,
  type SymptomId,
} from "./normal-checker";

export {
  TIMELINE_SCENARIOS,
  getTimelineScenario,
  type TimelineScenario,
  type TimelineTreatment,
  type TimelineStepId,
} from "./timeline-simulator";

export { BEAUTY_PRIORITIES, buildBeautyRoadmap, type BeautyPriority } from "./beauty-roadmap";

