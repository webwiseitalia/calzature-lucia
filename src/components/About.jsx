import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import foto8 from '../assets/foto/foto-8.webp'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const imageRef = useRef(null)
  const textRefs = useRef([])
  const yearRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with split
      const titleSplit = new SplitType(titleRef.current, { types: 'words, chars' })

      gsap.fromTo(titleSplit.chars,
        { y: 80, opacity: 0, rotateY: -45 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: { amount: 0.6 },
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Image reveal - diagonal wipe
      gsap.fromTo(imageRef.current,
        {
          clipPath: 'polygon(0 100%, 0 100%, 0 100%, 0 100%)',
          scale: 1.2
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          scale: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Year counter with scrub
      gsap.fromTo(yearRef.current,
        { scale: 0.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: yearRef.current,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1
          }
        }
      )

      // Parallax on image
      gsap.to(imageRef.current.querySelector('img'), {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      })

      // Text paragraphs - staggered reveal
      textRefs.current.forEach((text, i) => {
        gsap.fromTo(text,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.2,
            scrollTrigger: {
              trigger: text,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="chi-siamo"
      className="relative py-32 md:py-48 bg-[#F5F0E8] overflow-hidden"
    >
      {/* Large year in background */}
      <div
        ref={yearRef}
        className="absolute top-24 md:top-16 right-[-5vw] pointer-events-none"
      >
        <span className="text-[30vw] md:text-[20vw] font-serif text-[#1A1A1A]/[0.03] leading-none">
          57
        </span>
      </div>

      {/* Content - asymmetric two column */}
      <div className="relative">
        {/* Left column - Image */}
        <div className="md:absolute md:left-[5vw] md:top-0 md:w-[40vw] px-6 md:px-0 mb-16 md:mb-0">
          <div
            ref={imageRef}
            className="relative aspect-[3/4] overflow-hidden"
          >
            <img
              src={foto8}
              alt="Interno del negozio"
              className="w-full h-full object-cover scale-110"
            />
          </div>

          {/* Floating label on image */}
          <div className="absolute -bottom-6 -right-4 md:right-auto md:-left-8 bg-[#1A1A1A] text-[#F5F0E8] px-6 py-4">
            <span className="text-fluid-xs uppercase tracking-widest block">Dal</span>
            <span className="text-fluid-xl font-serif">1967</span>
          </div>
        </div>

        {/* Right column - Text, offset */}
        <div className="md:ml-[52vw] px-6 md:px-0 md:pr-[8vw]">
          {/* Section label */}
          <span className="text-fluid-xs uppercase tracking-[0.3em] text-[#9C958C] block mb-6">
            — La nostra storia
          </span>

          {/* Title */}
          <h2
            ref={titleRef}
            className="text-fluid-3xl font-serif text-[#1A1A1A] leading-[0.95] mb-16"
            style={{ perspective: '1000px' }}
          >
            Nel cuore
            <br />
            <span className="italic text-[#C4715B]">di Bienno</span>
          </h2>

          {/* Paragraphs - different widths */}
          <div className="space-y-8 md:space-y-12">
            <p
              ref={el => textRefs.current[0] = el}
              className="text-fluid-base text-[#1A1A1A]/80 leading-relaxed md:max-w-[85%]"
            >
              <strong className="text-[#1A1A1A]">Calzature Lucia</strong> nasce nel 1967 da una semplice passione:
              aiutare ogni persona a trovare la scarpa perfetta. Da allora, tre generazioni
              si sono susseguite portando avanti questa tradizione.
            </p>

            <p
              ref={el => textRefs.current[1] = el}
              className="text-fluid-base text-[#1A1A1A]/80 leading-relaxed md:max-w-[70%] md:ml-[15%]"
            >
              Oggi il negozio è gestito da <strong className="text-[#1A1A1A]">Geltrude "Gelly" Pedretti</strong>,
              che unisce l'esperienza di famiglia con le nuove tendenze, mantenendo
              sempre al centro l'attenzione per il cliente.
            </p>

            <p
              ref={el => textRefs.current[2] = el}
              className="text-fluid-base text-[#1A1A1A]/80 leading-relaxed md:max-w-[80%]"
            >
              Da noi trovi calzature per donna, uomo e bambino, oltre a borse,
              cinture e accessori. Ogni articolo è scelto con cura per offrirti
              il meglio in stile, comfort e qualità.
            </p>
          </div>

          {/* Features - scattered, not grid */}
          <div className="mt-20 md:mt-32 relative">
            <div
              ref={el => textRefs.current[3] = el}
              className="md:absolute md:left-0 md:top-0 mb-8 md:mb-0"
            >
              <span className="text-fluid-xl font-serif text-[#1A1A1A]">94%</span>
              <p className="text-fluid-xs text-[#9C958C] mt-1">Ci raccomanda</p>
            </div>

            <div
              ref={el => textRefs.current[4] = el}
              className="md:absolute md:left-[35%] md:top-12 mb-8 md:mb-0"
            >
              <span className="text-fluid-xl font-serif text-[#1A1A1A]">5K+</span>
              <p className="text-fluid-xs text-[#9C958C] mt-1">Followers</p>
            </div>

            <div
              ref={el => textRefs.current[5] = el}
              className="md:absolute md:right-0 md:top-0"
            >
              <span className="text-fluid-xl font-serif text-[#1A1A1A]">∞</span>
              <p className="text-fluid-xs text-[#9C958C] mt-1">Passione</p>
            </div>
          </div>

          {/* CTA */}
          <div
            ref={el => textRefs.current[6] = el}
            className="mt-16 md:mt-48"
          >
            <a
              href="https://wa.me/393355358621"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 text-[#1A1A1A] hover:text-[#C4715B] transition-colors duration-300"
            >
              <span className="text-fluid-sm tracking-wide">Scrivici su WhatsApp</span>
              <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-[#C4715B] group-hover:border-[#C4715B] group-hover:text-[#F5F0E8] transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
