"use client"

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextType = {
  theme: Theme
  resolvedTheme: 'light' | 'dark' // The actual theme being used
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)



export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Function to get system preference
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }, [])

  // Function to update the resolved theme
  const updateResolvedTheme = useCallback((currentTheme: Theme) => {
    const resolved = currentTheme === 'system' ? getSystemTheme() : currentTheme
    setResolvedTheme(resolved)

    // Update document class
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [getSystemTheme])

  // Set theme function
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    updateResolvedTheme(newTheme)
  }, [updateResolvedTheme])

  // Initial setup
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme

    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setThemeState(savedTheme)
      updateResolvedTheme(savedTheme)
    } else {
      // Default to system
      setThemeState('system')
      updateResolvedTheme('system')
    }
  }, [updateResolvedTheme])

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      updateResolvedTheme('system')
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [theme, updateResolvedTheme])

  // Prevent hydration error
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

