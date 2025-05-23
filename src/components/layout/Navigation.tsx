"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeSelector from '@/components/ui/ThemeSelector'
import { DISPLAY_NAME } from '@/lib/constants'
import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon, Monitor } from 'lucide-react'

const Navigation = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
        {/* Theme selector and mobile menu button */}
        <div className="absolute right-6 top-6 flex items-center space-x-4">
          <ThemeSelector />
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
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
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
                <motion.div
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -10 }
                  }}
                  className="pt-4 border-t border-[var(--border-color)]"
                >
                  <MobileThemeSelector />
                </motion.div>
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

const MobileThemeSelector = () => {
  const { theme, resolvedTheme, setTheme } = useTheme()
  
  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ] as const

  return (
    <div className="space-y-2">
      <p className="text-sm text-[var(--secondary-text)] px-1">Theme</p>
      <div className="flex space-x-2">
        {themeOptions.map((option) => {
          const Icon = option.icon
          const isSelected = theme === option.value
          
          return (
            <motion.button
              key={option.value}
              onClick={() => setTheme(option.value)}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 ${
                isSelected 
                  ? 'bg-[var(--foreground)] text-[var(--background)]' 
                  : 'bg-[var(--border-color)] hover:bg-opacity-80'
              }`}
              aria-label={`Set theme to ${option.label}`}
            >
              <motion.div
                initial={false}
                animate={isSelected ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-4 h-4" />
              </motion.div>
              <span className="text-sm">
                {option.label}
                {option.value === 'system' && theme === 'system' && (
                  <span className="text-xs opacity-60 ml-1">
                    ({resolvedTheme})
                  </span>
                )}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default Navigation