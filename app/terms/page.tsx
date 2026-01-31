import type { Metadata } from "next";

import { Section } from "@/components/Section";
import { pageMetadata, siteJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms of Service for Hello Gorgeous Med Spa.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
      />

      <Section>
        <div className="prose prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p>
            This Terms of Service page is a template. Replace it with your finalized terms,
            including booking policies, refunds, cancellations, disclaimers, and jurisdiction.
          </p>
          <h2>Medical Disclaimer</h2>
          <p>
            Content on this website is for informational purposes and does not replace medical
            advice. Treatment eligibility is determined during consultation.
          </p>
          <h2>Appointments</h2>
          <p>
            Appointment availability, pricing, and treatment plans may change. Please confirm
            details during booking or consultation.
          </p>
          <h2>Website Use</h2>
          <p>
            You agree not to misuse the site, attempt unauthorized access, or interfere with
            site functionality.
          </p>
        </div>
      </Section>
    </>
  );
}

