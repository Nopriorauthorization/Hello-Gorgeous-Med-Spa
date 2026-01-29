import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main>
      <Section className="pt-20">
        <Container>
          <p className="text-sm font-semibold text-brand-700">404</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-950 md:text-4xl">
            Page not found
          </h1>
          <p className="mt-3 max-w-xl text-ink-700">
            The page you’re looking for doesn’t exist (or it moved). Use the links below to
            get back on track.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/">Go home</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/services">Explore services</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}

