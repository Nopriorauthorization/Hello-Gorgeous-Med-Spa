"use client"
"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section aria-label="Hero" className="hero-full-bleed">
      <div className="hero-bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1800&auto=format&fit=crop&s=')` }} />
      <div className="hero-overlay" />

      <div className="ds-container relative z-10 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1 className="text-display-1 font-heading" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              Luxury aesthetics. <span className="accent-pink">Medical expertise.</span> Real results.
            </motion.h1>

            <motion.p className="mt-4 text-lg max-w-2xl text-neutral-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}>
              Premium, clinically supervised treatments designed to deliver visible, natural-looking results.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/contact" className="hero-cta-primary">Book Now</a>
              <a href="#services" className="hero-cta-secondary">Explore Services</a>
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <motion.div className="w-full h-80 rounded-xl overflow-hidden border border-neutral-800" initial={{ scale: 0.98, opacity: 0.9 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
              <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-400">Hero image placeholder</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
