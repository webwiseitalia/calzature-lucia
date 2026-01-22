import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import foto1 from '../assets/new foto/new foto-1.webp'
import foto2 from '../assets/new foto/new foto-2.webp'
import foto3 from '../assets/new foto/new foto-3.png'
import foto4 from '../assets/new foto/new foto-4.webp'
import foto5 from '../assets/new foto/new foto-5.webp'
import foto6 from '../assets/new foto/new foto-6.png'

gsap.registerPlugin(ScrollTrigger)

const gridImages = [
  { src: foto1, delay: 0 },
  { src: foto2, delay: 0.1 },
  { src: foto3, delay: 0.2 },
  { src: foto4, delay: 0.15 },
  { src: foto5, delay: 0.25 },
  { src: foto6, delay: 0.05 },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid images - staggered mosaic reveal
      const gridItems = gridRef.current.querySelectorAll('.grid-item')

      gridItems.forEach((item, i) => {
        const img = item.querySelector('img')
        const overlay = item.querySelector('.overlay')

        // Random starting positions for mosaic effect
        const randomX = (Math.random() - 0.5) * 100
        const randomY = (Math.random() - 0.5) * 100
        const randomRotate = (Math.random() - 0.5) * 15

        gsap.fromTo(item,
          {
            opacity: 0,
            scale: 0.8,
            x: randomX,
            y: randomY,
            rotate: randomRotate
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotate: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2 + (i * 0.12)
          }
        )

        // Overlay wipe
        gsap.fromTo(overlay,
          { scaleY: 1 },
          {
            scaleY: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            delay: 0.5 + (i * 0.12)
          }
        )

        // Parallax on scroll for each image
        gsap.to(img, {
          y: -30 - (i * 10),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1 + (i * 0.2)
          }
        })
      })

      // Title animation
      const titleSplit = new SplitType(titleRef.current, { types: 'chars, words' })

      gsap.fromTo(titleSplit.chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: { amount: 0.6, from: 'start' },
          delay: 0.8
        }
      )

      // Subtitle
      gsap.fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.4 }
      )

      // CTA
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.6 }
      )

      // Hover effects for grid items
      gridItems.forEach((item) => {
        const img = item.querySelector('img')

        item.addEventListener('mouseenter', () => {
          gsap.to(img, { scale: 1.1, duration: 0.6, ease: 'power2.out' })
        })

        item.addEventListener('mouseleave', () => {
          gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' })
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#1A1A1A]"
    >
      {/* Photo Grid - Full screen mosaic */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid grid-cols-3 md:grid-cols-6 grid-rows-2 gap-1 md:gap-2 p-1 md:p-2"
      >
        {gridImages.map((image, index) => {
          // Different aspect ratios and spans for visual interest
          const spans = [
            'col-span-1 row-span-1 md:col-span-2 md:row-span-2',
            'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
            'col-span-1 row-span-2 md:col-span-1 md:row-span-2',
            'col-span-2 row-span-1 md:col-span-2 md:row-span-1',
            'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
            'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
          ]

          return (
            <div
              key={index}
              className={`grid-item relative overflow-hidden cursor-pointer ${spans[index]}`}
            >
              <img
                src={image.src}
                alt={`Calzature ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Reveal overlay */}
              <div className="overlay absolute inset-0 bg-[#1A1A1A] origin-top" />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#C4715B]/0 hover:bg-[#C4715B]/20 transition-colors duration-500" />
            </div>
          )
        })}
      </div>

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/80 via-transparent to-transparent pointer-events-none" />

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-[8vw]">
        {/* Main title */}
        <div className="max-w-4xl">
          <h1
            ref={titleRef}
            className="text-[12vw] md:text-[8vw] font-serif text-[#F5F0E8] leading-[0.9] tracking-tight"
          >
            Le scarpe
            <br />
            <span className="italic text-[#C4715B]">perfette</span>
            <span className="text-[#F5F0E8]"> per te</span>
          </h1>
        </div>

        {/* Subtitle and CTA row */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p
            ref={subtitleRef}
            className="text-fluid-base text-[#9C958C] leading-relaxed max-w-md"
          >
            Da oltre 57 anni nel cuore di Bienno, uno dei Borghi più Belli d'Italia.
            Calzature e accessori con la passione di sempre.
          </p>

          <div ref={ctaRef} className="flex items-center gap-8">
            {/* Stats */}
            <div className="hidden md:flex items-center gap-8">
              <div className="text-right">
                <div className="text-fluid-xl font-serif text-[#F5F0E8]">57</div>
                <div className="text-fluid-xs uppercase tracking-widest text-[#9C958C]">Anni</div>
              </div>
              <div className="w-px h-12 bg-[#F5F0E8]/20" />
              <div className="text-right">
                <div className="text-fluid-xl font-serif text-[#F5F0E8]">5K+</div>
                <div className="text-fluid-xs uppercase tracking-widest text-[#9C958C]">Followers</div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="#collezioni"
              className="group flex items-center gap-4 bg-[#C4715B] hover:bg-[#F5F0E8] text-[#F5F0E8] hover:text-[#1A1A1A] px-6 py-4 transition-all duration-500"
            >
              <span className="text-fluid-sm font-medium uppercase tracking-wider">
                Scopri
              </span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#9C958C]">
        <span className="text-fluid-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#C4715B] to-transparent animate-pulse" />
      </div>
    </section>
  )
}
