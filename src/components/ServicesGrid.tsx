"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Modal from './Modal'
import data from '../data/interactive-content.json'

export default function ServicesGrid() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="services" className="ds-container py-16">
      <h2 className="text-3xl font-heading mb-6">Our Core Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.serviceCategories.map(s => (
          <motion.button key={s.id} onClick={() => setOpenId(s.id)} whileHover={{ y: -6 }} className="text-left p-6 rounded-lg bg-neutral-900 text-white border border-neutral-800 shadow-sm hover:shadow-md transition">
            <div className="font-semibold text-lg">{s.title}</div>
            <div className="text-sm text-neutral-300 mt-2">{s.short}</div>
            <div className="mt-4 h-1 bg-gradient-to-r from-pink-400 to-pink-600 w-16 rounded" />
          </motion.button>
        ))}
      </div>

      {openId && (
        <Modal open={!!openId} onClose={() => setOpenId(null)} title={data.serviceCategories.find(s => s.id === openId)?.title}>
          <p className="mb-3">Quick overview copy for {data.serviceCategories.find(s => s.id === openId)?.title}.</p>
          <ul className="list-disc pl-5 text-sm text-neutral-700">
            <li>What it is</li>
            <li>Who it’s for</li>
            <li>What to expect</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="/contact" className="inline-block bg-brand-pink text-white px-4 py-2 rounded-full">Book</a>
            <a href="#" className="text-neutral-700 underline">Learn more</a>
          </div>
        </Modal>
      )}
    </section>
  )
}
