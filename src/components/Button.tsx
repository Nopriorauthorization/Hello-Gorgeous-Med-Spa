"use client"
import React from 'react'
import { motion } from 'framer-motion'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }

export default function Button({ variant = 'primary', children, ...rest }: Props) {
  const base = 'inline-flex items-center justify-center rounded-full font-medium transition-colors shadow-sm'
  const variants: Record<string,string> = {
    primary: `${base} bg-brand text-white px-6 py-3 hover:bg-pink-600`,
    ghost: `${base} bg-transparent border border-white/20 text-white px-5 py-3 hover:bg-white/6`
  }

  return (
    <motion.button whileTap={{ scale: 0.98 }} className={variants[variant]} {...(rest as any)}>
      {children}
    </motion.button>
  )
}
