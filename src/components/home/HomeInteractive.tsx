"use client"
import React, { useState } from 'react'
import Discovery from '../flow/Discovery'
import content from '../../data/interactive-content.json'

export default function HomeInteractive() {
  const [entry, setEntry] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      {!entry && <Discovery entries={content.entryPaths} onSelect={(id) => setEntry(id)} />}

      {entry && (
        <section className="p-6 bg-white rounded-xl shadow-sm">
          <button className="text-sm text-neutral-500 mb-4" onClick={() => setEntry(null)}>← Back</button>
          <h3 className="text-xl font-heading mb-2">{content.entryPaths.find(e => e.id === entry)?.title}</h3>
          <p className="text-neutral-600 mb-4">{content.entryPaths.find(e => e.id === entry)?.description}</p>

          <div className="grid md:grid-cols-3 gap-4">
            {content.serviceCategories.map(sc => (
              <div key={sc.id} className="p-4 border rounded-lg">
                <div className="font-medium">{sc.title}</div>
                <div className="text-sm text-neutral-600 mt-1">{sc.short}</div>
                <div className="mt-3 flex gap-2">
                  <a href="#" className="text-brand font-semibold">Explore</a>
                  <a href="/contact" className="text-neutral-700">Book</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
