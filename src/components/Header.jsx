import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import logo from '../assets/logocalzaturelucia.webp'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)
  const logoRef = useRef(null)

  const navigation = [
    { name: 'Collezioni', href: '#collezioni' },
    { name: 'Storia', href: '#chi-siamo' },
    { name: 'Bienno', href: '#bienno' },
    { name: 'Contatti', href: '#contatti' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(logoRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'mix-blend-difference' : ''
        }`}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 py-6">
          <a ref={logoRef} href="#home" className="relative z-50">
            <img
              src={logo}
              alt="Calzature Lucia"
              className="h-8 md:h-10 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center gap-12">
            {navigation.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                className="text-fluid-sm font-medium tracking-wide transition-colors duration-300 text-[#F5F0E8] hover:text-[#C4715B]"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/393355358621"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#F5F0E8] text-[#F5F0E8] hover:bg-[#F5F0E8] hover:text-[#1A1A1A] transition-all duration-300"
            >
              <span className="text-fluid-sm font-medium">WhatsApp</span>
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-50 md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className={`w-6 h-0.5 transition-colors ${menuOpen ? 'bg-white' : 'bg-[#F5F0E8]'}`}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`w-6 h-0.5 transition-colors ${menuOpen ? 'bg-white' : 'bg-[#F5F0E8]'}`}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className={`w-6 h-0.5 transition-colors ${menuOpen ? 'bg-white' : 'bg-[#F5F0E8]'}`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#1A1A1A] flex flex-col justify-center px-8"
          >
            <nav className="space-y-4">
              {navigation.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                  className="block text-[12vw] font-serif text-[#F5F0E8] leading-none hover:text-[#C4715B] transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute bottom-12 left-8 right-8"
            >
              <div className="flex justify-between items-end text-[#9C958C] text-fluid-sm">
                <div>
                  <p>Via Fantoni 54</p>
                  <p>Bienno (BS)</p>
                </div>
                <div className="text-right">
                  <p>+39 335 535 8621</p>
                  <p>gellyp@libero.it</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
