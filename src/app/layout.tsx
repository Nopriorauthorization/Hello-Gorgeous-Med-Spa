import '../styles/globals.css'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Hello Gorgeous Med Spa',
  description: 'Luxury medical aesthetics and wellness in Oswego, IL',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:opsz,wght@8..14,300;8..14,400;8..14,600;8..14,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main className="container py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
