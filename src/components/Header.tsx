import React from 'react'
import Link from 'next/link'
import Button from './Button'

export default function Header() {
    return (
        <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-md border-b">
            <div className="ds-container flex items-center justify-between py-3">
                <Link href="/" className="flex items-center gap-3" aria-label="Hello Gorgeous Home">
                    <div className="w-10 h-10 rounded-md bg-brand flex items-center justify-center text-white font-semibold">HG</div>
                    <span className="text-base md:text-lg font-heading">Hello Gorgeous</span>
                </Link>

                <nav aria-label="Primary navigation" className="hidden md:block">
                    <ul className="flex items-center gap-6 text-sm text-neutral-700">
                        <li><Link href="/services" className="hover:underline">Services</Link></li>
                        <li><Link href="/about" className="hover:underline">About</Link></li>
                        <li><Link href="/results" className="hover:underline">Results</Link></li>
                        <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                </nav>

                <div className="flex items-center gap-3">
                    <Link href="/contact" className="hidden md:inline-block">
                        <Button>Book Now</Button>
                    </Link>
                    <button aria-label="Open menu" className="md:hidden px-2 py-1 rounded-md border border-neutral-200">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="#111827" strokeWidth="2" strokeLinecap="round"/></svg>
                    </button>
                </div>
            </div>
        </header>
    )
}