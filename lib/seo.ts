import type { Metadata } from "next";

export type FAQ = { question: string; answer: string };

export type Service = {
  slug: string;
  name: string;
  category: string;
  short: string;
  heroTitle: string;
  heroSubtitle: string;
  faqs: FAQ[];
};

export const SITE = {
  name: "Hello Gorgeous Med Spa",
  url: "https://hellogorgeousmedspa.com",
  description:
    "Luxury medical aesthetics in Oswego, IL. Botox/Dysport, dermal fillers, weight loss (GLP‑1), hormone therapy, PRF/PRP, and more.",
  // TODO: replace placeholders with real business info
  phone: "+1-000-000-0000",
  email: "info@hellogorgeousmedspa.com",
  address: {
    streetAddress: "123 Main St",
    addressLocality: "Oswego",
    addressRegion: "IL",
    postalCode: "60543",
    addressCountry: "US",
  },
  geo: { latitude: 41.6828, longitude: -88.3515 },
  serviceAreas: ["Oswego, IL", "Naperville, IL", "Aurora, IL", "Plainfield, IL"],
} as const;

export const HOME_FAQS: readonly FAQ[] = [
  {
    question: "Where are you located?",
    answer:
      "Hello Gorgeous Med Spa is based in Oswego, IL and serves clients from nearby areas including Naperville, Aurora, and Plainfield.",
  },
  {
    question: "Do you offer consultations?",
    answer:
      "Yes. We recommend starting with a consultation so we can personalize your treatment plan, timing, and expected results.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can schedule from our Book page. If you have questions first, contact us and we’ll help you choose the right service.",
  },
] as const;

export const SERVICES: readonly Service[] = [
  {
    slug: "botox-dysport",
    name: "Botox / Dysport",
    category: "Injectables",
    short:
      "Smooth fine lines and soften expression wrinkles with natural-looking results.",
    heroTitle: "Botox & Dysport in Oswego, IL",
    heroSubtitle:
      "A precision approach to a refreshed look—subtle, balanced, and tailored to your face.",
    faqs: [
      {
        question: "How long does Botox/Dysport last?",
        answer:
          "Most clients see results for about 3–4 months, depending on metabolism, dosage, and treatment area.",
      },
      {
        question: "When will I see results?",
        answer:
          "You may start noticing changes in a few days, with full results typically visible around 10–14 days.",
      },
      {
        question: "Will I look frozen?",
        answer:
          "Our goal is natural movement and a refreshed look. Dosing and placement are customized to you.",
      },
    ],
  },
  {
    slug: "dermal-fillers",
    name: "Dermal Fillers",
    category: "Injectables",
    short: "Restore volume, refine contours, and enhance facial harmony.",
    heroTitle: "Dermal Fillers in Oswego, IL",
    heroSubtitle:
      "Strategic volume where you need it—cheeks, lips, jawline, and beyond.",
    faqs: [
      {
        question: "How long do fillers last?",
        answer: "Longevity varies by product and area, commonly 6–18 months.",
      },
      {
        question: "Is there downtime?",
        answer:
          "Many people return to normal activities quickly. Swelling or bruising can occur and usually resolves within days.",
      },
      {
        question: "Can fillers be reversed?",
        answer:
          "Some hyaluronic acid fillers can be dissolved if needed. We’ll discuss options during your consult.",
      },
    ],
  },
  {
    slug: "weight-loss-glp-1",
    name: "Weight Loss (GLP‑1)",
    category: "Wellness",
    short:
      "Provider-guided weight management with GLP‑1 support and lifestyle coaching.",
    heroTitle: "GLP‑1 Weight Loss in Oswego, IL",
    heroSubtitle:
      "A medical approach to sustainable weight loss—progress tracking, guidance, and support.",
    faqs: [
      {
        question: "Who is a candidate for GLP‑1 therapy?",
        answer:
          "Eligibility depends on your health history and goals. We’ll evaluate candidacy during a medical consult.",
      },
      {
        question: "How quickly will I lose weight?",
        answer:
          "Results vary. Safe, sustainable progress is the goal—your plan is individualized.",
      },
      {
        question: "Do I need labs?",
        answer:
          "Often yes. We may recommend baseline labs and periodic monitoring depending on your plan.",
      },
    ],
  },
  {
    slug: "hormone-therapy",
    name: "Hormone Therapy",
    category: "Wellness",
    short:
      "Personalized hormone optimization designed around your symptoms and labs.",
    heroTitle: "Hormone Therapy in Oswego, IL",
    heroSubtitle:
      "Feel like yourself again—energy, mood, sleep, and overall wellbeing support.",
    faqs: [
      {
        question: "What symptoms can hormone therapy help?",
        answer:
          "Common concerns include fatigue, sleep issues, mood changes, and weight changes. We’ll assess your situation in depth.",
      },
      {
        question: "Is lab work required?",
        answer:
          "Typically yes. Labs help guide safe, personalized dosing and monitoring.",
      },
      {
        question: "How long until I feel results?",
        answer:
          "Some people notice improvements within weeks, though timelines vary by individual and protocol.",
      },
    ],
  },
  {
    slug: "prf-prp",
    name: "PRF / PRP",
    category: "Regenerative",
    short:
      "Harness your body’s own growth factors for skin and hair rejuvenation.",
    heroTitle: "PRF/PRP Treatments in Oswego, IL",
    heroSubtitle:
      "Regenerative aesthetics for brighter skin, improved texture, and targeted areas.",
    faqs: [
      {
        question: "What’s the difference between PRP and PRF?",
        answer:
          "Both use your own blood components; PRF is often processed differently and may release growth factors over a longer period.",
      },
      {
        question: "How many sessions will I need?",
        answer:
          "Many protocols recommend a series for best outcomes. We’ll create a plan based on your goals.",
      },
      {
        question: "Is it safe?",
        answer:
          "Because it uses your own blood-derived components, it’s generally well-tolerated. We’ll review risks and contraindications.",
      },
    ],
  },
] as const;

export function pageMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = new URL(path, SITE.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${SITE.name}`,
      description,
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
    },
  };
}

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      ...SITE.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: SITE.serviceAreas.map((name) => ({ "@type": "City", name })),
  };
}

export function faqJsonLd(faqs: ReadonlyArray<FAQ>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

