"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeSelector from '@/components/ui/ThemeSelector'
import { DISPLAY_NAME, NAV_PAGES } from '@/lib/constants'
import { ChevronDown } from 'lucide-react'
import { ANIMATION } from '@/lib/animation'

const Navigation = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // 滚动时添加背景和边框
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 关闭移动端菜单时恢复滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const handleNavigation = () => {
    setIsMenuOpen(false)
  }

  const navItems = NAV_PAGES

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-(--nav-background) backdrop-blur-md border-b border-(--border-color)'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — serif wordmark */}
        <Link
          href="/"
          className="font-heading text-xl text-(--foreground) z-10 relative"
          onClick={handleNavigation}
        >
          {DISPLAY_NAME}
        </Link>

        {/* Desktop nav links — right-aligned */}
        <div className="hidden nav:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <div
              key={'href' in item ? item.href : item.text}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {'href' in item ? (
                <>
                  <NavLink
                    href={item.href}
                    text={item.text}
                    isActive={pathname === item.href}
                    onClick={handleNavigation}
                  />
                  {(pathname === item.href || hoveredIndex === index) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute left-0 top-full h-px w-full bg-(--accent)"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        mass: 0.5
                      }}
                    />
                  )}
                </>
              ) : (
                <DropdownNavItem
                  text={item.text}
                  items={item.children}
                  isActive={item.children.some(child => pathname === child.href)}
                  isHovered={hoveredIndex === index}
                  onClick={handleNavigation}
                />
              )}
            </div>
          ))}

          <ThemeSelector />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center space-x-2 nav:hidden">
          <ThemeSelector />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-(--foreground)"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION.duration.normal }}
            className="nav:hidden fixed inset-0 top-16 bg-(--background) z-40"
          >
            <motion.div
              className="flex flex-col items-center justify-center h-full space-y-8"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.06 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
            >
              {navItems.map((item) =>
                'href' in item ? (
                  <motion.div
                    key={item.href}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 },
                    }}
                    transition={{ duration: ANIMATION.duration.normal, ease: ANIMATION.ease.out }}
                  >
                    <Link
                      href={item.href}
                      onClick={handleNavigation}
                      className={`font-heading text-3xl ${
                        pathname === item.href
                          ? 'text-(--foreground)'
                          : 'text-(--secondary-text) hover:text-(--foreground)'
                      } transition-colors`}
                    >
                      {item.text}
                    </Link>
                  </motion.div>
                ) : (
                  item.children.map((child) => (
                    <motion.div
                      key={child.href}
                      variants={{
                        open: { opacity: 1, y: 0 },
                        closed: { opacity: 0, y: 20 },
                      }}
                      transition={{ duration: ANIMATION.duration.normal, ease: ANIMATION.ease.out }}
                    >
                      <Link
                        href={child.href}
                        onClick={handleNavigation}
                        className={`font-heading text-3xl ${
                          pathname === child.href
                            ? 'text-(--foreground)'
                            : 'text-(--secondary-text) hover:text-(--foreground)'
                        } transition-colors`}
                      >
                        {child.text}
                      </Link>
                    </motion.div>
                  ))
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const NavLink = ({
  href,
  text,
  isActive,
  onClick,
}: {
  href: string
  text: string
  isActive: boolean
  onClick?: () => void
}) => (
  <Link
    href={href}
    className={`relative py-1 text-sm uppercase tracking-[0.05em] ${
      isActive
        ? 'text-(--foreground)'
        : 'text-(--secondary-text) hover:text-(--foreground)'
    } transition-colors duration-200`}
    onClick={onClick}
  >
    {text}
  </Link>
)

const DropdownNavItem = ({
  text,
  items,
  isActive,
  isHovered,
  onClick,
}: {
  text: string
  items: readonly { href: string; text: string }[]
  isActive: boolean
  isHovered: boolean
  onClick?: () => void
}) => (
  <div className="relative">
    <button
      className={`relative py-1 flex items-center space-x-1 text-sm uppercase tracking-[0.05em] ${
        isActive
          ? 'text-(--foreground)'
          : 'text-(--secondary-text) hover:text-(--foreground)'
      } transition-colors duration-200`}
    >
      <span className="relative">
        {text}
        {(isActive || isHovered) && (
          <motion.div
            layoutId="nav-underline"
            className="absolute left-0 top-full h-px w-full bg-(--accent)"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 0.5
            }}
          />
        )}
      </span>
      <ChevronDown className="w-3 h-3" />
    </button>

    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-0 mt-2 bg-(--card-background) border border-(--border-color) rounded-lg py-2 min-w-[140px] z-50"
        >
          {items.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClick}
              className="block px-4 py-2 text-sm text-(--secondary-text) hover:text-(--foreground) hover:bg-(--accent-muted) transition-colors"
            >
              {child.text}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

export default Navigation