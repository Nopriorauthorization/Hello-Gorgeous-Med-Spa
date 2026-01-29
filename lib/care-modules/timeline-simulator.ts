import type { PersonaId } from "@/lib/personas/types";

export type TimelineTreatment =
  | "botox-dysport"
  | "dermal-fillers"
  | "rf-microneedling"
  | "chemical-peel";

export type TimelineStepId = "before" | "day-1" | "day-3" | "week-2" | "month-3+";

export type TimelineStep = {
  id: TimelineStepId;
  label: string;
  whatChanges: string[];
  whatDoesNotChange: string[];
  whatsNormal: string[];
  whatsNotNormal: string[];
};

export type TimelineScenario = {
  id: TimelineTreatment;
  label: string;
  defaultPersonaId: PersonaId;
  steps: TimelineStep[];
};

export const TIMELINE_SCENARIOS: readonly TimelineScenario[] = [
  {
    id: "botox-dysport",
    label: "Botox / Dysport (wrinkle relaxers)",
    defaultPersonaId: "beau-tox",
    steps: [
      {
        id: "before",
        label: "Before",
        whatChanges: ["You set expectations: softening expression lines, not changing your identity."],
        whatDoesNotChange: ["It won’t instantly erase deep etched lines in one day."],
        whatsNormal: ["A quick appointment, small injection points."],
        whatsNotNormal: ["Severe allergic symptoms or breathing issues (seek urgent care)."],
      },
      {
        id: "day-1",
        label: "Day 1",
        whatChanges: ["You may feel tiny bumps at injection sites that fade quickly."],
        whatDoesNotChange: ["Full results are not expected yet."],
        whatsNormal: ["Mild tenderness", "Small redness at injection points"],
        whatsNotNormal: ["Severe headache with neurologic symptoms", "Vision changes"],
      },
      {
        id: "day-3",
        label: "Day 3–7",
        whatChanges: ["Early softening may begin."],
        whatDoesNotChange: ["Final “settled” result may still be developing."],
        whatsNormal: ["Gradual change day by day"],
        whatsNotNormal: ["Severe, worsening pain or swelling"],
      },
      {
        id: "week-2",
        label: "Week 2",
        whatChanges: ["Results are typically more “settled.”"],
        whatDoesNotChange: ["It won’t replace skin quality treatments (texture/pores) by itself."],
        whatsNormal: ["A smoother look with natural expression remaining (goal-dependent)"],
        whatsNotNormal: ["Any urgent symptom (breathing/vision/skin color change)"],
      },
      {
        id: "month-3+",
        label: "Month 3+",
        whatChanges: ["Effects may gradually fade over time."],
        whatDoesNotChange: ["Maintenance timing varies per person."],
        whatsNormal: ["Noticing movement returning gradually"],
        whatsNotNormal: ["New severe symptoms—seek care"],
      },
    ],
  },
  {
    id: "dermal-fillers",
    label: "Dermal fillers",
    defaultPersonaId: "filla-grace",
    steps: [
      {
        id: "before",
        label: "Before",
        whatChanges: ["Plan is about balance and harmony, not “more.”"],
        whatDoesNotChange: ["Fillers don’t replace skin health or lifestyle basics."],
        whatsNormal: ["Discussing goals and comfort level with change"],
        whatsNotNormal: ["Expecting guaranteed results"],
      },
      {
        id: "day-1",
        label: "Day 1",
        whatChanges: ["Swelling can make things look ‘more’ at first."],
        whatDoesNotChange: ["Final look is not judged on day one."],
        whatsNormal: ["Swelling", "Bruising", "Tenderness"],
        whatsNotNormal: ["Vision changes", "Skin blanching/dusky color", "Severe pain"],
      },
      {
        id: "day-3",
        label: "Day 3–7",
        whatChanges: ["Swelling often starts to settle."],
        whatDoesNotChange: ["Minor asymmetry can still be swelling-related."],
        whatsNormal: ["Improving bruising/swelling"],
        whatsNotNormal: ["Worsening pain, spreading redness, fever"],
      },
      {
        id: "week-2",
        label: "Week 2",
        whatChanges: ["More representative of the ‘settled’ look."],
        whatDoesNotChange: ["It may continue to soften subtly over time."],
        whatsNormal: ["A more natural look than the first few days"],
        whatsNotNormal: ["New severe symptoms"],
      },
      {
        id: "month-3+",
        label: "Month 3+",
        whatChanges: ["Longevity varies by area and product."],
        whatDoesNotChange: ["Aging continues—maintenance is normal."],
        whatsNormal: ["Stable results with gradual change over months"],
        whatsNotNormal: ["Sudden severe symptoms—seek care"],
      },
    ],
  },
  {
    id: "rf-microneedling",
    label: "RF microneedling",
    defaultPersonaId: "peppi",
    steps: [
      {
        id: "before",
        label: "Before",
        whatChanges: ["This is about skin quality over time—texture, pores, and tone support."],
        whatDoesNotChange: ["It won’t ‘flip’ your skin overnight."],
        whatsNormal: ["A planned series may be discussed in clinic (not decided here)"],
        whatsNotNormal: ["Expecting instant dramatic change"],
      },
      {
        id: "day-1",
        label: "Day 1",
        whatChanges: ["Redness and a ‘sunburn’ feeling can happen."],
        whatDoesNotChange: ["Results are not visible immediately."],
        whatsNormal: ["Redness", "Warmth", "Tightness"],
        whatsNotNormal: ["Fever, pus, rapidly worsening redness"],
      },
      {
        id: "day-3",
        label: "Day 3–7",
        whatChanges: ["Skin can feel dry or textured as it heals."],
        whatDoesNotChange: ["Collagen changes take time."],
        whatsNormal: ["Dryness", "Mild flaking"],
        whatsNotNormal: ["Severe pain, spreading infection signs"],
      },
      {
        id: "week-2",
        label: "Week 2",
        whatChanges: ["Some people notice subtle improvements."],
        whatDoesNotChange: ["Full benefits may continue building."],
        whatsNormal: ["Gradual improvements"],
        whatsNotNormal: ["New severe symptoms"],
      },
      {
        id: "month-3+",
        label: "Month 3+",
        whatChanges: ["Skin quality benefits can be more noticeable."],
        whatDoesNotChange: ["Maintenance is still part of long-term skin health."],
        whatsNormal: ["Slow, steady progress"],
        whatsNotNormal: ["Sudden severe symptoms—seek care"],
      },
    ],
  },
  {
    id: "chemical-peel",
    label: "Chemical peel",
    defaultPersonaId: "peppi",
    steps: [
      {
        id: "before",
        label: "Before",
        whatChanges: ["A peel supports skin tone/texture in a controlled way."],
        whatDoesNotChange: ["It’s not a ‘filter’—it’s skin care + healing."],
        whatsNormal: ["Discussing prep and aftercare in clinic"],
        whatsNotNormal: ["Ignoring aftercare instructions"],
      },
      {
        id: "day-1",
        label: "Day 1",
        whatChanges: ["Tightness and mild redness are common."],
        whatDoesNotChange: ["Peeling may not start immediately."],
        whatsNormal: ["Tightness", "Mild redness"],
        whatsNotNormal: ["Severe swelling, hives, breathing trouble"],
      },
      {
        id: "day-3",
        label: "Day 3–7",
        whatChanges: ["Peeling/flaking can occur depending on depth."],
        whatDoesNotChange: ["You may still need consistent skincare."],
        whatsNormal: ["Flaking", "Dryness"],
        whatsNotNormal: ["Worsening pain, fever, pus"],
      },
      {
        id: "week-2",
        label: "Week 2",
        whatChanges: ["Skin may look brighter and more even."],
        whatDoesNotChange: ["Sun protection remains essential."],
        whatsNormal: ["Improved glow"],
        whatsNotNormal: ["New severe symptoms"],
      },
      {
        id: "month-3+",
        label: "Month 3+",
        whatChanges: ["Long-term results depend on skincare + habits."],
        whatDoesNotChange: ["Aging and sun exposure still matter."],
        whatsNormal: ["Ongoing skin maintenance"],
        whatsNotNormal: ["Sudden severe symptoms—seek care"],
      },
    ],
  },
] as const;

export function getTimelineScenario(id: TimelineTreatment) {
  return TIMELINE_SCENARIOS.find((s) => s.id === id) ?? TIMELINE_SCENARIOS[0];
}

