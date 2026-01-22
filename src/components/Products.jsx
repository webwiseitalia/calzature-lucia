import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import foto2 from '../assets/new foto/new foto-2.webp'
import foto3 from '../assets/new foto/new foto-3.png'
import foto6 from '../assets/new foto/new foto-6.png'
import foto7 from '../assets/new foto/new foto-7.webp'
import foto11 from '../assets/new foto/new foto-11.webp'
import foto13 from '../assets/new foto/new foto-13.png'
import foto14 from '../assets/new foto/new foto-14.webp'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { image: foto2, name: 'Mocassini' },
  { image: foto3, name: 'Sandali' },
  { image: foto6, name: 'Sabot' },
  { image: foto7, name: 'Oro' },
  { image: foto11, name: 'Trekking' },
  { image: foto13, name: 'Polacchini' },
  { image: foto14, name: 'Trail' },
]

export default function Products() {
  const sectionRef = useRef(null)
  const horizontalRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll
      const horizontal = horizontalRef.current
      const scrollWidth = horizontal.scrollWidth - window.innerWidth

      gsap.to(horizontal, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      })

      // Reveal items as they come into view
      const items = horizontal.querySelectorAll('.product-item')
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0.3, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              containerAnimation: gsap.getById?.('horizontal') || undefined,
              start: 'left 80%',
              end: 'left 20%',
              scrub: true
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
      className="relative min-h-screen bg-[#F5F0E8] overflow-hidden"
    >
      {/* Title - fixed during scroll */}
      <div className="absolute top-12 left-6 md:left-[8vw] z-10">
        <span className="text-fluid-xs uppercase tracking-[0.3em] text-[#9C958C] block mb-2">
          — Selezione
        </span>
        <h2
          ref={titleRef}
          className="text-fluid-2xl font-serif text-[#1A1A1A] leading-none"
        >
          In evidenza
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={horizontalRef}
        className="flex items-center h-screen pl-[8vw] pt-24"
        style={{ width: 'max-content' }}
      >
        {/* Opening spacer */}
        <div className="w-[30vw] md:w-[20vw] shrink-0" />

        {/* Products */}
        {products.map((product, index) => {
          // Irregular heights
          const heights = ['h-[50vh]', 'h-[65vh]', 'h-[45vh]', 'h-[60vh]', 'h-[55vh]', 'h-[70vh]', 'h-[50vh]', 'h-[62vh]', 'h-[48vh]']
          const widths = ['w-[35vw]', 'w-[28vw]', 'w-[40vw]', 'w-[32vw]', 'w-[38vw]', 'w-[30vw]', 'w-[36vw]', 'w-[34vw]', 'w-[42vw]']
          const marginTops = ['-mt-12', 'mt-20', '-mt-8', 'mt-16', '-mt-20', 'mt-8', '-mt-16', 'mt-24', '-mt-4']

          return (
            <div
              key={index}
              className={`product-item shrink-0 ${widths[index]} ${heights[index]} ${marginTops[index]} mr-8 md:mr-16 relative group`}
            >
              <div className="w-full h-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Product name - overlapping */}
              <div className="absolute -bottom-8 -right-4 md:-right-8">
                <span className="text-fluid-lg font-serif text-[#1A1A1A]/80 italic">
                  {product.name}
                </span>
              </div>

              {/* Index */}
              <span className="absolute top-4 left-4 text-fluid-xs text-[#1A1A1A]/40 font-mono">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )
        })}

        {/* Instagram CTA at the end */}
        <div className="shrink-0 w-[60vw] md:w-[40vw] h-[60vh] flex items-center justify-center ml-8 mr-[20vw]">
          <div className="text-center">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                <circle cx="12" cy="12" r="3.5"/>
              </svg>
            </div>

            <p className="text-fluid-xl font-serif text-[#1A1A1A] mb-2">
              5.090
            </p>
            <p className="text-fluid-sm text-[#9C958C] mb-8">
              follower su Instagram
            </p>

            <a
              href="https://www.instagram.com/calzature_lucia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[#1A1A1A] hover:text-[#C4715B] transition-colors"
            >
              <span className="text-fluid-sm font-medium">@calzature_lucia</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3 text-[#9C958C]">
        <span className="text-fluid-xs uppercase tracking-wider">Scorri</span>
        <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </section>
  )
}
