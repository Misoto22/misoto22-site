import React from 'react'
import AnimatedSection from '@/components/common/AnimatedSection'

interface PageHeaderProps {
  title: string;
  description: string;
  showDivider?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  showDivider = false 
}) => {
  return (
    <AnimatedSection>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading mb-4 tracking-wide text-[var(--foreground)]">
          {title}
        </h1>
        {showDivider && (
          <div className="w-24 h-1 bg-[var(--accent)] mx-auto mb-4"></div>
        )}
        <p className="text-[var(--secondary-text)] text-lg max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </AnimatedSection>
  )
}

export default PageHeader
