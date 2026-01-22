import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import foto5 from '../assets/new foto/new foto-5.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Bienno() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title split animation
      const titleSplit = new SplitType(titleRef.current, { types: 'chars' })

      gsap.fromTo(titleSplit.chars,
        { y: 60, opacity: 0, scale: 1.2 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: { amount: 0.4 },
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Image scale on scroll
      gsap.fromTo(imageRef.current,
        { scale: 1.3 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
          }
        }
      )

      // Text reveal
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="bienno"
      className="relative min-h-screen bg-[#1A1A1A] text-[#F5F0E8] overflow-hidden"
    >
      {/* Full-width background image with overlay */}
      <div className="absolute inset-0">
        <div ref={imageRef} className="w-full h-full">
          <img
            src={foto5}
            alt="Bienno"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-transparent to-[#1A1A1A]" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col justify-center py-32 md:py-48">
        {/* Main title - oversized, offset */}
        <div className="px-6 md:px-0 md:ml-[5vw]">
          <span className="text-fluid-xs uppercase tracking-[0.3em] text-[#C4715B] block mb-6">
            — Il nostro borgo
          </span>
          <h2
            ref={titleRef}
            className="text-fluid-display font-serif leading-[0.85]"
          >
            Bienno
          </h2>
        </div>

        {/* Text content - offset right */}
        <div
          ref={textRef}
          className="mt-16 md:mt-24 px-6 md:px-0 md:ml-[40vw] md:max-w-[45vw]"
        >
          <p className="text-fluid-lg font-serif italic text-[#F5F0E8]/90 mb-8">
            Uno dei Borghi più Belli d'Italia
          </p>
          <p className="text-fluid-base text-[#9C958C] leading-relaxed mb-6">
            Nel cuore della Valle Camonica, Bienno è un gioiello medievale con una storia millenaria
            legata alla lavorazione del ferro. Il "Vaso Re", canale artificiale del X secolo,
            alimenta ancora le antiche fucine.
          </p>
          <p className="text-fluid-base text-[#9C958C] leading-relaxed">
            Tra vicoli acciottolati, torri medievali e chiese affrescate,
            <strong className="text-[#F5F0E8]"> Calzature Lucia </strong>
            si trova in Via Fantoni 54, nel centro storico.
          </p>
        </div>

        {/* Bottom info - asymmetric */}
        <div className="absolute bottom-12 left-6 md:left-[8vw] right-6 md:right-[8vw]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            {/* Event highlight */}
            <div className="md:max-w-md">
              <span className="text-fluid-xs text-[#C4715B] uppercase tracking-wider block mb-2">
                Agosto
              </span>
              <p className="text-fluid-sm text-[#F5F0E8]">
                Mostra Mercato dell'Artigianato
              </p>
              <p className="text-fluid-xs text-[#9C958C] mt-1">
                200+ espositori da tutta Italia
              </p>
            </div>

            {/* CTA */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Via+Fantoni+54+Bienno+BS"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4"
            >
              <span className="text-fluid-sm text-[#F5F0E8] group-hover:text-[#C4715B] transition-colors">
                Come raggiungerci
              </span>
              <span className="w-10 h-10 rounded-full border border-[#F5F0E8]/30 flex items-center justify-center group-hover:border-[#C4715B] group-hover:bg-[#C4715B] transition-all duration-300">
                <svg className="w-4 h-4 text-[#F5F0E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
