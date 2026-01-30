import Image from 'next/image';
import Link from 'next/link';
import Mascot from '../components/mascots/Mascot';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-pink-500/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Hello Gorgeous Med Spa"
              width={180}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/mascots" className="text-white/80 hover:text-pink-400 transition-colors">
              Meet Our Team
            </Link>
            <Link href="/meet-the-team" className="text-white/80 hover:text-pink-400 transition-colors">
              About Us
            </Link>
            <a 
              href="tel:+1234567890" 
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all"
            >
              Book Now
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="relative min-h-screen flex items-center">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Hello Gorgeous Med Spa - Premier Med Spa in Oswego IL"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 pt-24">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-pink-500/20 border border-pink-500/40 text-pink-400 rounded-full text-sm font-medium mb-6">
              Premier Med Spa in Oswego, IL
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Hello
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                Gorgeous
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Experience luxury aesthetics with Botox, Fillers, and Weight Loss Therapy. 
              By Ryan Kent & Danielle Alcala.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+1234567890"
                className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-pink-500/25 transition-all"
              >
                Book Consultation
              </a>
              <Link
                href="/mascots"
                className="inline-flex items-center justify-center border-2 border-pink-500/50 text-white hover:bg-pink-500/20 px-8 py-4 rounded-full text-lg font-semibold transition-all"
              >
                Meet Our AI Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-pink-500/10 border border-pink-500/30 text-pink-400 rounded-full text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Treatments We Offer
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Personalized aesthetic treatments to help you look and feel your best.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Botox & Dysport", desc: "Smooth expression lines and prevent new ones", color: "pink" },
              { name: "Dermal Fillers", desc: "Restore volume and enhance facial contours", color: "purple" },
              { name: "Weight Loss", desc: "GLP-1 medications for sustainable results", color: "emerald" },
              { name: "Lip Enhancement", desc: "Natural-looking lip augmentation", color: "rose" },
              { name: "Facial Rejuvenation", desc: "Turn back the clock on aging skin", color: "violet" },
              { name: "IV Therapy", desc: "Vitamin infusions for optimal wellness", color: "cyan" },
            ].map((service) => (
              <div
                key={service.name}
                className={`bg-white/5 rounded-2xl p-6 border border-${service.color}-500/20 hover:border-${service.color}-500/50 transition-all hover:bg-white/10`}
              >
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-white/60">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Mascots Teaser */}
      <section className="py-24 px-4 bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full text-sm font-medium mb-4">
              AI-Powered Guidance
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Your Beauty Guides
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Our AI mascots provide expert information about treatments—no hype, just honest answers.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/mascots"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-pink-500/25 transition-all"
            >
              Watch Mascot Videos
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Mascot */}
      <Mascot
        name="Peppi"
        videoSrc="/mascots/peppi.mp4"
        ctaText="Ask Peppi a Question"
      />

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Image
                src="/images/logo.png"
                alt="Hello Gorgeous Med Spa"
                width={150}
                height={50}
                className="h-12 w-auto mb-4"
              />
              <p className="text-white/50 text-sm">Premier Med Spa in Oswego, IL</p>
              <p className="text-white/50 text-sm">By Ryan Kent & Danielle Alcala</p>
            </div>
            <div className="flex gap-8 text-white/60 text-sm">
              <Link href="/mascots" className="hover:text-pink-400 transition-colors">Mascots</Link>
              <Link href="/meet-the-team" className="hover:text-pink-400 transition-colors">About</Link>
              <a href="tel:+1234567890" className="hover:text-pink-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Hello Gorgeous Med Spa. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
