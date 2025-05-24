'use client'

import { useRouter, usePathname } from 'next/navigation'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { NAV_PAGES } from '@/lib/constants'

interface SwipeNavigationProps {
  children: ReactNode
}

const SwipeNavigation = ({ children }: SwipeNavigationProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [mouseStart, setMouseStart] = useState<number | null>(null)
  const [mouseEnd, setMouseEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Find current page index
  const getCurrentPageIndex = useCallback(() => {
    return NAV_PAGES.findIndex(page => page.href === pathname)
  }, [pathname])

  // Check if the target element should prevent swiping
  const shouldPreventSwipe = useCallback((target: EventTarget | null) => {
    if (!target || !(target instanceof Element)) return false

    const preventSwipeElements = ['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT', 'A']
    const preventSwipeClasses = ['no-swipe', 'swiper-container', 'swiper-wrapper']

    // Check if the element or its parents should prevent swiping
    let element: Element | null = target
    while (element) {
      if (preventSwipeElements.includes(element.tagName)) return true
      if (preventSwipeClasses.some(cls => element?.classList.contains(cls))) return true
      if (element.getAttribute('data-no-swipe') === 'true') return true
      element = element.parentElement
    }

    return false
  }, [])

  // Handle touch start
  const handleTouchStart = useCallback((e: TouchEvent) => {
    console.log('Touch start detected')
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    console.log('Touch start:', e.targetTouches[0].clientX)
  }, [])

  // Handle touch move
  const handleTouchMove = useCallback((e: TouchEvent) => {
    console.log('Touch move detected')
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    console.log('Touch end - distance:', distance, 'isLeftSwipe:', isLeftSwipe, 'isRightSwipe:', isRightSwipe)

    const currentIndex = getCurrentPageIndex()
    if (currentIndex === -1) return

    let targetIndex = currentIndex

    // Left swipe - go to next page
    if (isLeftSwipe && currentIndex < NAV_PAGES.length - 1) {
      targetIndex = currentIndex + 1
    }
    // Right swipe - go to previous page
    else if (isRightSwipe && currentIndex > 0) {
      targetIndex = currentIndex - 1
    }

    // Navigate to target page if index changed
    if (targetIndex !== currentIndex) {
      console.log('Navigating from', NAV_PAGES[currentIndex].text, 'to', NAV_PAGES[targetIndex].text)
      router.push(NAV_PAGES[targetIndex].href)
    }

    // Reset touch states
    setTouchStart(null)
    setTouchEnd(null)
  }, [touchStart, touchEnd, getCurrentPageIndex, router])

  // Handle mouse events for desktop
  const handleMouseDown = useCallback((e: MouseEvent) => {
    console.log('Mouse down detected')
    setIsDragging(true)
    setMouseEnd(null)
    setMouseStart(e.clientX)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    console.log('Mouse move detected')
    setMouseEnd(e.clientX)
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    if (!isDragging || !mouseStart || !mouseEnd) {
      setIsDragging(false)
      return
    }

    const distance = mouseStart - mouseEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    const currentIndex = getCurrentPageIndex()
    if (currentIndex === -1) {
      setIsDragging(false)
      return
    }

    let targetIndex = currentIndex

    // Left swipe - go to next page
    if (isLeftSwipe && currentIndex < NAV_PAGES.length - 1) {
      targetIndex = currentIndex + 1
    }
    // Right swipe - go to previous page
    else if (isRightSwipe && currentIndex > 0) {
      targetIndex = currentIndex - 1
    }

    // Navigate to target page if index changed
    if (targetIndex !== currentIndex) {
      router.push(NAV_PAGES[targetIndex].href)
    }

    // Reset mouse states
    setIsDragging(false)
    setMouseStart(null)
    setMouseEnd(null)
  }, [isDragging, mouseStart, mouseEnd, getCurrentPageIndex, router])

  // Add touch event listeners
  useEffect(() => {
    const element = document.body

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  // Add mouse event listeners
  useEffect(() => {
    const element = document.body

    element.addEventListener('mousedown', handleMouseDown)
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseup', handleMouseUp)
    element.addEventListener('mouseleave', handleMouseUp) // Handle mouse leaving the window

    return () => {
      element.removeEventListener('mousedown', handleMouseDown)
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseup', handleMouseUp)
      element.removeEventListener('mouseleave', handleMouseUp)
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp])

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
    <div
      className="min-h-screen"
      style={{
        touchAction: 'pan-y pinch-zoom',
        userSelect: 'none'
      }}
    >
      {children}
    </div>
  )
}

export default SwipeNavigation
