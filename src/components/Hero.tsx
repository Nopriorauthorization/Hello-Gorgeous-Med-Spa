"use client"
import React from 'react'
import Button from './Button'

export default function Hero() {
  return (
    <section aria-label="Hero" className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556228720-0f7a4e9c7b3b?q=80&w=1600&auto=format&fit=crop&s=')] bg-cover bg-center filter saturate-90" />
      <div className="absolute inset-0 ds-hero-contrast" />
      <div className="relative ds-container py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold leading-tight">Hello Gorgeous — Modern Medical Aesthetics</h1>
            <p className="mt-4 text-lg max-w-xl text-neutral-200">Luxury medical spa in Oswego delivering thoughtful care, advanced treatments, and visible results. No pressure—just beautiful outcomes.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button>Book Now</Button>
              <Button variant="ghost">Explore Services</Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-full h-64 bg-white/10 rounded-xl flex items-center justify-center">Before / After preview</div>
          </div>
        </div>
      </div>
    </section>
  )
}
