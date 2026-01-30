import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { TreatmentQuiz } from "./TreatmentQuiz";

export const metadata: Metadata = pageMetadata({
  title: "Treatment Quiz - Find Your Perfect Treatment",
  description:
    "Take our 2-minute quiz to discover the perfect treatments for your goals. Personalized recommendations for Botox, fillers, weight loss, hormone therapy & more at Hello Gorgeous Med Spa.",
  path: "/quiz",
});

export default function QuizPage() {
  return <TreatmentQuiz />;
}
