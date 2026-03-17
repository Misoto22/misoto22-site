'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ANIMATION } from '@/lib/animation'
import {
  NAV_PAGES,
  EMAIL,
  RESUME_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  UNSPLASH_URL,
} from '@/lib/constants'
import { useTheme } from '@/context/ThemeContext'

// --- Types ---

interface PaletteItem {
  title: string
  href: string
  subtitle?: string
  keywords?: string
  external?: boolean
  // 非导航类 action
  action?: () => void
  icon?: 'external' | 'action'
}

interface DynamicData {
  projects: PaletteItem[]
  posts: PaletteItem[]
  experience: PaletteItem[]
  education: PaletteItem[]
}

// --- Static data ---

const PAGES: PaletteItem[] = (() => {
  const items: PaletteItem[] = []
  NAV_PAGES.forEach((page) => {
    if ('children' in page) {
      page.children.forEach((child) =>
        items.push({ title: child.text, href: child.href })
      )
    } else {
      items.push({ title: page.text, href: page.href })
    }
  })
  return items
})()

const SOCIAL_LINKS: PaletteItem[] = [
  { title: 'GitHub', href: GITHUB_URL, subtitle: 'github.com/Misoto22', external: true, keywords: 'github code source', icon: 'external' },
  { title: 'LinkedIn', href: LINKEDIN_URL, subtitle: 'linkedin.com/in/henry-misoto22', external: true, keywords: 'linkedin profile', icon: 'external' },
  { title: 'Instagram', href: INSTAGRAM_URL, subtitle: 'instagram.com/hry.photography', external: true, keywords: 'instagram photography photos', icon: 'external' },
  { title: 'Unsplash', href: UNSPLASH_URL, subtitle: 'unsplash.com/@misoto22', external: true, keywords: 'unsplash photography photos', icon: 'external' },
]

// Module-level cache
let cachedData: DynamicData | null = null

async function fetchDynamicData(): Promise<DynamicData> {
  if (cachedData) return cachedData
  try {
    const res = await fetch('/api/command-palette')
    if (!res.ok) throw new Error('Failed to fetch')
    cachedData = await res.json()
    return cachedData!
  } catch {
    return { projects: [], posts: [], experience: [], education: [] }
  }
}

// --- Search ---

function matchesQuery(item: PaletteItem, tokens: string[]): boolean {
  const haystack = `${item.title} ${item.subtitle ?? ''} ${item.keywords ?? ''}`.toLowerCase()
  return tokens.every((t) => haystack.includes(t))
}

const MAX_PER_GROUP = 8

// --- Component ---

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [dynamicData, setDynamicData] = useState<DynamicData>({
    projects: [],
    posts: [],
    experience: [],
    education: [],
  })
  const [activeIndex, setActiveIndex] = useState(0)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const router = useRouter()
  const { theme, cycleTheme } = useTheme()

  // Actions — 需要在组件内定义因为依赖 hooks
  const ACTIONS: PaletteItem[] = useMemo(() => [
    {
      title: 'Toggle Theme',
      href: '#',
      subtitle: `Currently: ${theme}`,
      keywords: 'theme dark light mode toggle switch',
      icon: 'action' as const,
      action: () => cycleTheme(),
    },
    {
      title: copiedEmail ? 'Copied!' : 'Copy Email',
      href: '#',
      subtitle: EMAIL,
      keywords: 'email contact copy clipboard',
      icon: 'action' as const,
      action: () => {
        navigator.clipboard.writeText(EMAIL)
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      },
    },
    {
      title: 'Download Resume',
      href: RESUME_URL,
      subtitle: 'PDF',
      keywords: 'resume cv download pdf',
      icon: 'action' as const,
    },
  ], [theme, cycleTheme, copiedEmail])

  // Fetch dynamic data on first open
  useEffect(() => {
    if (open) {
      fetchDynamicData().then(setDynamicData)
    }
  }, [open])

  // Open / close helpers
  const openPalette = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement
    setOpen(true)
    setQuery('')
    setActiveIndex(0)
  }, [])

  const closePalette = useCallback(() => {
    setOpen(false)
    previousFocusRef.current?.focus()
  }, [])

  // Body scroll lock + data-modal-open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.body.setAttribute('data-modal-open', 'true')
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      document.body.style.overflow = ''
      document.body.removeAttribute('data-modal-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.body.removeAttribute('data-modal-open')
    }
  }, [open])

  // Global Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (open) closePalette()
        else openPalette()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, openPalette, closePalette])

  // Filtered + grouped results
  const groups = useMemo(() => {
    const tokens = query
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)

    const result: { label: string; items: PaletteItem[] }[] = []

    if (tokens.length === 0) {
      // 默认视图：页面 + actions
      result.push({ label: 'Quick Links', items: PAGES })
      result.push({ label: 'Actions', items: ACTIONS })
    } else {
      const filter = (items: PaletteItem[]) =>
        items.filter((p) => matchesQuery(p, tokens)).slice(0, MAX_PER_GROUP)

      const pageResults = filter(PAGES)
      const actionResults = filter(ACTIONS)
      const projectResults = filter(dynamicData.projects)
      const experienceResults = filter(dynamicData.experience)
      const educationResults = filter(dynamicData.education)
      const postResults = filter(dynamicData.posts)
      const socialResults = filter(SOCIAL_LINKS)

      if (pageResults.length) result.push({ label: 'Pages', items: pageResults })
      if (actionResults.length) result.push({ label: 'Actions', items: actionResults })
      if (projectResults.length) result.push({ label: 'Projects', items: projectResults })
      if (experienceResults.length) result.push({ label: 'Experience', items: experienceResults })
      if (educationResults.length) result.push({ label: 'Education', items: educationResults })
      if (postResults.length) result.push({ label: 'Blog', items: postResults })
      if (socialResults.length) result.push({ label: 'Social', items: socialResults })
    }

    return result
  }, [query, dynamicData, ACTIONS])

  // Flat list of all visible items for keyboard nav
  const flatItems = useMemo(
    () => groups.flatMap((g) => g.items),
    [groups]
  )

  // Clamp active index when results change
  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, Math.max(flatItems.length - 1, 0)))
  }, [flatItems.length])

  // Execute item — action 或导航
  const executeItem = useCallback(
    (item: PaletteItem) => {
      if (item.action) {
        item.action()
        // action 类不关闭面板（如 toggle theme、copy email）
        return
      }
      closePalette()
      if (item.external || item.href.startsWith('http')) {
        window.open(item.href, '_blank', 'noopener,noreferrer')
      } else {
        router.push(item.href)
      }
    },
    [closePalette, router]
  )

  // Keyboard navigation within palette
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      closePalette()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => Math.min(prev + 1, flatItems.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (flatItems[activeIndex]) {
        executeItem(flatItems[activeIndex])
      }
    }
  }

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listRef.current?.querySelector(
      `[data-index="${activeIndex}"]`
    )
    activeEl?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  // Build a global index for each item
  let globalIndex = 0

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[25vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION.duration.fast }}
          onClick={closePalette}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative z-10 w-full max-w-lg mx-4 bg-(--card-background) border border-(--border-color) rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{
              duration: ANIMATION.duration.normal,
              ease: ANIMATION.ease.out,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-(--border-color)">
              <svg
                className="w-4 h-4 text-(--secondary-text) shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActiveIndex(0)
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Where would you like to go?"
                className="flex-1 bg-transparent text-(--foreground) placeholder:text-(--secondary-text) font-heading text-sm outline-none"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-list"
                aria-activedescendant={
                  flatItems.length > 0
                    ? `command-palette-item-${activeIndex}`
                    : undefined
                }
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 font-mono text-[10px] text-(--secondary-text) bg-(--background) border border-(--border-color) rounded">
                esc
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              id="command-palette-list"
              role="listbox"
              className="max-h-[50vh] overflow-y-auto py-2"
            >
              {flatItems.length === 0 && query.length > 0 && (
                <div className="px-4 py-8 text-center text-sm text-(--secondary-text)">
                  No results for &ldquo;{query}&rdquo;
                </div>
              )}

              {groups.map((group) => (
                <div key={group.label}>
                  {/* Section header */}
                  <div className="px-4 pt-3 pb-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-(--secondary-text) select-none">
                    {group.label}
                  </div>

                  {/* Items */}
                  {group.items.map((item) => {
                    const idx = globalIndex++
                    const isActive = idx === activeIndex
                    const isExternal = item.external || (item.href.startsWith('http') && !item.action)
                    return (
                      <button
                        key={`${group.label}-${item.title}-${item.href}`}
                        id={`command-palette-item-${idx}`}
                        data-index={idx}
                        role="option"
                        aria-selected={isActive}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors duration-100 ${
                          isActive
                            ? 'bg-(--accent-muted) border-l-2 border-(--accent)'
                            : 'border-l-2 border-transparent hover:bg-(--accent-muted)/50'
                        }`}
                        onClick={() => executeItem(item)}
                        onMouseEnter={() => setActiveIndex(idx)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-(--foreground) truncate">
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="text-xs text-(--secondary-text) truncate">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                        {isExternal && (
                          <svg
                            className="w-3 h-3 text-(--secondary-text) shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6H21m0 0v7.5m0-7.5l-10.5 10.5"
                            />
                          </svg>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Footer with keyboard hints */}
            <div className="flex items-center gap-4 px-4 py-2 border-t border-(--border-color)">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-(--secondary-text)">
                <kbd className="px-1 py-0.5 bg-(--background) border border-(--border-color) rounded text-[10px]">
                  ↑↓
                </kbd>
                navigate
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-(--secondary-text)">
                <kbd className="px-1 py-0.5 bg-(--background) border border-(--border-color) rounded text-[10px]">
                  ↵
                </kbd>
                open
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-(--secondary-text)">
                <kbd className="px-1 py-0.5 bg-(--background) border border-(--border-color) rounded text-[10px]">
                  esc
                </kbd>
                close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
