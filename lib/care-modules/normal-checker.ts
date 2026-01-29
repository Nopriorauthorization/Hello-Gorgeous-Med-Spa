export type TreatmentType =
  | "botox-dysport"
  | "dermal-fillers"
  | "rf-microneedling"
  | "chemical-peel"
  | "iv-therapy"
  | "other";

export type TimelineBucket = "same-day" | "day-1" | "day-2-3" | "week-1-2" | "week-3+";

export type SymptomId =
  | "redness"
  | "swelling"
  | "bruising"
  | "tenderness"
  | "itching"
  | "lumps"
  | "asymmetry"
  | "fever"
  | "worsening-pain"
  | "vision-changes"
  | "skin-blanching-dusky"
  | "trouble-breathing"
  | "hives";

export type NormalCheckInput = {
  treatment: TreatmentType;
  symptom: SymptomId;
  timeline: TimelineBucket;
};

export type NormalCheckResult =
  | { severity: "normal"; title: string; guidance: string; nextSteps: string[] }
  | { severity: "caution"; title: string; guidance: string; nextSteps: string[] }
  | { severity: "red-flag"; title: string; guidance: string; nextSteps: string[] };

export const TREATMENT_OPTIONS: Array<{ id: TreatmentType; label: string }> = [
  { id: "botox-dysport", label: "Botox / Dysport (wrinkle relaxers)" },
  { id: "dermal-fillers", label: "Dermal fillers" },
  { id: "rf-microneedling", label: "RF microneedling" },
  { id: "chemical-peel", label: "Chemical peel" },
  { id: "iv-therapy", label: "IV therapy" },
  { id: "other", label: "Other / not sure" },
];

export const TIMELINE_OPTIONS: Array<{ id: TimelineBucket; label: string }> = [
  { id: "same-day", label: "Same day" },
  { id: "day-1", label: "Day 1" },
  { id: "day-2-3", label: "Day 2–3" },
  { id: "week-1-2", label: "Week 1–2" },
  { id: "week-3+", label: "Week 3+" },
];

export const SYMPTOM_OPTIONS: Array<{ id: SymptomId; label: string }> = [
  { id: "redness", label: "Redness" },
  { id: "swelling", label: "Swelling" },
  { id: "bruising", label: "Bruising" },
  { id: "tenderness", label: "Tenderness / soreness" },
  { id: "itching", label: "Itching" },
  { id: "lumps", label: "Lumps / firmness" },
  { id: "asymmetry", label: "Asymmetry" },
  { id: "fever", label: "Fever" },
  { id: "worsening-pain", label: "Worsening or severe pain" },
  { id: "vision-changes", label: "Vision changes" },
  { id: "skin-blanching-dusky", label: "Skin blanching / dusky color" },
  { id: "trouble-breathing", label: "Trouble breathing / throat swelling" },
  { id: "hives", label: "Hives / widespread rash" },
];

export function isRedFlagSymptom(symptom: SymptomId) {
  return (
    symptom === "vision-changes" ||
    symptom === "skin-blanching-dusky" ||
    symptom === "trouble-breathing" ||
    symptom === "hives" ||
    symptom === "fever" ||
    symptom === "worsening-pain"
  );
}

export function normalCheck(input: NormalCheckInput): NormalCheckResult {
  const { treatment, symptom, timeline } = input;

  // Red flags first — never reassure if unsafe.
  if (isRedFlagSymptom(symptom)) {
    return {
      severity: "red-flag",
      title: "This could be urgent — please contact a provider now",
      guidance:
        "I can’t diagnose online. Some symptoms can indicate a complication or allergic reaction. For safety, please contact us directly or seek urgent/emergency care if symptoms are severe or worsening.",
      nextSteps: [
        "If severe or rapidly worsening: seek urgent/emergency care now.",
        "If you can: contact our clinic directly for guidance.",
        "Avoid self-treating the symptom until you’ve spoken with a clinician.",
      ],
    };
  }

  // Conservative, educational guidance (non-diagnostic).
  const commonNormal =
    symptom === "redness" ||
    symptom === "swelling" ||
    symptom === "bruising" ||
    symptom === "tenderness";

  if (commonNormal) {
    const typicalWindow =
      treatment === "dermal-fillers"
        ? "swelling/bruising can be most noticeable in the first 24–72 hours and improve over 1–2 weeks."
        : treatment === "rf-microneedling" || treatment === "chemical-peel"
          ? "redness/tightness is common early and typically improves over several days."
          : "mild redness/tenderness can happen early and usually settles quickly.";

    const caution =
      timeline === "week-3+" && (symptom === "swelling" || symptom === "redness")
        ? "caution"
        : "normal";

    return {
      severity: caution,
      title: caution === "normal" ? "Often normal in early healing" : "Not typical this far out — worth checking in",
      guidance: [
        "Based on what you selected, this can be a typical short-term reaction.",
        typicalWindow,
        caution === "caution"
          ? "Because of the timing you selected, it’s safest to check in with your provider to be sure."
          : "If anything feels severe, rapidly worsening, or unusual for you, check in with your provider.",
      ].join(" "),
      nextSteps:
        caution === "caution"
          ? ["Contact us to review your symptoms and timeline.", "If symptoms worsen rapidly, seek urgent care."]
          : ["Use gentle care and follow your written aftercare instructions.", "If symptoms worsen, contact us."],
    };
  }

  // Lumps/asymmetry — educational but cautious
  if (symptom === "lumps" || symptom === "asymmetry") {
    const fillerRelated = treatment === "dermal-fillers";
    const title = fillerRelated ? "Often temporary early on" : "Could be temporary — check your timeline";
    const guidance = fillerRelated
      ? "In the first days after filler, firmness or uneven swelling can happen and often settles as swelling resolves. Avoid aggressive pressure unless your provider instructed it."
      : "In the first days after treatment, swelling can create temporary unevenness. If it’s worsening or not improving, it’s safest to check in.";

    const caution = timeline === "week-3+" ? "caution" : "normal";
    return {
      severity: caution,
      title: caution === "normal" ? title : "Not improving — check in",
      guidance:
        caution === "normal"
          ? guidance
          : `${guidance} Because of the timing you selected, please contact your provider to review.`,
      nextSteps:
        caution === "normal"
          ? ["Give it time based on your provider’s aftercare.", "If worsening, contact us."]
          : ["Contact us to review your symptoms.", "If severe pain or color change occurs, seek urgent care."],
    };
  }

  // Itching — generally mild, but caution if persistent
  if (symptom === "itching") {
    const caution = timeline === "week-3+" ? "caution" : "normal";
    return {
      severity: caution,
      title: caution === "normal" ? "Can happen during healing" : "Persistent itching — check in",
      guidance:
        caution === "normal"
          ? "Mild itching can occur as skin heals. Avoid scratching and follow your aftercare."
          : "If itching is persistent this far out, it’s safest to check in with your provider.",
      nextSteps:
        caution === "normal"
          ? ["Follow your aftercare instructions.", "If you develop rash, hives, or swelling of lips/tongue, seek urgent care."]
          : ["Contact us to review your symptoms.", "Seek urgent care if you develop hives or breathing symptoms."],
    };
  }

  return {
    severity: "caution",
    title: "When in doubt, check in",
    guidance:
      "This tool is educational only. If something feels unusual for you, or symptoms are worsening, it’s safest to contact your provider.",
    nextSteps: ["Contact us to review your symptoms.", "If severe, seek urgent care."],
  };
}

