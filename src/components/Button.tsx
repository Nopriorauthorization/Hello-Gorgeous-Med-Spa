"use client"
import React from 'react'
import { motion } from 'framer-motion'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }

export default function Button({ variant = 'primary', children, ...rest }: Props) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors'
  const variants: Record<string,string> = {
    primary: `${base} bg-brand text-white px-5 py-2 shadow-sm hover:bg-brand-600`,
    ghost: `${base} bg-transparent border border-neutral-200 text-neutral-900 px-4 py-2 hover:bg-neutral-50`
  }

  return (
    <motion.button whileTap={{ scale: 0.98 }} className={variants[variant]} {...(rest as any)}>
      {children}
    </motion.button>
  )
}
