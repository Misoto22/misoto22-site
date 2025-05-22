import { ReactNode } from 'react'
import FadeInSlideUp from '@/components/animations/FadeInSlideUp'

type WidthSize = 'full' | '1/2' | '1/3' | '2/3' | '3/4' | '1/4' | 'auto'

interface ResponsiveWidth {
  sm?: WidthSize
  md?: WidthSize
  lg?: WidthSize
  xl?: WidthSize
  '2xl'?: WidthSize
}

interface CardProps {
  children: ReactNode
  className?: string
  delay?: number
  width?: WidthSize | ResponsiveWidth
}

export default function Card({ 
  children, 
  className = '', 
  delay = 0, 
  width = 'auto' 
}: CardProps) {
  const getWidthClasses = (width: WidthSize | ResponsiveWidth): string => {
    if (typeof width === 'string') {
      return `w-${width === 'auto' ? 'auto' : width}`
    }

    const classes: string[] = []
    
    if (width.sm) classes.push(`sm:w-${width.sm === 'auto' ? 'auto' : width.sm}`)
    if (width.md) classes.push(`md:w-${width.md === 'auto' ? 'auto' : width.md}`)
    if (width.lg) classes.push(`lg:w-${width.lg === 'auto' ? 'auto' : width.lg}`)
    if (width.xl) classes.push(`xl:w-${width.xl === 'auto' ? 'auto' : width.xl}`)
    if (width['2xl']) classes.push(`2xl:w-${width['2xl'] === 'auto' ? 'auto' : width['2xl']}`)

    return classes.join(' ')
  }

  return (
    <FadeInSlideUp delay={delay}>
      <div className={`
        bg-[var(--card-background)] 
        rounded-2xl 
        p-8 
        shadow-lg 
        border 
        border-[var(--border-color)] 
        hover:shadow-xl 
        transition-all 
        duration-300
        ${getWidthClasses(width)}
        ${className}
      `}>
        {children}
      </div>
    </FadeInSlideUp>
  )
}
