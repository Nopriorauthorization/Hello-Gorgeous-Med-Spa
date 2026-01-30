"use client";

import React from "react";
import Image from "next/image";

import { CTA } from "./CTA";
import { FadeUp } from "./Section";
import { BOOKING_URL } from "@/lib/flows";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Hero Banner Image - Full Width */}
      <div className="relative w-full">
        <div className="relative w-full aspect-[16/6] md:aspect-[16/5]">
          <Image
            src="/images/hero-banner.png"
            alt="Hello Gorgeous Med Spa - Welcome to Oswego, IL's Premier Med Spa"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
        </div>
      </div>

      {/* Content Section Below Banner */}
      <div className="relative flex-1 bg-black px-6 py-12 md:py-16">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <FadeUp>
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Look{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500">
                Gorgeous
              </span>
              . Feel{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500">
                Confident
              </span>
              .
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Premier medical aesthetics by{" "}
              <span className="text-white font-semibold">Ryan Kent & Danielle Alcala</span>.
              Botox, fillers, and weight loss therapy in Oswego, IL.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <CTA href={BOOKING_URL} variant="gradient" className="group text-lg px-8 py-4">
                Book Your Appointment
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
              <CTA href="tel:630-636-6193" variant="outline" className="text-lg px-8 py-4">
                📞 Call: 630-636-6193
              </CTA>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-pink-400 text-lg">✓</span>
                <span>Provider-led care</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-pink-400 text-lg">✓</span>
                <span>Natural results</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-pink-400 text-lg">✓</span>
                <span>Luxury experience</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-pink-400 text-lg">✓</span>
                <span>Serving Naperville, Aurora & Plainfield</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
