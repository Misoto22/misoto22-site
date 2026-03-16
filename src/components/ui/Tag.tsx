import { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  className?: string
}

export default function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`font-mono text-xs tracking-wide text-(--secondary-text) bg-(--accent-muted) px-2.5 py-1 rounded-sm ${className}`}
    >
      {children}
    </span>
  )
}
