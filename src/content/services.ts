export type Service = {
  slug: string;
  name: string;
  category: string;
  short: string;
  hero: {
    title: string;
    subtitle: string;
  };
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "botox-dysport",
    name: "Botox / Dysport",
    category: "Injectables",
    short: "Smooth fine lines and soften expression wrinkles with natural-looking results.",
    hero: {
      title: "Botox & Dysport in Oswego, IL",
      subtitle:
        "A precision approach to a refreshed look—subtle, balanced, and tailored to your face.",
    },
    faqs: [
      { question: "How long does Botox/Dysport last?", answer: "Most clients see results for about 3–4 months, depending on metabolism, dosage, and treatment area." },
      { question: "When will I see results?", answer: "You may start noticing changes in a few days, with full results typically visible around 10–14 days." },
      { question: "Will I look frozen?", answer: "Our goal is natural movement and a refreshed look. Dosing and placement are customized to you." },
    ],
  },
  {
    slug: "dermal-fillers",
    name: "Dermal Fillers",
    category: "Injectables",
    short: "Restore volume, refine contours, and enhance facial harmony.",
    hero: {
      title: "Dermal Fillers in Oswego, IL",
      subtitle:
        "Strategic volume where you need it—cheeks, lips, jawline, and beyond.",
    },
    faqs: [
      { question: "How long do fillers last?", answer: "Longevity varies by product and area, commonly 6–18 months." },
      { question: "Is there downtime?", answer: "Many people return to normal activities quickly. Swelling or bruising can occur and usually resolves within days." },
      { question: "Can fillers be reversed?", answer: "Some hyaluronic acid fillers can be dissolved if needed. We’ll discuss options during your consult." },
    ],
  },
  {
    slug: "weight-loss-glp-1",
    name: "Weight Loss (GLP‑1)",
    category: "Wellness",
    short: "Provider-guided weight management with GLP‑1 support and lifestyle coaching.",
    hero: {
      title: "GLP‑1 Weight Loss in Oswego, IL",
      subtitle:
        "A medical approach to sustainable weight loss—progress tracking, guidance, and support.",
    },
    faqs: [
      { question: "Who is a candidate for GLP‑1 therapy?", answer: "Eligibility depends on your health history and goals. We’ll evaluate candidacy during a medical consult." },
      { question: "How quickly will I lose weight?", answer: "Results vary. Safe, sustainable progress is the goal—your plan is individualized." },
      { question: "Do I need labs?", answer: "Often yes. We may recommend baseline labs and periodic monitoring depending on your plan." },
    ],
  },
  {
    slug: "hormone-therapy",
    name: "Hormone Therapy",
    category: "Wellness",
    short: "Personalized hormone optimization designed around your symptoms and labs.",
    hero: {
      title: "Hormone Therapy in Oswego, IL",
      subtitle:
        "Feel like yourself again—energy, mood, sleep, and overall wellbeing support.",
    },
    faqs: [
      { question: "What symptoms can hormone therapy help?", answer: "Common concerns include fatigue, sleep issues, mood changes, and weight changes. We’ll assess your situation in depth." },
      { question: "Is lab work required?", answer: "Typically yes. Labs help guide safe, personalized dosing and monitoring." },
      { question: "How long until I feel results?", answer: "Some people notice improvements within weeks, though timelines vary by individual and protocol." },
    ],
  },
  {
    slug: "prf-prp",
    name: "PRF / PRP",
    category: "Regenerative",
    short: "Harness your body’s own growth factors for skin and hair rejuvenation.",
    hero: {
      title: "PRF/PRP Treatments in Oswego, IL",
      subtitle:
        "Regenerative aesthetics for brighter skin, improved texture, and targeted areas.",
    },
    faqs: [
      { question: "What’s the difference between PRP and PRF?", answer: "Both use your own blood components; PRF is often processed differently and may release growth factors over a longer period." },
      { question: "How many sessions will I need?", answer: "Many protocols recommend a series for best outcomes. We’ll create a plan based on your goals." },
      { question: "Is it safe?", answer: "Because it uses your own blood-derived components, it’s generally well-tolerated. We’ll review risks and contraindications." },
    ],
  },
  {
    slug: "aesthetic-treatments",
    name: "Aesthetic Treatments",
    category: "Aesthetics",
    short: "A curated menu of modern treatments for glow, clarity, and confidence.",
    hero: {
      title: "Aesthetic Treatments in Oswego, IL",
      subtitle:
        "From skin revitalization to advanced modalities—built around your goals.",
    },
    faqs: [
      { question: "Which treatment is right for me?", answer: "We’ll recommend the best plan after assessing your skin, goals, and timeline during a consult." },
      { question: "Can I combine treatments?", answer: "Yes—many treatments pair well for better outcomes. We’ll guide scheduling and sequencing." },
      { question: "Do you offer maintenance plans?", answer: "We can help you build a maintenance schedule tailored to your needs." },
    ],
  },
];

