# Implementation Plan
*Luxury UI Redesign*

*Created:* 2026-02-03  
*Status:* Planning Phase

---

## 🎯 Overview

This document outlines the technical approach for implementing the luxury UI redesign inspired by high-end brands like Aesop.

*Goal:* Transform the current portfolio site into a sophisticated, editorial-style experience with timeless elegance.

---

## 📋 Phase Breakdown

### Phase 1: Foundation (Week 1-2)
*Setup design tokens and base styles*

**Tasks:**
1. Create CSS variables for design system
2. Import and configure premium fonts
3. Update Tailwind config with custom theme
4. Build base component library
5. Implement new color palette

**Deliverables:**
- `globals.css` with design tokens
- `tailwind.config.ts` with custom theme
- Font files and configurations
- Base component storybook (optional)

**Effort:** ~16-20 hours

---

### Phase 2: Layout & Navigation (Week 2-3)
*Rebuild core structure*

**Tasks:**
1. Redesign header/navigation
2. Create new footer
3. Update page layouts
4. Implement grid system
5. Add responsive breakpoints

**Components:**
- `Navigation.tsx` (desktop + mobile)
- `Footer.tsx`
- `Container.tsx` (layout wrapper)
- `Section.tsx` (page sections)

**Effort:** ~12-16 hours

---

### Phase 3: Homepage (Week 3-4)
*Redesign landing experience*

**Tasks:**
1. Hero section with typography
2. About preview (two-column)
3. Featured projects grid
4. Photography preview
5. Scroll animations

**Components:**
- `Hero.tsx`
- `AboutPreview.tsx`
- `FeaturedProjects.tsx`
- `PhotoGrid.tsx`
- `ScrollReveal.tsx` (animation wrapper)

**Effort:** ~16-20 hours

---

### Phase 4: Projects Page (Week 4-5)
*Portfolio showcase*

**Tasks:**
1. Project grid layout
2. Filter component
3. Project cards with hover effects
4. Project detail page template
5. Image galleries

**Components:**
- `ProjectGrid.tsx`
- `ProjectFilter.tsx`
- `ProjectCard.tsx`
- `ProjectDetail.tsx`
- `ImageGallery.tsx`

**Effort:** ~12-16 hours

---

### Phase 5: Blog (Week 5-6)
*Content-focused redesign*

**Tasks:**
1. Blog list layout
2. Article template
3. Table of contents
4. Related posts
5. Typography enhancements

**Components:**
- `BlogList.tsx`
- `BlogPost.tsx`
- `TableOfContents.tsx`
- `RelatedPosts.tsx`
- `MarkdownStyles.tsx`

**Effort:** ~12-16 hours

---

### Phase 6: Photography (Week 6-7)
*Gallery experience*

**Tasks:**
1. Masonry grid layout
2. Lightbox component
3. EXIF data display
4. Fullscreen mode
5. Keyboard navigation

**Components:**
- `MasonryGrid.tsx`
- `Lightbox.tsx`
- `PhotoCard.tsx`
- `ExifData.tsx`

**Effort:** ~12-16 hours

---

### Phase 7: Polish & Optimization (Week 7-8)
*Refinement and performance*

**Tasks:**
1. Animation tuning
2. Performance optimization
3. Accessibility audit
4. Browser testing
5. Mobile optimization

**Activities:**
- Lighthouse audits
- A11y testing
- Cross-browser testing
- Performance profiling
- Code review

**Effort:** ~16-20 hours

---

## 🛠️ Technical Stack

### Core Technologies
- Next.js 16 (already in place)
- React 19
- TypeScript
- Tailwind CSS 4

### Additional Libraries

**Animation:**
```json
"framer-motion": "^12.30.0"  // Already installed
```

**Typography:**
```bash
# Install premium fonts via next/font
# Or use Google Fonts alternatives
```

**Image Handling:**
```json
"yet-another-react-lightbox": "^3.0.0",
"react-masonry-css": "^1.0.16"  // Already installed
```

**Utilities:**
```json
"clsx": "^2.0.0",
"tailwind-merge": "^2.0.0"
```

---

## 📁 File Structure Changes

### New Directories

```
src/
├── components/
│   ├── ui/              # Design system components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   └── Section.tsx
│   ├── home/            # Homepage-specific
│   │   ├── Hero.tsx
│   │   ├── AboutPreview.tsx
│   │   └── FeaturedProjects.tsx
│   ├── projects/        # Projects page
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   └── ProjectFilter.tsx
│   ├── blog/            # Blog components (update existing)
│   │   ├── BlogList.tsx
│   │   ├── BlogPost.tsx
│   │   └── RelatedPosts.tsx
│   └── photography/     # Gallery components (update existing)
│       ├── MasonryGrid.tsx
│       ├── Lightbox.tsx
│       └── PhotoCard.tsx
├── styles/
│   ├── globals.css      # Design tokens, resets
│   ├── typography.css   # Font imports
│   └── animations.css   # Animation utilities
├── lib/
│   ├── fonts.ts         # Font configurations
│   └── utils.ts         # Utility functions (clsx, etc.)
└── config/
    └── site.ts          # Site-wide constants
```

---

## 🎨 CSS Variables Implementation

### globals.css

```css
:root {
  /* Colors */
  --color-ivory: #F4F1EB;
  --color-sand: #E8E4DC;
  --color-stone: #D4CFC4;
  --color-charcoal: #2B2B2B;
  --color-graphite: #1A1A1A;
  --color-terracotta: #B87860;
  --color-amber: #D4A574;
  --color-bronze: #8B6F47;

  /* Typography */
  --font-display: 'Futura PT', 'Avenir Next', system-ui;
  --font-body: 'Freight Text', 'Georgia', serif;
  --font-mono: 'IBM Plex Mono', 'Courier New', monospace;

  /* Spacing */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-6: 3rem;
  --space-8: 4rem;
  --space-12: 6rem;
  --space-16: 8rem;
  --space-24: 12rem;

  /* Transitions */
  --ease-out: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 600ms;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 24px 48px rgba(0, 0, 0, 0.12);
}
```

---

## 🎯 Tailwind Configuration

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: 'var(--color-ivory)',
        sand: 'var(--color-sand)',
        stone: 'var(--color-stone)',
        charcoal: 'var(--color-charcoal)',
        graphite: 'var(--color-graphite)',
        terracotta: 'var(--color-terracotta)',
        amber: 'var(--color-amber)',
        bronze: 'var(--color-bronze)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        'content': '680px',
        'container': '1280px',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s var(--ease-out)',
        'slide-up': 'slideUp 0.7s var(--ease-out)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 🔤 Font Setup

### lib/fonts.ts

```typescript
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'

// Display font (Futura PT alternative: Inter with display settings)
export const displayFont = Inter({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500'],
  display: 'swap',
})

// Body font (Freight Text alternative: Georgia system font)
// For premium: purchase Freight Text license or use Crimson Pro
export const bodyFont = localFont({
  src: [
    {
      path: '../fonts/FreightText-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/FreightText-BookItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/FreightText-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-body',
  display: 'swap',
})

// Monospace (IBM Plex Mono from Google Fonts)
import { IBM_Plex_Mono } from 'next/font/google'

export const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})
```

### Alternative (All Google Fonts)

```typescript
import { Crimson_Pro, DM_Sans, IBM_Plex_Mono } from 'next/font/google'

export const displayFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500'],
})

export const bodyFont = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500'],
})

export const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})
```

---

## 🧩 Reusable Components

### Button Component

```typescript
// src/components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-all',
  {
    variants: {
      variant: {
        primary: 'bg-terracotta text-ivory hover:bg-bronze',
        secondary: 'border border-stone text-charcoal hover:border-terracotta hover:text-terracotta',
        text: 'text-terracotta underline underline-offset-4 hover:text-bronze',
      },
      size: {
        default: 'px-12 py-4.5 text-sm uppercase tracking-widest',
        large: 'px-16 py-6 text-base uppercase tracking-widest',
        small: 'px-8 py-3 text-xs uppercase tracking-wider',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
```

### Card Component

```typescript
// src/components/ui/Card.tsx
import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border border-stone p-12',
          hover && 'transition-all duration-400 hover:-translate-y-2 hover:shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
```

---

## 🎬 Animation Utilities

### ScrollReveal Component

```typescript
// src/components/animations/ScrollReveal.tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ 
  children, 
  className,
  delay = 0 
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ 
        duration: 0.7, 
        delay, 
        ease: [0.33, 1, 0.68, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

---

## 📸 Image Optimization

### Blur Placeholder

```typescript
// Generate blur data URL for images
export function getBlurDataURL(width: number, height: number): string {
  const svgWidth = width
  const svgHeight = height
  
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${svgWidth}" height="${svgHeight}" fill="#F4F1EB"/>
    </svg>`
  ).toString('base64')}`
}
```

### Image Component Wrapper

```typescript
// src/components/ui/OptimizedImage.tsx
import Image from 'next/image'
import { useState } from 'react'

export function OptimizedImage({ 
  src, 
  alt, 
  ...props 
}: React.ComponentProps<typeof Image>) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Image
      src={src}
      alt={alt}
      className={`
        transition-all duration-400
        ${isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'}
      `}
      onLoadingComplete={() => setIsLoading(false)}
      {...props}
    />
  )
}
```

---

## ✅ Testing Strategy

### Unit Tests
- Component rendering
- User interactions
- Accessibility

### Visual Regression
- Percy or Chromatic
- Screenshot comparisons
- Responsive layouts

### Performance
- Lighthouse CI
- Core Web Vitals
- Bundle size

### Accessibility
- axe-core
- WAVE
- Keyboard navigation
- Screen reader testing

---

## 📊 Success Metrics

### Performance
- Lighthouse score: 95+
- FCP: <1.5s
- LCP: <2.5s
- CLS: <0.1
- TTI: <3.5s

### User Experience
- Bounce rate: <40%
- Avg time on page: >2 minutes
- Page views per session: >3

### Technical
- Zero accessibility violations (critical)
- Browser support: Last 2 versions
- Mobile responsive: 100%

---

## 🚀 Deployment Strategy

### Development
1. Work in `design/luxury-ui-redesign` branch
2. Regular commits per phase
3. Preview deployments on Vercel

### Staging
1. Merge to `staging` branch (create if needed)
2. Full QA testing
3. Client/stakeholder review

### Production
1. Create PR to `main`
2. Final review and approval
3. Deploy to production
4. Monitor analytics and errors

---

## 📝 Migration Notes

### Backward Compatibility

*Keep old components temporarily:*
- Copy current components to `components/legacy/`
- Allows gradual migration
- Rollback safety net

### Feature Flags

```typescript
// lib/features.ts
export const FEATURES = {
  newUI: process.env.NEXT_PUBLIC_ENABLE_NEW_UI === 'true',
}

// Use in components
if (FEATURES.newUI) {
  return <NewDesign />
} else {
  return <LegacyDesign />
}
```

### Data Migration

*No database changes required:*
- Supabase schema stays the same
- Only frontend changes
- API routes unchanged

---

## 🎓 Resources

### Design References
- Aesop: https://www.aesop.com
- Kinfolk: https://kinfolk.com
- The Row: https://www.therow.com
- COS: https://www.cosstores.com

### Technical
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
- Next.js: https://nextjs.org

### Typography
- Freight Text: https://fonts.adobe.com/fonts/freight-text
- Futura PT: https://fonts.adobe.com/fonts/futura-pt
- Google Fonts alternatives: Crimson Pro, DM Sans

---

*This plan provides a comprehensive roadmap. Adjust timelines and priorities based on resources and feedback.*
