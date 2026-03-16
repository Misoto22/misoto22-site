"use client"

import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeSelector() {
  const { resolvedTheme, cycleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-lg text-(--secondary-text) hover:text-(--foreground) transition-colors duration-200 focus:outline-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ scale: 0, rotate: isDark ? -90 : 90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: isDark ? 90 : -90 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </motion.div>
      </AnimatePresence>
    </button>
  )
} 