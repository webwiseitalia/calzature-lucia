import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const itemRefs = useRef([])

  const hours = [
    { day: 'Lun', time: '15:00 – 19:30' },
    { day: 'Mar – Sab', time: '9:00 – 12:00 / 15:00 – 19:30' },
    { day: 'Dom', time: 'Chiuso' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleSplit = new SplitType(titleRef.current, { types: 'chars' })

      gsap.fromTo(titleSplit.chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: { amount: 0.5 },
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Items staggered reveal
      itemRefs.current.forEach((item, i) => {
        gsap.fromTo(item,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
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
      id="contatti"
      className="relative py-32 md:py-48 bg-[#F5F0E8] overflow-hidden"
    >
      {/* Large decorative text */}
      <div className="absolute top-20 -left-[10vw] pointer-events-none">
        <span className="text-[25vw] font-serif text-[#1A1A1A]/[0.02] leading-none whitespace-nowrap">
          Contatti
        </span>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="px-6 md:px-0 md:ml-[8vw] mb-20 md:mb-32">
          <span className="text-fluid-xs uppercase tracking-[0.3em] text-[#9C958C] block mb-6">
            — Vieni a trovarci
          </span>
          <h2
            ref={titleRef}
            className="text-fluid-3xl font-serif text-[#1A1A1A] leading-[0.95]"
          >
            Nel cuore
            <br />
            <span className="italic text-[#C4715B]">del borgo</span>
          </h2>
        </div>

        {/* Content - asymmetric layout */}
        <div className="px-6 md:px-0 md:flex md:gap-[10vw]">
          {/* Left column - Contact info */}
          <div className="md:ml-[8vw] md:w-[30vw]">
            {/* Address */}
            <div
              ref={el => itemRefs.current[0] = el}
              className="mb-12"
            >
              <span className="text-fluid-xs uppercase tracking-widest text-[#9C958C] block mb-3">
                Indirizzo
              </span>
              <p className="text-fluid-lg font-serif text-[#1A1A1A]">
                Via Fantoni 54
              </p>
              <p className="text-fluid-base text-[#1A1A1A]/70">
                25040 Bienno (BS)
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Via+Fantoni+54+Bienno+BS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-fluid-sm text-[#C4715B] hover:text-[#1A1A1A] transition-colors"
              >
                Apri mappa
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Phone */}
            <div
              ref={el => itemRefs.current[1] = el}
              className="mb-12"
            >
              <span className="text-fluid-xs uppercase tracking-widest text-[#9C958C] block mb-3">
                Telefono
              </span>
              <a href="tel:036440245" className="block text-fluid-lg font-serif text-[#1A1A1A] hover:text-[#C4715B] transition-colors">
                0364 40245
              </a>
              <a href="tel:+393355358621" className="block text-fluid-base text-[#1A1A1A]/70 hover:text-[#C4715B] transition-colors">
                +39 335 535 8621
              </a>
            </div>

            {/* Email */}
            <div
              ref={el => itemRefs.current[2] = el}
              className="mb-12"
            >
              <span className="text-fluid-xs uppercase tracking-widest text-[#9C958C] block mb-3">
                Email
              </span>
              <a href="mailto:gellyp@libero.it" className="text-fluid-base text-[#1A1A1A] hover:text-[#C4715B] transition-colors">
                gellyp@libero.it
              </a>
            </div>
          </div>

          {/* Right column - Hours & CTA */}
          <div className="md:w-[40vw] mt-16 md:mt-0">
            {/* Hours */}
            <div
              ref={el => itemRefs.current[3] = el}
              className="mb-16"
            >
              <span className="text-fluid-xs uppercase tracking-widest text-[#9C958C] block mb-6">
                Orari
              </span>
              <div className="space-y-4">
                {hours.map((item, i) => (
                  <div key={i} className="flex justify-between items-baseline border-b border-[#1A1A1A]/10 pb-4">
                    <span className="text-fluid-base font-medium text-[#1A1A1A]">{item.day}</span>
                    <span className={`text-fluid-sm ${item.time === 'Chiuso' ? 'text-[#C4715B]' : 'text-[#9C958C]'}`}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div ref={el => itemRefs.current[4] = el}>
              <a
                href="https://wa.me/393355358621"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 bg-[#1A1A1A] text-[#F5F0E8] p-6 md:p-8 hover:bg-[#C4715B] transition-colors duration-500"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#F5F0E8]/30 flex items-center justify-center group-hover:border-[#F5F0E8] transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <span className="block text-fluid-lg font-serif">Scrivici su WhatsApp</span>
                  <span className="block text-fluid-sm text-[#F5F0E8]/70">Rispondiamo velocemente</span>
                </div>
                <svg className="w-6 h-6 ml-auto group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Accessibility note */}
            <div
              ref={el => itemRefs.current[5] = el}
              className="mt-8 flex items-center gap-3 text-[#9C958C]"
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-fluid-xs">Negozio accessibile ai disabili</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
