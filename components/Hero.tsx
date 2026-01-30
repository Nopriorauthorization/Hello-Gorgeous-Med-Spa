"use client";

import React from "react";
import Image from "next/image";

import { CTA } from "./CTA";
import { FadeUp } from "./Section";
import { BOOKING_URL } from "@/lib/flows";

export function Hero() {
  return (
    <section className="relative">
      {/* Hero Banner Image - Clean Full Width */}
      <div className="relative w-full">
        <Image
          src="/images/hero-banner.png"
          alt="Hello Gorgeous Med Spa - Welcome to Oswego, IL's Premier Med Spa - Botox, Fillers, and Weight Loss Therapy"
          width={1920}
          height={600}
          priority
          className="w-full h-auto"
          sizes="100vw"
        />
      </div>

      {/* Minimal CTA Bar */}
      <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <FadeUp>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <CTA href={BOOKING_URL} variant="white" className="text-pink-600 font-bold">
                Book Your Appointment →
              </CTA>
              <a
                href="tel:630-636-6193"
                className="text-white font-semibold hover:underline flex items-center gap-2"
              >
                📞 630-636-6193
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
