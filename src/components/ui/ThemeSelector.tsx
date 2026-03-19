"use client"

import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon, Monitor } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const THEME_ICONS = {
  light: { icon: Sun, rotate: 90 },
  dark: { icon: Moon, rotate: -90 },
  system: { icon: Monitor, rotate: 0 },
} as const

export default function ThemeSelector() {
  const { theme, cycleTheme } = useTheme()
  const { icon: Icon, rotate } = THEME_ICONS[theme]

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-lg text-(--secondary-text) hover:text-(--foreground) transition-colors duration-200 focus:outline-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ scale: 0, rotate }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: -rotate }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
      </AnimatePresence>
    </button>
  )
} 