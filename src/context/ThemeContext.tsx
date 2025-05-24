"use client"

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextType = {
  theme: Theme
  resolvedTheme: 'light' | 'dark' // The actual theme being used
  setTheme: (theme: Theme) => void
}

// Data cache types
interface CacheEntry<T> {
  data: T
  timestamp: number
  loading: boolean
}

interface DataCache {
  projects: CacheEntry<any[]> | null
  education: CacheEntry<any[]> | null
  experience: CacheEntry<any[]> | null
  photos: CacheEntry<{ photos: any[], hasMore: boolean, page: number }> | null
}

type DataCacheContextType = {
  cache: DataCache
  setCache: (key: keyof DataCache, data: any, loading?: boolean) => void
  clearCache: (key?: keyof DataCache) => void
  isDataFresh: (key: keyof DataCache, maxAge?: number) => boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
const DataCacheContext = createContext<DataCacheContextType | undefined>(undefined)

// Data cache provider
export function DataCacheProvider({ children }: { children: React.ReactNode }) {
  const [cache, setCacheState] = useState<DataCache>({
    projects: null,
    education: null,
    experience: null,
    photos: null
  })

  const setCache = useCallback((key: keyof DataCache, data: any, loading: boolean = false) => {
    setCacheState(prev => ({
      ...prev,
      [key]: {
        data,
        timestamp: Date.now(),
        loading
      }
    }))
  }, [])

  const clearCache = useCallback((key?: keyof DataCache) => {
    if (key) {
      setCacheState(prev => ({
        ...prev,
        [key]: null
      }))
    } else {
      setCacheState({
        projects: null,
        education: null,
        experience: null,
        photos: null
      })
    }
  }, [])

  const isDataFresh = useCallback((key: keyof DataCache, maxAge: number = 5 * 60 * 1000) => {
    const entry = cache[key]
    if (!entry) return false
    return Date.now() - entry.timestamp < maxAge
  }, [cache])

  return (
    <DataCacheContext.Provider value={{ cache, setCache, clearCache, isDataFresh }}>
      {children}
    </DataCacheContext.Provider>
  )
}

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

export function useDataCache() {
  const context = useContext(DataCacheContext)
  if (context === undefined) {
    throw new Error('useDataCache must be used within a DataCacheProvider')
  }
  return context
}