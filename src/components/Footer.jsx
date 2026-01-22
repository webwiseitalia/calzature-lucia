import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../assets/logocalzaturelucia.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee animation
      gsap.to(marqueeRef.current, {
        x: '-50%',
        ease: 'none',
        duration: 20,
        repeat: -1
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-[#1A1A1A] text-[#F5F0E8]">
      {/* Large marquee */}
      <div className="py-12 border-b border-[#F5F0E8]/10 overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-12 px-12 text-[8vw] md:text-[5vw] font-serif opacity-10">
              <span>Calzature Lucia</span>
              <span className="w-3 h-3 rounded-full bg-[#C4715B]" />
              <span>Dal 1967</span>
              <span className="w-3 h-3 rounded-full bg-[#C4715B]" />
              <span>Bienno</span>
              <span className="w-3 h-3 rounded-full bg-[#C4715B]" />
            </span>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div className="px-6 md:px-[8vw] py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:justify-between gap-16">
          {/* Left - Logo and tagline */}
          <div className="md:max-w-xs">
            <img
              src={logo}
              alt="Calzature Lucia"
              className="h-8 w-auto brightness-0 invert mb-6"
            />
            <p className="text-fluid-sm text-[#9C958C] leading-relaxed">
              Le scarpe perfette per te, dal 1967 nel cuore di Bienno.
            </p>
          </div>

          {/* Middle - Quick contact */}
          <div>
            <span className="text-fluid-xs uppercase tracking-widest text-[#9C958C] block mb-4">
              Contatti
            </span>
            <div className="space-y-2 text-fluid-sm">
              <p>Via Fantoni 54, Bienno</p>
              <a href="tel:+393355358621" className="block hover:text-[#C4715B] transition-colors">
                +39 335 535 8621
              </a>
              <a href="mailto:gellyp@libero.it" className="block hover:text-[#C4715B] transition-colors">
                gellyp@libero.it
              </a>
            </div>
          </div>

          {/* Right - Social */}
          <div>
            <span className="text-fluid-xs uppercase tracking-widest text-[#9C958C] block mb-4">
              Social
            </span>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/calzature_lucia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-[#F5F0E8]/20 flex items-center justify-center hover:border-[#C4715B] hover:text-[#C4715B] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  <circle cx="12" cy="12" r="3.5"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/CalzatureLucia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-[#F5F0E8]/20 flex items-center justify-center hover:border-[#C4715B] hover:text-[#C4715B] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@calzature_lucia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-[#F5F0E8]/20 flex items-center justify-center hover:border-[#C4715B] hover:text-[#C4715B] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-[8vw] py-6 border-t border-[#F5F0E8]/10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-fluid-xs text-[#9C958C]">
          <p>
            © {new Date().getFullYear()} Calzature Lucia di Pedretti Geltrude
          </p>
          <div className="flex items-center gap-3">
            <span>Bienno</span>
            <span className="w-1 h-1 rounded-full bg-[#C4715B]" />
            <span>Borghi più Belli d'Italia</span>
            <span className="w-1 h-1 rounded-full bg-[#C4715B]" />
            <span>Bandiera Arancione</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
