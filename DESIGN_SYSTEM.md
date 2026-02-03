# Luxury UI Design System
*Inspired by high-end brands like Aesop*

*Version:* 1.0  
*Created:* 2026-02-03  
*Status:* Design Phase

---

## 🎨 Design Philosophy

### Core Principles

1. **Minimalism with Purpose**
   - Every element serves a function
   - Generous whitespace creates breathing room
   - Focus on content, not decoration

2. **Subtle Sophistication**
   - Elegant without being flashy
   - High-quality materials (typography, imagery)
   - Refined interactions and animations

3. **Editorial Excellence**
   - Typography-first approach
   - Magazine-quality layout
   - Strong visual hierarchy

4. **Timeless Aesthetic**
   - Neutral, sophisticated palette
   - Classic proportions
   - Avoid trendy gimmicks

---

## 🎨 Color Palette

### Primary Colors

```css
/* Neutrals - Foundation */
--color-ivory: #F4F1EB;           /* Background */
--color-sand: #E8E4DC;            /* Secondary background */
--color-stone: #D4CFC4;           /* Borders, dividers */
--color-charcoal: #2B2B2B;        /* Primary text */
--color-graphite: #1A1A1A;        /* Headers, emphasis */

/* Accents - Warmth */
--color-terracotta: #B87860;      /* Links, CTAs */
--color-amber: #D4A574;           /* Hover states */
--color-bronze: #8B6F47;          /* Secondary accents */

/* Feedback */
--color-sage: #A4B494;            /* Success */
--color-rust: #A85C4A;            /* Error */
--color-slate: #697A85;           /* Info */
```

### Color Usage

*Backgrounds:*
- Primary: Ivory (#F4F1EB)
- Cards: White (#FFFFFF)
- Alternating sections: Sand (#E8E4DC)

*Text:*
- Body: Charcoal (#2B2B2B) at 85% opacity
- Headers: Graphite (#1A1A1A)
- Captions: Charcoal at 60% opacity

*Interactive:*
- Links: Terracotta (#B87860)
- Hover: Amber (#D4A574)
- Active: Bronze (#8B6F47)

---

## 📝 Typography

### Font Families

**Primary: Freight Text Pro** (or similar serif)
- Elegant, readable serif for body text
- Alternatives: Garamond, Georgia, Crimson Pro

**Display: Futura PT** (or similar geometric sans)
- Clean, modern for headlines
- Alternatives: Avenir Next, Inter, DM Sans

**Monospace: IBM Plex Mono**
- For code blocks and technical content

### Type Scale

```css
/* Headers */
--text-6xl: 4.5rem;    /* 72px - Hero titles */
--text-5xl: 3.75rem;   /* 60px - Page titles */
--text-4xl: 3rem;      /* 48px - Section headers */
--text-3xl: 2.25rem;   /* 36px - Sub-headers */
--text-2xl: 1.875rem;  /* 30px - Card titles */
--text-xl: 1.5rem;     /* 24px - Subtitles */

/* Body */
--text-lg: 1.125rem;   /* 18px - Large body */
--text-base: 1rem;     /* 16px - Body text */
--text-sm: 0.875rem;   /* 14px - Captions */
--text-xs: 0.75rem;    /* 12px - Labels */
```

### Typography Rules

*Body Text:*
- Font: Freight Text Pro, 16px (18px on large screens)
- Line height: 1.75 (28px for 16px)
- Letter spacing: 0.01em
- Max width: 680px (65-75 characters)

*Headers:*
- Font: Futura PT
- Weight: 300 (light) or 500 (medium)
- Line height: 1.15
- Letter spacing: -0.02em (tight)
- Margin bottom: 0.5em

*Links:*
- Underline on hover only
- Transition: 0.3s ease
- No visited state color change

---

## 🖼️ Layout & Spacing

### Grid System

*Desktop (1440px+):*
- 12 column grid
- Column width: 80px
- Gutter: 32px
- Outer margins: 80px

*Tablet (768-1439px):*
- 8 column grid
- Column width: flexible
- Gutter: 24px
- Outer margins: 48px

*Mobile (<768px):*
- 4 column grid
- Gutter: 16px
- Outer margins: 24px

### Spacing Scale

```css
/* Consistent 8px base unit */
--space-1: 0.5rem;    /* 8px */
--space-2: 1rem;      /* 16px */
--space-3: 1.5rem;    /* 24px */
--space-4: 2rem;      /* 32px */
--space-6: 3rem;      /* 48px */
--space-8: 4rem;      /* 64px */
--space-12: 6rem;     /* 96px */
--space-16: 8rem;     /* 128px */
--space-24: 12rem;    /* 192px */
```

### Section Padding

*Vertical:*
- Hero: 160px (space-24)
- Sections: 128px (space-16)
- Cards: 48px (space-6)
- Content: 32px (space-4)

*Horizontal:*
- Container max-width: 1280px
- Content max-width: 720px (reading)
- Full-bleed images: edge to edge

---

## 🎭 Components

### Buttons

**Primary Button:**
```css
background: var(--color-terracotta);
color: var(--color-ivory);
padding: 18px 48px;
font-size: 14px;
letter-spacing: 0.1em;
text-transform: uppercase;
border: none;
transition: background 0.4s ease;

&:hover {
  background: var(--color-bronze);
}
```

**Secondary Button:**
```css
background: transparent;
color: var(--color-charcoal);
border: 1px solid var(--color-stone);
padding: 18px 48px;

&:hover {
  border-color: var(--color-terracotta);
  color: var(--color-terracotta);
}
```

**Text Button:**
```css
background: transparent;
color: var(--color-terracotta);
text-decoration: underline;
text-underline-offset: 4px;
text-decoration-thickness: 1px;

&:hover {
  color: var(--color-bronze);
}
```

### Cards

**Project Card:**
```css
background: white;
padding: 48px;
border: 1px solid var(--color-stone);
transition: transform 0.4s ease, box-shadow 0.4s ease;

&:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.08);
}
```

**Image Card:**
```css
aspect-ratio: 4/3;
overflow: hidden;

img {
  object-fit: cover;
  transition: transform 0.6s ease;
}

&:hover img {
  transform: scale(1.05);
}
```

### Navigation

**Header:**
```css
position: fixed;
top: 0;
width: 100%;
background: rgba(244, 241, 235, 0.95);
backdrop-filter: blur(12px);
border-bottom: 1px solid var(--color-stone);
padding: 24px 0;
z-index: 1000;
```

**Nav Links:**
```css
font-size: 14px;
letter-spacing: 0.08em;
text-transform: uppercase;
color: var(--color-charcoal);
transition: color 0.3s ease;

&:hover {
  color: var(--color-terracotta);
}

&.active {
  font-weight: 500;
}
```

---

## ✨ Animation & Interaction

### Transition Timing

```css
/* Standard easing */
--ease-out: cubic-bezier(0.33, 1, 0.68, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

/* Durations */
--duration-fast: 200ms;
--duration-normal: 400ms;
--duration-slow: 600ms;
```

### Hover States

*Images:*
- Scale up 5% (1.05)
- Duration: 600ms
- Easing: ease-out

*Cards:*
- Translate up 8px
- Add shadow
- Duration: 400ms

*Text Links:*
- Color change
- Underline appearance
- Duration: 300ms

### Scroll Animations

*Fade In Up:*
```
Initial: opacity 0, translateY(40px)
Final: opacity 1, translateY(0)
Trigger: When element 30% in viewport
Duration: 700ms
```

*Stagger:*
- Delay between items: 100ms
- Used for lists, grids

---

## 📐 Responsive Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Typography Scaling

```css
/* Mobile (base) */
h1: 2.5rem (40px)
h2: 2rem (32px)
body: 1rem (16px)

/* Desktop (lg+) */
h1: 4.5rem (72px)
h2: 3rem (48px)
body: 1.125rem (18px)
```

---

## 🖼️ Imagery

### Photo Style

*Aesthetic:*
- Natural lighting preferred
- Muted, desaturated tones
- Professional, high-resolution
- Contextual (not stock-looking)

*Aspect Ratios:*
- Hero: 21:9 (ultrawide)
- Portfolio: 4:3 or 3:2
- Photography: Original ratio
- Blog covers: 16:9

*Filters:*
```css
/* Subtle warmth */
filter: brightness(0.98) contrast(1.02) saturate(0.95);
```

### Image Loading

*Blur-up technique:*
1. Show blurred placeholder (20px)
2. Load full image
3. Fade transition (400ms)

---

## 🎬 Page-Specific Guidelines

### Homepage

**Hero Section:**
- Full viewport height
- Centered content
- Large typography (72px+)
- Minimal animation
- Scroll indicator

**About Preview:**
- Two columns (text + image)
- 50/50 split on desktop
- Generous padding
- Pull quote styling

### Blog

**Article Layout:**
- Narrow content column (680px)
- Large feature image
- Author info at bottom
- Related posts grid

**List View:**
- Card-based layout
- Image + title + excerpt
- Date and category badges
- Hover effects

### Portfolio

**Grid:**
- Masonry layout
- Variable heights
- Consistent gaps (32px)
- Filter by category

**Detail Page:**
- Full-width hero
- Project info sidebar
- Image gallery
- Technical details

---

## 🔤 Content Guidelines

### Writing Style

*Tone:*
- Sophisticated but approachable
- Confident, not boastful
- Clear and concise
- Personal yet professional

*Formatting:*
- Short paragraphs (3-4 lines)
- Subheadings every 2-3 paragraphs
- Lists for scannability
- Pull quotes for emphasis

### Labels & Microcopy

*Buttons:*
- "Explore Work" (not "Click Here")
- "View Project" (not "Read More")
- "Get in Touch" (not "Contact")

*Navigation:*
- Short, clear labels
- Consistent capitalization
- Active state indication

---

## ♿ Accessibility

### Requirements

*Color Contrast:*
- Body text: 7:1 minimum (AAA)
- Large text: 4.5:1 minimum (AA)
- Interactive: 3:1 minimum

*Focus States:*
```css
&:focus-visible {
  outline: 2px solid var(--color-terracotta);
  outline-offset: 4px;
}
```

*Keyboard Navigation:*
- All interactive elements accessible
- Logical tab order
- Skip links for navigation

*ARIA:*
- Proper landmarks
- Image alt text
- Form labels

---

## 🎨 Dark Mode (Optional)

### Color Overrides

```css
@media (prefers-color-scheme: dark) {
  --color-ivory: #1A1A1A;
  --color-sand: #2B2B2B;
  --color-stone: #3A3A3A;
  --color-charcoal: #E8E4DC;
  --color-graphite: #F4F1EB;
  
  /* Keep terracotta accent */
  --color-terracotta: #D4A574;
}
```

---

## 📦 Implementation Notes

### CSS Architecture

*Approach:* Utility-first with custom components
- Tailwind CSS as base
- Custom utility classes for brand
- Component-specific styles in modules

### File Structure

```
src/styles/
├── globals.css          # CSS variables, resets
├── typography.css       # Font imports, scales
├── components/          # Component styles
│   ├── button.css
│   ├── card.css
│   └── navigation.css
└── utilities.css        # Custom utilities
```

### Performance

*Image optimization:*
- WebP format with JPEG fallback
- Lazy loading below fold
- Responsive srcset
- Blur placeholder

*Font loading:*
- Subset fonts (Latin only)
- Preload critical fonts
- Font display: swap

---

## 🎯 Success Metrics

*Perception:*
- Looks professional and premium
- Feels elegant, not stuffy
- Clear visual hierarchy
- Smooth, polished interactions

*Performance:*
- Lighthouse score: 95+
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1

*User Experience:*
- Easy to navigate
- Content is readable
- CTAs are clear
- Mobile-friendly

---

*This design system prioritizes timeless elegance over trendy effects. Quality over quantity. Substance over flash.*
