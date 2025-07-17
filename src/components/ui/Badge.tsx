import React from 'react'

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`bg-(--card-background) text-(--foreground) px-3 py-1 rounded-full text-sm font-medium border border-(--border-color) hover:bg-(--background) transition-colors duration-200 ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
