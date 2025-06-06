"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GithubSlugger from 'github-slugger'

interface TocItem {
  id: string
  text: string
  level: number
  originalIndex?: number
  isPlaceholder?: boolean
}

interface TableOfContentsProps {
  content: string
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [shouldHideToc, setShouldHideToc] = useState(false)


  // Extract headings from markdown content
  useEffect(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const items: TocItem[] = []
    const slugger = new GithubSlugger()
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      // Remove markdown formatting from text
      const text = match[2]
        .trim()
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold **text**
        .replace(/\*(.*?)\*/g, '$1')     // Remove italic *text*
        .replace(/`(.*?)`/g, '$1')       // Remove inline code `text`
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links [text](url)
        .replace(/~~(.*?)~~/g, '$1')     // Remove strikethrough ~~text~~

      // Use github-slugger to generate the same IDs as rehype-slug
      const id = slugger.slug(text)

      items.push({ id, text, level })
    }

    setTocItems(items)

    // Set initial active ID to first item
    if (items.length > 0) {
      setActiveId(items[0].id)
    }
  }, [content])

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])



  // Track active heading and footer visibility
  useEffect(() => {
    if (tocItems.length === 0) return

    let scrollTimeout: NodeJS.Timeout

    // Function to find the active heading based on scroll position
    const updateActiveHeading = () => {
      const headings = tocItems.map(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          return {
            id,
            top: rect.top,
            bottom: rect.bottom
          }
        }
        return null
      }).filter(Boolean) as Array<{ id: string; top: number; bottom: number }>

      // Check if we're near the footer
      const footer = document.querySelector('footer')
      const footerRect = footer?.getBoundingClientRect()
      const isNearFooter = footerRect && footerRect.top < window.innerHeight * 0.8

      setShouldHideToc(!!isNearFooter)

      if (!isNearFooter) {
        // Find the heading that's currently most visible
        let activeHeading = headings[0]

        for (const heading of headings) {
          // If heading is above the viewport center, it's the active one
          if (heading.top <= window.innerHeight * 0.3) {
            activeHeading = heading
          } else {
            break
          }
        }

        if (activeHeading && activeHeading.id !== activeId) {
          setActiveId(activeHeading.id)
        }
      }
    }

    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      scrollTimeout = setTimeout(updateActiveHeading, 100)
    }

    // Initial check
    updateActiveHeading()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [tocItems, activeId])

  // Scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  if (tocItems.length === 0 || shouldHideToc) return null

  const TocContent = () => {
    return (
      <nav
        className="space-y-1"
        onMouseEnter={() => !shouldHideToc && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {tocItems.map(({ id, text, level }, index) => {
          let shouldShow = false

          if (isHovered) {
            // Show all items when hovered
            shouldShow = true
          } else {
            // Show only current section and its subsections when not hovered
            if (activeId) {
              const activeIndex = tocItems.findIndex(item => item.id === activeId)
              if (activeIndex !== -1) {
                const activeItem = tocItems[activeIndex]

                if (id === activeId) {
                  // Always show the active item
                  shouldShow = true
                } else if (index > activeIndex) {
                  // Show subsections (items with higher level numbers after the active item)
                  if (level > activeItem.level) {
                    shouldShow = true
                  } else {
                    // Stop when we reach same or higher level
                    shouldShow = false
                  }
                }
              }
            } else {
              // If no active ID, show the first item by default
              shouldShow = index === 0
            }
          }

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0 }}
              animate={{ opacity: shouldShow ? 1 : 0 }}
              transition={{ duration: 0.15 }}
              style={{
                height: shouldShow ? 'auto' : '0px',
                overflow: 'hidden',
                pointerEvents: shouldShow ? 'auto' : 'none'
              }}
            >
              <button
                onClick={() => scrollToHeading(id)}
                className={`
                  block w-full text-left text-sm transition-colors duration-200 py-2 px-3
                  hover:text-[var(--foreground)]
                  ${activeId === id
                    ? 'text-[var(--foreground)] font-medium'
                    : 'text-[var(--secondary-text)]'
                  }
                `}
                style={{
                  paddingLeft: `${(level - 1) * 12 + 12}px`,
                  fontSize: level === 1 ? '0.875rem' : level === 2 ? '0.8125rem' : '0.75rem'
                }}
              >
                {text}
              </button>
            </motion.div>
          )
        })}
      </nav>
    )
  }

  // Mobile TOC (disabled - return null for mobile)
  if (isMobile) {
    return null
  }

  // Desktop TOC (fixed sidebar)
  return (
    <div className="hidden lg:block fixed left-[calc(50%+32rem)] w-64 z-30 top-1/2 -translate-y-1/2">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: shouldHideToc ? 0 : 1, x: shouldHideToc ? 20 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-y-auto max-h-[60vh]"
        style={{ pointerEvents: shouldHideToc ? 'none' : 'auto' }}
      >
        <TocContent />
      </motion.div>
    </div>
  )
}

export default TableOfContents
