import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import heroImage from '../assets/foto/foto-5.webp'
import foto10 from '../assets/foto/foto-10.webp'
import foto9 from '../assets/foto/foto-9.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const imageRef = useRef(null)
  const image2Ref = useRef(null)
  const image3Ref = useRef(null)
  const yearRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split the title text
      const titleSplit = new SplitType(titleRef.current, { types: 'chars, words' })
      const subtitleSplit = new SplitType(subtitleRef.current, { types: 'lines' })

      // Title animation - cinematic reveal
      gsap.fromTo(titleSplit.chars,
        {
          y: 120,
          opacity: 0,
          rotateX: -90
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.4,
          ease: 'power4.out',
          stagger: {
            amount: 0.8,
            from: 'start'
          },
          delay: 0.3
        }
      )

      // Subtitle lines animation
      gsap.fromTo(subtitleSplit.lines,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 1.2
        }
      )

      // Year counter animation
      gsap.fromTo(yearRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.8
        }
      )

      // Main image - asymmetric reveal
      gsap.fromTo(imageRef.current,
        {
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          scale: 1.3
        },
        {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          scale: 1,
          duration: 1.8,
          ease: 'power4.inOut',
          delay: 0.5
        }
      )

      // Secondary image - offset timing
      gsap.fromTo(image2Ref.current,
        {
          clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          x: 100
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          x: 0,
          duration: 1.6,
          ease: 'power3.inOut',
          delay: 1.2
        }
      )

      // Third image - different reveal
      gsap.fromTo(image3Ref.current,
        {
          y: 100,
          opacity: 0,
          rotate: 5
        },
        {
          y: 0,
          opacity: 1,
          rotate: -3,
          duration: 1.4,
          ease: 'power3.out',
          delay: 1.6
        }
      )

      // Parallax on scroll
      gsap.to(imageRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      gsap.to(image2Ref.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2
        }
      })

      gsap.to(image3Ref.current, {
        y: -150,
        rotate: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      })

      // Marquee scroll speed control
      gsap.to(marqueeRef.current, {
        x: '-50%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[120vh] md:min-h-[150vh] overflow-hidden bg-[#F5F0E8]"
    >
      {/* Year - absolute positioned, breaking the grid */}
      <div
        ref={yearRef}
        className="absolute top-[15vh] right-[5vw] md:right-[8vw] z-10"
      >
        <span className="text-fluid-display font-serif text-[#C4715B]/20 leading-none">
          1967
        </span>
      </div>

      {/* Main content - asymmetric layout */}
      <div className="relative pt-[20vh] md:pt-[25vh] px-6 md:px-0">
        {/* Title - left aligned, breaking container */}
        <div className="md:ml-[8vw] max-w-[90vw] md:max-w-[55vw]">
          <h1
            ref={titleRef}
            className="text-fluid-3xl md:text-fluid-display font-serif text-[#1A1A1A] leading-[0.9] tracking-tight"
            style={{ perspective: '1000px' }}
          >
            Le scarpe
            <br />
            <span className="italic text-[#C4715B]">perfette</span>
            <br />
            per te
          </h1>
        </div>

        {/* Subtitle - offset right */}
        <div className="mt-12 md:mt-16 md:ml-[35vw] max-w-[400px] px-6 md:px-0">
          <p
            ref={subtitleRef}
            className="text-fluid-base text-[#9C958C] leading-relaxed"
          >
            Da oltre 57 anni nel cuore di Bienno,
            uno dei Borghi più Belli d'Italia.
            Calzature e accessori con la passione di sempre.
          </p>
        </div>

        {/* CTA - further offset */}
        <div className="mt-10 md:ml-[35vw]">
          <a
            href="#collezioni"
            className="group inline-flex items-center gap-4"
          >
            <span className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center group-hover:bg-[#1A1A1A] transition-all duration-500">
              <svg
                className="w-6 h-6 text-[#1A1A1A] group-hover:text-[#F5F0E8] transition-colors duration-500 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <span className="text-fluid-sm font-medium text-[#1A1A1A] tracking-wide uppercase">
              Scopri le collezioni
            </span>
          </a>
        </div>
      </div>

      {/* Images - broken grid, overlapping */}
      <div className="absolute top-[30vh] right-0 w-[45vw] md:w-[35vw] aspect-[3/4]">
        <div ref={imageRef} className="w-full h-full overflow-hidden">
          <img
            src={heroImage}
            alt="Sneakers eleganti nel borgo di Bienno"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Second image - overlapping the first */}
      <div className="absolute top-[55vh] md:top-[50vh] right-[25vw] md:right-[30vw] w-[40vw] md:w-[25vw] aspect-[4/5] z-20">
        <div ref={image2Ref} className="w-full h-full overflow-hidden">
          <img
            src={foto10}
            alt="Sneakers urbane"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Third image - bottom left, rotated */}
      <div
        ref={image3Ref}
        className="absolute bottom-[15vh] left-[5vw] w-[35vw] md:w-[20vw] aspect-square z-10"
      >
        <img
          src={foto9}
          alt="Scarponcini artigianali"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Stats - scattered, not grid */}
      <div className="absolute bottom-[25vh] md:bottom-[20vh] right-[10vw] text-right">
        <div className="text-fluid-2xl font-serif text-[#1A1A1A]">57</div>
        <div className="text-fluid-xs uppercase tracking-widest text-[#9C958C]">Anni</div>
      </div>

      <div className="absolute bottom-[35vh] md:bottom-[35vh] right-[25vw] md:right-[18vw] text-right">
        <div className="text-fluid-2xl font-serif text-[#1A1A1A]">5K+</div>
        <div className="text-fluid-xs uppercase tracking-widest text-[#9C958C]">Followers</div>
      </div>

      {/* Marquee at bottom */}
      <div className="absolute bottom-0 left-0 right-0 py-6 border-t border-[#1A1A1A]/10 overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 px-8 text-fluid-sm text-[#9C958C]">
              <span>Bienno</span>
              <span className="w-2 h-2 rounded-full bg-[#C4715B]" />
              <span>Valle Camonica</span>
              <span className="w-2 h-2 rounded-full bg-[#C4715B]" />
              <span>Dal 1967</span>
              <span className="w-2 h-2 rounded-full bg-[#C4715B]" />
              <span>Borgo più Bello d'Italia</span>
              <span className="w-2 h-2 rounded-full bg-[#C4715B]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
