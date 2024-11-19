"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type ToolItem = {
  name: string;
  href: string;
}

const tools: ToolItem[] = [
  {
    name: 'Stirling PDF',
    href: 'https://stirling-pdf-tu767.ondigitalocean.app/'
  }
]

const ToolsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative py-1 text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1"
      >
        Tools
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-[var(--card-background)] rounded-md shadow-lg py-1 z-50">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-[var(--secondary-text)] hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-colors"
            >
              {tool.name}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

const Navigation = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigation = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed w-full bg-[var(--nav-background)] backdrop-blur-sm z-50">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold tracking-wider" onClick={handleNavigation}>
            HENRY CHEN
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/" text="Photography" isActive={pathname === '/'} onClick={handleNavigation} />
            <NavLink href="/projects" text="Projects" isActive={pathname === '/projects'} onClick={handleNavigation} />
            <ToolsDropdown />
            <NavLink href="/about" text="About" isActive={pathname === '/about'} onClick={handleNavigation} />
            <NavLink href="/contact" text="Contact" isActive={pathname === '/contact'} onClick={handleNavigation} />
            <NavLink href="/blog" text="Blog" isActive={pathname === '/blog'} onClick={handleNavigation} />
          </div>

          {/* Social Icons - Desktop */}
          <div className="hidden md:flex space-x-4">
            <SocialLinks />
          </div>

          {/* Mobile Menu Button */}
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
                  <MenuItem href="/" text="Photography" isActive={pathname === '/'} onClick={handleNavigation} />
                  <MenuItem href="/projects" text="Projects" isActive={pathname === '/projects'} onClick={handleNavigation} />
                  <MenuItem href="/about" text="About" isActive={pathname === '/about'} onClick={handleNavigation} />
                  <MenuItem href="/contact" text="Contact" isActive={pathname === '/contact'} onClick={handleNavigation} />
                  <MenuItem href="/blog" text="Blog" isActive={pathname === '/blog'} onClick={handleNavigation} />
                  <MenuItem href="/tools" text="Tools" isActive={pathname === '/tools'} onClick={handleNavigation} />
                </motion.div>
                <motion.div 
                  className="flex space-x-4 pt-4 border-t border-[var(--border-color)] mt-4 pb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <SocialLinks />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

const SocialLinks = () => (
  <>
    <a href="https://www.instagram.com/hry.photography/" className="text-gray-600 hover:text-gray-900">
      <span className="sr-only">Instagram</span>
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
      </svg>
    </a>
    <a href="https://www.linkedin.com/in/henry-misoto22" className="text-gray-600 hover:text-gray-900">
      <span className="sr-only">LinkedIn</span>
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </a>
  </>
)

const NavLink = ({ 
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
  <Link
    href={href}
    className={`relative py-1 ${
      isActive 
        ? 'text-[var(--foreground)]' 
        : 'text-[var(--secondary-text)] hover:text-[var(--foreground)]'
    } transition-colors`}
    onClick={onClick}
  >
    {isActive && (
      <motion.span
        layoutId="underline"
        className="absolute left-0 top-full h-px w-full bg-[var(--foreground)]"
      />
    )}
    {text}
  </Link>
)

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