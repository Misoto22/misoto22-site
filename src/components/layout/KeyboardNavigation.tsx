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

  // Find current page index
  const getCurrentPageIndex = useCallback(() => {
    return NAV_PAGES.findIndex(page => page.href === pathname)
  }, [pathname])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = getCurrentPageIndex()
      if (currentIndex === -1) return

      // Only handle arrow keys when no input is focused
      if (document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA') {
        return
      }

      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        event.preventDefault()
        router.push(NAV_PAGES[currentIndex - 1].href)
      } else if (event.key === 'ArrowRight' && currentIndex < NAV_PAGES.length - 1) {
        event.preventDefault()
        router.push(NAV_PAGES[currentIndex + 1].href)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [getCurrentPageIndex, router])

  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}

export default KeyboardNavigation
