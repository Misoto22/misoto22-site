"use client"

import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeSelector from '@/components/ui/ThemeSelector'
import LocaleSwitcher from '@/components/layout/LocaleSwitcher'
import { DISPLAY_NAME } from '@/lib/constants'
import { ANIMATION } from '@/lib/animation'
import { useTranslations } from 'next-intl'

// Nav structure — text keys map to Nav namespace
const NAV_STRUCTURE = [
  { href: '/', textKey: 'home' },
  { href: '/projects', textKey: 'projects' },
  { href: '/photography', textKey: 'photography' },
  { href: '/blog', textKey: 'blog' },
  {
    href: '/about',
    textKey: 'about',
    children: [
      { href: '/about', textKey: 'about' },
      { href: '/education', textKey: 'education' },
      { href: '/experience', textKey: 'experience' },
    ],
  },
  { href: '/contact', textKey: 'contact' },
] as const

const Navigation = () => {
  const t = useTranslations('Nav')
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Strip locale prefix for active-link matching
  const normalizedPathname = pathname.replace(/^\/zh/, '') || '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    }
  }, [])

  const handleNavigation = () => setIsMenuOpen(false)

  const openDropdown = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setDropdownOpen(true)
  }
  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isMenuOpen
          ? 'bg-(--background) border-b border-(--border-color)'
          : isScrolled
            ? 'bg-(--nav-background) backdrop-blur-md border-b border-(--border-color)'
            : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-xl text-(--foreground) z-10 relative"
          onClick={handleNavigation}
        >
          {DISPLAY_NAME}
        </Link>

        {/* ─── Desktop nav ─── */}
        <div className="hidden nav:flex items-center gap-1">
          {NAV_STRUCTURE.map((item) =>
            !('children' in item) ? (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavigation}
                className={`relative px-3 py-1.5 text-[13px] uppercase tracking-[0.08em] rounded-md transition-colors duration-200 text-center min-w-[4rem] ${
                  normalizedPathname === item.href
                    ? 'text-(--foreground)'
                    : 'text-(--secondary-text) hover:text-(--foreground) hover:bg-(--accent-muted)'
                }`}
              >
                {t(item.textKey)}
                {normalizedPathname === item.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-3 right-3 h-px bg-(--accent)"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </Link>
            ) : (
              <div
                key={item.textKey}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <Link
                  href={item.href}
                  onClick={handleNavigation}
                  className={`flex items-center justify-center gap-1 px-3 py-1.5 text-[13px] uppercase tracking-[0.08em] rounded-md transition-colors duration-200 min-w-[4rem] ${
                    normalizedPathname === item.href || item.children.some(c => normalizedPathname === c.href)
                      ? 'text-(--foreground)'
                      : 'text-(--secondary-text) hover:text-(--foreground) hover:bg-(--accent-muted)'
                  }`}
                >
                  {t(item.textKey)}
                  <motion.svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className="ml-0.5"
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </Link>

                {/* Active indicator for dropdown parent */}
                {(normalizedPathname === item.href || item.children.some(c => normalizedPathname === c.href)) && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-3 right-3 h-px bg-(--accent)"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full right-0 mt-2 w-48 z-50"
                    >
                      <div
                        className="rounded-lg border border-(--border-color) overflow-hidden"
                        style={{
                          backgroundColor: 'var(--card-background)',
                          boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div className="p-1.5">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={handleNavigation}
                              className={`block px-3 py-2 rounded-md text-sm transition-all duration-150 ${
                                normalizedPathname === child.href
                                  ? 'text-(--foreground) bg-(--accent-muted) font-medium'
                                  : 'text-(--foreground-muted) hover:text-(--foreground) hover:bg-(--accent-muted)'
                              }`}
                            >
                              {t(child.textKey)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          )}

          <div className="ml-2 pl-2 border-l border-(--border-subtle) flex items-center gap-1">
            <LocaleSwitcher />
            <ThemeSelector />
          </div>
        </div>

        {/* ─── Mobile: locale + theme + hamburger ─── */}
        <div className="flex items-center gap-1 nav:hidden">
          <LocaleSwitcher />
          <ThemeSelector />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-(--foreground) rounded-md hover:bg-(--accent-muted) transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                animate={isMenuOpen ? { d: "M6 18L18 6M6 6l12 12" } : { d: "M4 7h16M4 12h16M4 17h16" }}
                transition={{ duration: 0.25 }}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ─── Mobile full-screen menu ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="nav:hidden fixed inset-0 top-0 pt-16 z-40"
            style={{ backgroundColor: 'var(--background)' }}
          >
            <div className="flex flex-col h-full">
              <motion.div
                className="flex-1 flex flex-col justify-center px-8 sm:px-12"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
              >
                {NAV_STRUCTURE.map((item) =>
                  !('children' in item) ? (
                    <motion.div
                      key={item.href}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -16 },
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="py-3 border-b border-(--border-subtle)"
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavigation}
                        className={`font-heading text-2xl sm:text-3xl transition-colors duration-200 ${
                          normalizedPathname === item.href
                            ? 'text-(--foreground)'
                            : 'text-(--secondary-text) hover:text-(--foreground)'
                        }`}
                      >
                        {t(item.textKey)}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={item.textKey}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -16 },
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="py-3 border-b border-(--border-subtle)"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-(--secondary-text) mb-3">
                        {t(item.textKey)}
                      </p>
                      <div className="flex flex-col gap-2 pl-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={handleNavigation}
                            className={`font-heading text-2xl sm:text-3xl transition-colors duration-200 ${
                              normalizedPathname === child.href
                                ? 'text-(--foreground)'
                                : 'text-(--secondary-text) hover:text-(--foreground)'
                            }`}
                          >
                            {t(child.textKey)}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation
