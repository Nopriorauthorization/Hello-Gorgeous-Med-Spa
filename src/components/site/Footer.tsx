import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-base font-semibold text-ink-950">{site.name}</p>
            <p className="mt-2 text-sm text-ink-700">{site.description}</p>
            <p className="mt-4 text-sm text-ink-700">
              Serving {site.serviceAreas.join(", ")}.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink-950">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-ink-700 hover:text-ink-950" href="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="text-ink-700 hover:text-ink-950" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-ink-700 hover:text-ink-950" href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="text-ink-700 hover:text-ink-950" href="/book">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink-950">Legal</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-ink-700 hover:text-ink-950" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-ink-700 hover:text-ink-950" href="/terms">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink-100 pt-6 text-sm text-ink-600 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="text-ink-600">
            Medical spa services may vary by provider and eligibility.
          </p>
        </div>
      </Container>
    </footer>
  );
}

