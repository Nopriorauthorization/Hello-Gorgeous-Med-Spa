import React from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Section from '../components/Section'

export default function Home() {
  return (
    <>
      <Section id="hero">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold leading-tight">Modern medical aesthetics, thoughtful care.</h2>
            <p className="text-lg text-neutral-600 mt-4">A fast, SEO-friendly platform built for conversions and long-term growth.</p>
            <div className="mt-6 flex gap-4">
              <Button>Book Now</Button>
              <Button variant="ghost">Learn More</Button>
            </div>
          </div>
          <div>
            <div className="h-72 bg-neutral-100 rounded-lg flex items-center justify-center">Hero image / video placeholder</div>
          </div>
        </div>
      </Section>

      <Section id="services" className="bg-neutral-50">
        <h3 className="text-2xl font-semibold mb-6">Services Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>Botox</Card>
          <Card>Fillers</Card>
          <Card>Hormone Therapy</Card>
        </div>
      </Section>

      <Section id="trust">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <h3 className="text-2xl font-semibold">Trusted care, proven results</h3>
            <p className="text-neutral-600 mt-2">Placeholder for credentials, testimonials, and before/after gallery.</p>
          </div>
          <div>
            <Card>
              <h4 className="font-medium">Contact & Booking</h4>
              <p className="text-neutral-600 mt-2">Lead capture placeholder</p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}
