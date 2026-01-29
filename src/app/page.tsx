import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/FadeUp";
import { services } from "@/content/services";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { FAQJsonLd } from "@/components/seo/FAQJsonLd";
import { faqsHome } from "@/content/faqs";

export default function HomePage() {
  return (
    <>
      <SiteJsonLd />
      <FAQJsonLd faqs={faqsHome} />

      <main>
        <Section className="pt-14 md:pt-20">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <FadeUp>
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white px-3 py-1 text-xs font-medium text-ink-700 shadow-sm">
                    Luxury medical aesthetics in Oswego, IL
                  </p>
                  <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-ink-950 md:text-5xl">
                    Hello Gorgeous Med Spa
                  </h1>
                  <p className="mt-4 max-w-xl text-pretty text-lg text-ink-700">
                    High-end, results-driven aesthetic treatments—designed to help you look
                    refreshed, feel confident, and stay naturally you.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button asChild>
                      <Link href="/book">Book a Consultation</Link>
                    </Button>
                    <Button asChild variant="secondary">
                      <Link href="/services">Explore Services</Link>
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-ink-600">
                    Serving Oswego, Naperville, Aurora, and Plainfield.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.08}>
                <div className="relative">
                  <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-brand-500/20 via-white to-brand-500/10 blur-2xl" />
                  <div className="relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-ink-800">Featured treatments</p>
                      <span className="rounded-full bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700">
                        Most booked
                      </span>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {services.slice(0, 4).map((s) => (
                        <li
                          key={s.slug}
                          className="flex items-center justify-between rounded-xl border border-ink-100 bg-white px-4 py-3"
                        >
                          <div>
                            <p className="font-medium text-ink-950">{s.name}</p>
                            <p className="text-sm text-ink-600">{s.short}</p>
                          </div>
                          <Link
                            className="text-sm font-semibold text-brand-700 hover:text-brand-800"
                            href={`/services/${s.slug}`}
                          >
                            View
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-xl bg-ink-950 p-5 text-white shadow-glow">
                      <p className="text-sm text-white/80">New here?</p>
                      <p className="mt-1 text-lg font-semibold">Start with a personalized consult.</p>
                      <div className="mt-4">
                        <Button asChild variant="primaryDark">
                          <Link href="/book">Schedule Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <FadeUp>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">
                    Services built for natural-looking results
                  </h2>
                  <p className="mt-2 max-w-2xl text-ink-700">
                    Evidence-based, provider-led care with a luxury experience—without the
                    pressure.
                  </p>
                </div>
                <Link className="hidden text-sm font-semibold text-brand-700 hover:text-brand-800 md:block" href="/services">
                  View all services
                </Link>
              </div>
            </FadeUp>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s, idx) => (
                <FadeUp key={s.slug} delay={0.03 * idx}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group block rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-glow"
                  >
                    <p className="text-sm font-semibold text-brand-700">{s.category}</p>
                    <p className="mt-2 text-xl font-semibold text-ink-950">{s.name}</p>
                    <p className="mt-2 text-sm text-ink-700">{s.short}</p>
                    <p className="mt-4 text-sm font-semibold text-ink-950">
                      Learn more{" "}
                      <span className="inline-block transition group-hover:translate-x-0.5">→</span>
                    </p>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}

