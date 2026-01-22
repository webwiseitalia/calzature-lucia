import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import foto1 from '../assets/foto/foto-1.webp'
import foto12 from '../assets/foto/foto-12.webp'
import foto4 from '../assets/foto/foto-4.webp'
import foto15 from '../assets/foto/foto-15.webp'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    name: 'Donna',
    description: 'Eleganza e comfort',
    image: foto12,
  },
  {
    name: 'Uomo',
    description: 'Stile contemporaneo',
    image: foto4,
  },
  {
    name: 'Bambino',
    description: 'Qualità per i piccoli',
    image: foto1,
  },
  {
    name: 'Accessori',
    description: 'Borse e pelletteria',
    image: foto15,
  }
]

export default function Categories() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleSplit = new SplitType(titleRef.current, { types: 'chars' })

      gsap.fromTo(titleSplit.chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: { amount: 0.5 },
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Staggered category reveals - irregular timing
      itemRefs.current.forEach((item, i) => {
        const delays = [0, 0.2, 0.1, 0.35]
        const yOffsets = [80, 120, 60, 100]

        gsap.fromTo(item,
          {
            y: yOffsets[i],
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: delays[i],
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Image parallax within each item
        const img = item.querySelector('img')
        gsap.to(img, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1 + (i * 0.3)
          }
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="collezioni"
      className="relative py-32 md:py-48 bg-[#1A1A1A] overflow-hidden"
    >
      {/* Asymmetric background element */}
      <div className="absolute top-0 right-0 w-[60vw] h-[40vh] bg-[#C4715B]/10 -skew-y-6 transform origin-top-right" />

      {/* Section header - off-center */}
      <div className="relative px-6 md:px-0 md:ml-[8vw] mb-20 md:mb-32">
        <span className="text-fluid-xs uppercase tracking-[0.3em] text-[#9C958C] block mb-4">
          — Collezioni
        </span>
        <h2
          ref={titleRef}
          className="text-fluid-3xl font-serif text-[#F5F0E8] leading-[0.95]"
        >
          Per tutta
          <br />
          <span className="italic text-[#C4715B]">la famiglia</span>
        </h2>
      </div>

      {/* Categories - broken grid layout */}
      <div className="relative px-6 md:px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
          {categories.map((category, index) => {
            // Irregular positioning for each item
            const positions = [
              'md:ml-[5vw] md:-mt-12',
              'md:mt-24 md:mr-[3vw]',
              'md:ml-[8vw] md:-mt-8',
              'md:mt-16 md:mr-[5vw]'
            ]

            const sizes = [
              'md:w-[22vw]',
              'md:w-[20vw]',
              'md:w-[18vw]',
              'md:w-[24vw]'
            ]

            return (
              <div
                key={category.name}
                ref={el => itemRefs.current[index] = el}
                className={`relative group ${positions[index]} ${sizes[index]}`}
              >
                {/* Image container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/40 transition-all duration-700" />
                </div>

                {/* Text - positioned outside/overlapping the image */}
                <div className="mt-4 md:mt-6">
                  <h3 className="text-fluid-lg font-serif text-[#F5F0E8] group-hover:text-[#C4715B] transition-colors duration-500">
                    {category.name}
                  </h3>
                  <p className="text-fluid-xs text-[#9C958C] mt-1">
                    {category.description}
                  </p>
                </div>

                {/* Index number - decorative */}
                <span className="absolute -top-4 -right-2 md:-top-8 md:-right-4 text-[8vw] md:text-[4vw] font-serif text-[#F5F0E8]/5 leading-none pointer-events-none">
                  0{index + 1}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom CTA - asymmetric placement */}
      <div className="relative mt-24 md:mt-40 px-6 md:px-0 md:ml-[50vw]">
        <a
          href="https://wa.me/393355358621?text=Ciao!%20Vorrei%20informazioni%20sulle%20vostre%20collezioni"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-6"
        >
          <span className="text-fluid-sm text-[#F5F0E8] group-hover:text-[#C4715B] transition-colors duration-300">
            Scopri i nuovi arrivi
          </span>
          <span className="w-12 h-12 rounded-full border border-[#F5F0E8]/30 flex items-center justify-center group-hover:border-[#C4715B] group-hover:bg-[#C4715B] transition-all duration-500">
            <svg
              className="w-5 h-5 text-[#F5F0E8] group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  )
}
