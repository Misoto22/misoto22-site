"use client"

import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeSelector() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ] as const

  // Determine which icon to show based on theme and resolvedTheme
  const getDisplayIcon = () => {
    if (theme === 'system') {
      return resolvedTheme === 'dark' ? Moon : Sun
    }
    return theme === 'dark' ? Moon : Sun
  }

  const DisplayIcon = getDisplayIcon()
  const isDark = resolvedTheme === 'dark'

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-(--border-color) transition-colors focus:outline-hidden focus:ring-2 focus:ring-(--foreground) focus:ring-opacity-50"
        aria-label="Select theme"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isDark ? 'dark' : 'light'}
            initial={{ scale: 0, rotate: isDark ? -180 : 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: isDark ? 180 : -180 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            <DisplayIcon className="w-5 h-5 text-(--foreground)" />
          </motion.div>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ 
              duration: 0.2,
              ease: "easeOut"
            }}
            className="absolute right-0 mt-2 w-44 rounded-lg bg-(--nav-background) border border-(--border-color) shadow-lg overflow-hidden"
          >
            <div className="p-1">
              {themeOptions.map((option) => {
                const Icon = option.icon
                const isSelected = theme === option.value
                
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => {
                      setTheme(option.value)
                      setIsOpen(false)
                    }}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full px-3 py-1.5 flex items-center space-x-3 rounded-md transition-all duration-200 ${
                      isSelected 
                        ? 'bg-(--border-color) bg-opacity-80 text-(--foreground)' 
                        : 'text-(--secondary-text) hover:bg-(--border-color) hover:bg-opacity-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm flex items-center">
                      {option.label}
                      {option.value === 'system' && theme === 'system' && (
                        <span className={`text-xs ml-1 ${
                          isSelected ? 'text-(--foreground) opacity-80' : 'text-(--secondary-text)'
                        }`}>
                          ({resolvedTheme})
                        </span>
                      )}
                    </span>
                    <AnimatePresence mode="wait">
                      {isSelected && (
                        <motion.div
                          layoutId="checkmark"
                          className="ml-auto"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                          }}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 