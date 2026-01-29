import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FadeUp, Section } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { SERVICES, faqJsonLd, pageMetadata, siteJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const s = SERVICES.find((x) => x.slug === params.slug);
  if (!s)
    return pageMetadata({
      title: "Service",
      description: "Service details.",
      path: "/services",
    });

  return pageMetadata({
    title: s.name,
    description: `${s.heroTitle} — ${s.short} Serving Oswego, Naperville, Aurora, and Plainfield.`,
    path: `/services/${s.slug}`,
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = SERVICES.find((x) => x.slug === params.slug);
  if (!s) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(s.faqs)) }}
      />

      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-black" />
        <div className="relative z-10">
          <FadeUp>
            <p className="text-pink-400 text-lg md:text-xl font-medium mb-6 tracking-wide">
              {s.category.toUpperCase()}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                {s.name}
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl leading-relaxed">
              {s.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <CTA href="/book" variant="gradient">
                Book Now
              </CTA>
              <CTA href="/services" variant="outline">
                Back to Services
              </CTA>
            </div>
          </FadeUp>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { title: "What it is", body: s.short },
            {
              title: "What to expect",
              body: "A consult-first approach, personalized recommendations, and a clear plan for results and maintenance.",
            },
            {
              title: "Local care",
              body: "Conveniently located for clients in Oswego, Naperville, Aurora, and Plainfield.",
            },
          ].map((c, idx) => (
            <FadeUp key={c.title} delayMs={60 * idx}>
              <div className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-950/60 to-black p-6">
                <h2 className="text-xl font-bold text-white">{c.title}</h2>
                <p className="mt-3 text-gray-300">{c.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </Section>

      <Section>
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl">
            Quick answers to common questions about {s.name}.
          </p>
        </FadeUp>

        <div className="mt-10 grid gap-4">
          {s.faqs.map((f, idx) => (
            <FadeUp key={f.question} delayMs={40 * idx}>
              <details className="group rounded-2xl border border-gray-800 bg-black/40 p-6">
                <summary className="cursor-pointer list-none text-lg font-semibold text-white flex items-center justify-between">
                  <span>{f.question}</span>
                  <span className="text-white/60 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-300">{f.answer}</p>
              </details>
            </FadeUp>
          ))}
        </div>

        <div className="mt-12 text-center">
          <CTA href="/book" variant="white" className="group inline-flex">
            Book a Consultation
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </CTA>
          <p className="text-sm text-gray-500 mt-8">
            Prefer a question first? <Link className="underline" href="/contact">Contact us</Link>.
          </p>
        </div>
      </Section>
    </>
  );
}

