import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/10">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{site.name}</h3>
            <p className="text-gray-400 text-sm">
              Luxury, clinical-meets-beauty aesthetics with results you can trust.
            </p>
            <p className="mt-4 text-gray-400 text-sm">
              Serving {site.serviceAreas.join(", ")}.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link className="hover:text-white transition" href="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/book">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link className="hover:text-white transition" href="/services/botox-dysport">
                  Botox / Dysport
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/services/dermal-fillers">
                  Dermal Fillers
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/services/weight-loss-glp-1">
                  Weight Loss (GLP‑1)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link className="hover:text-white transition" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/terms">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="mt-2">
            Medical spa services vary by provider, eligibility, and treatment plan.
          </p>
        </div>
      </Container>
    </footer>
  );
}

