'use client'

import { useRouter, usePathname } from 'next/navigation'
import { ReactNode, useCallback, useEffect } from 'react'
import { NAV_PAGES } from '@/lib/constants'

interface KeyboardNavigationProps {
  children: ReactNode
}

const KeyboardNavigation = ({ children }: KeyboardNavigationProps) => {
  const router = useRouter()
  const pathname = usePathname()

  // Create a flattened list of all navigable pages
  const flattenedPages = useCallback(() => {
    const pages: { href: string; text: string }[] = []
    NAV_PAGES.forEach(page => {
      if ('href' in page) {
        pages.push(page)
      } else if ('children' in page) {
        pages.push(...page.children)
      }
    })
    return pages
  }, [])

  // Find current page index
  const getCurrentPageIndex = useCallback(() => {
    return flattenedPages().findIndex(page => page.href === pathname)
  }, [pathname, flattenedPages])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = getCurrentPageIndex()
      const pages = flattenedPages()
      if (currentIndex === -1) return

      // Only handle arrow keys when no input is focused
      if (document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA') {
        return
      }

      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        event.preventDefault()
        router.push(pages[currentIndex - 1].href)
      } else if (event.key === 'ArrowRight' && currentIndex < pages.length - 1) {
        event.preventDefault()
        router.push(pages[currentIndex + 1].href)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [getCurrentPageIndex, router, flattenedPages])

  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}

export default KeyboardNavigation
