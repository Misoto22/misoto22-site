import React from 'react'

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-mono text-xs tracking-wide bg-(--accent-muted) text-(--foreground-muted) px-2.5 py-1 rounded-sm border border-(--border-subtle) hover:border-(--accent) transition-colors duration-200 ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
