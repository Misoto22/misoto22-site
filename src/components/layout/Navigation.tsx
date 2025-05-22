"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import { DISPLAY_NAME } from '@/lib/constants'

const Navigation = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { theme, toggleTheme } = useTheme()

  const handleNavigation = () => {
    setIsMenuOpen(false)
  }

  const navItems = [
    { href: '/', text: 'Home' },
    { href: '/education', text: 'Education' },
    { href: '/projects', text: 'Projects' },
    { href: '/experience', text: 'Experience' },
    { href: '/contact', text: 'Contact' }
  ]

  return (
    <nav className="fixed top-0 w-full bg-[var(--nav-background)] backdrop-blur-sm z-50 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border-b border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-6 py-6 relative">
        {/* Logo aligned to the left */}
        <Link href="/" className="text-2xl font-semibold tracking-wider z-10 relative" onClick={handleNavigation}>
          {DISPLAY_NAME}
        </Link>
        {/* Menu items absolutely centered with responsive adjustments */}
        <div className="hidden md:flex space-x-3 nav:space-x-5 lg:space-x-6 text-base absolute md:left-[60%] nav:left-[55%] lg:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navItems.map((item, index) => (
            <div key={item.href} className="relative">
              <NavLink
                href={item.href}
                text={item.text}
                isActive={pathname === item.href}
                onClick={handleNavigation}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {(pathname === item.href || hoveredIndex === index) && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 top-full h-px w-full bg-[var(--foreground)]"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    mass: 0.5
                  }}
                />
              )}
            </div>
          ))}
        </div>
        {/* Theme toggle button and mobile menu button */}
        <div className="absolute right-6 top-6 flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-[var(--border-color)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-opacity-50"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-[var(--foreground)]" />
              ) : (
                <Sun className="w-5 h-5 text-[var(--foreground)]" />
              )}
            </motion.div>
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[var(--nav-background)] backdrop-blur-sm"
          >
            <div className="max-w-6xl mx-auto px-6">
              <motion.div
                className="flex flex-col space-y-4 py-4"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.05 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.href}
                    href={item.href}
                    text={item.text}
                    isActive={pathname === item.href}
                    onClick={handleNavigation}
                  />
                ))}
              </motion.div>
            </div>
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
  onMouseEnter,
  onMouseLeave
}: {
  href: string;
  text: string;
  isActive: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  return (
    <Link
      href={href}
      className={`relative py-1 ${
        isActive
          ? 'text-[var(--foreground)]'
          : 'text-[var(--secondary-text)] hover:text-[var(--foreground)]'
      } transition-colors`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {text}
    </Link>
  );
}

const MenuItem = ({
  href,
  text,
  isActive,
  onClick
}: {
  href: string;
  text: string;
  isActive: boolean;
  onClick?: () => void;
}) => (
  <motion.div
    variants={{
      open: { opacity: 1, y: 0 },
      closed: { opacity: 0, y: -10 }
    }}
  >
    <NavLink href={href} text={text} isActive={isActive} onClick={onClick} />
  </motion.div>
)

export default Navigation