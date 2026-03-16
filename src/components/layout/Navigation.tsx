"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeSelector from '@/components/ui/ThemeSelector'
import { DISPLAY_NAME, NAV_PAGES } from '@/lib/constants'
import { ANIMATION } from '@/lib/animation'

const Navigation = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const handleNavigation = () => setIsMenuOpen(false)

  // 延迟关闭下拉菜单，避免鼠标移动时闪烁
  const openDropdown = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setDropdownOpen(true)
  }
  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150)
  }

  const navItems = NAV_PAGES

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
          {navItems.map((item) =>
            'href' in item ? (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavigation}
                className={`relative px-3 py-1.5 text-[13px] uppercase tracking-[0.08em] rounded-md transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-(--foreground)'
                    : 'text-(--secondary-text) hover:text-(--foreground) hover:bg-(--accent-muted)'
                }`}
              >
                {item.text}
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-3 right-3 h-px bg-(--accent)"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </Link>
            ) : (
              <div
                key={item.text}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-1.5 text-[13px] uppercase tracking-[0.08em] rounded-md transition-colors duration-200 ${
                    item.children.some(c => pathname === c.href)
                      ? 'text-(--foreground)'
                      : 'text-(--secondary-text) hover:text-(--foreground) hover:bg-(--accent-muted)'
                  }`}
                >
                  {item.text}
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
                </button>

                {/* Active indicator for dropdown parent */}
                {item.children.some(c => pathname === c.href) && (
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
                                pathname === child.href
                                  ? 'text-(--foreground) bg-(--accent-muted) font-medium'
                                  : 'text-(--foreground-muted) hover:text-(--foreground) hover:bg-(--accent-muted)'
                              }`}
                            >
                              {child.text}
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

          <div className="ml-2 pl-2 border-l border-(--border-subtle)">
            <ThemeSelector />
          </div>
        </div>

        {/* ─── Mobile: theme + hamburger ─── */}
        <div className="flex items-center gap-1 nav:hidden">
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
              {/* 导航链接 */}
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
                {navItems.map((item) =>
                  'href' in item ? (
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
                          pathname === item.href
                            ? 'text-(--foreground)'
                            : 'text-(--secondary-text) hover:text-(--foreground)'
                        }`}
                      >
                        {item.text}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={item.text}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -16 },
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="py-3 border-b border-(--border-subtle)"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-(--secondary-text) mb-3">
                        {item.text}
                      </p>
                      <div className="flex flex-col gap-2 pl-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={handleNavigation}
                            className={`font-heading text-2xl sm:text-3xl transition-colors duration-200 ${
                              pathname === child.href
                                ? 'text-(--foreground)'
                                : 'text-(--secondary-text) hover:text-(--foreground)'
                            }`}
                          >
                            {child.text}
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
