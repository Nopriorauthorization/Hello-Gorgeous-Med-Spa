import React from 'react'

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border bg-white shadow-sm p-6 ${className}`}>
      {children}
    </div>
  )
}
