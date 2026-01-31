import type { ServiceAtlasClusterId } from "./types";

export type CarePathway = {
  id: string;
  title: string;
  description: string;
  steps: Array<{
    label: "Start here" | "Maintain" | "Support";
    cluster: ServiceAtlasClusterId;
    notes: string;
  }>;
  disclaimer: string;
};

export const CARE_PATHWAYS: readonly CarePathway[] = [
  {
    id: "skin-health",
    title: "Skin health (conceptual journey)",
    description: "A calm way to think about skin confidence over time—no promises, no prescriptions.",
    steps: [
      {
        label: "Start here",
        cluster: "skin-regeneration",
        notes: "Start by learning what improves gradually (texture/tone) vs what doesn’t change overnight.",
      },
      {
        label: "Maintain",
        cluster: "skin-regeneration",
        notes: "Maintenance is about consistency and protecting skin health.",
      },
      {
        label: "Support",
        cluster: "aesthetics-injectables",
        notes: "If you’re exploring confidence changes, you can learn about injectables safely (education-only).",
      },
    ],
    disclaimer:
      "Conceptual only. This is not a treatment plan. Individual recommendations require an in-person consultation.",
  },
  {
    id: "confidence-refresh",
    title: "Confidence refresh (conceptual journey)",
    description: "Explore what you want, then learn options without pressure.",
    steps: [
      {
        label: "Start here",
        cluster: "aesthetics-injectables",
        notes: "Start with expectation setting: subtle vs noticeable change.",
      },
      {
        label: "Maintain",
        cluster: "aesthetics-injectables",
        notes: "Maintenance varies—education first, then consult to personalize.",
      },
      {
        label: "Support",
        cluster: "medical-visits-consultations",
        notes: "If you’re not sure what to book, a consult is the safest next step.",
      },
    ],
    disclaimer:
      "Conceptual only. No diagnosis, no individualized recommendations, and no guaranteed outcomes.",
  },
  {
    id: "wellness",
    title: "Wellness & energy (conceptual journey)",
    description: "Education on screening, monitoring, and safety-first decision-making.",
    steps: [
      {
        label: "Start here",
        cluster: "hormones-wellness",
        notes: "Learn how evaluation and monitoring work at a high level.",
      },
      {
        label: "Maintain",
        cluster: "hormones-wellness",
        notes: "Ongoing follow-ups and labs (as appropriate) are part of safe care.",
      },
      {
        label: "Support",
        cluster: "iv-therapy-recovery",
        notes: "Education on hydration and wellness support with appropriate screening.",
      },
    ],
    disclaimer:
      "Conceptual only. No prescribing, no medical clearance, and no individualized medical advice online.",
  },
];

