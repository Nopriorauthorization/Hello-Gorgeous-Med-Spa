"use client"
import React from 'react'

type Entry = { id: string; title: string; description?: string }

export default function Discovery({ entries, onSelect }: { entries: Entry[]; onSelect: (id: string) => void }) {
  return (
    <section aria-label="Guided entry" className="bg-neutral-50 rounded-xl p-6">
      <h2 className="text-2xl font-heading mb-4">What are you looking for today?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {entries.map(e => (
          <button key={e.id} onClick={() => onSelect(e.id)} className="text-left p-4 rounded-lg border hover:shadow-lg transition-shadow bg-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{e.title}</div>
                {e.description && <div className="text-sm text-neutral-600 mt-1">{e.description}</div>}
              </div>
              <div className="ml-4 text-brand font-semibold">Choose</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
