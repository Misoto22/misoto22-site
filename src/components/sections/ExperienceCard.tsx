import React from 'react'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'

interface Experience {
  title: string
  company: string
  companyLink?: string
  location: string
  period: string
  description: string[]
  technologies: string[]
  logo: string
  order?: number
}

interface ExperienceCardProps {
  experience: Experience
  index: number
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience: exp }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-(--border-color) bg-white flex-shrink-0">
          <Image
            src={exp.logo}
            alt={`${exp.company} logo`}
            fill
            sizes="48px"
            className="object-contain p-1"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-heading text-xl md:text-2xl text-(--foreground)">{exp.title}</h2>
          <h3 className="text-(--foreground-muted)">
            {exp.companyLink ? (
              <a
                href={exp.companyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-(--accent) transition-colors duration-200"
              >
                {exp.company} ↗
              </a>
            ) : (
              exp.company
            )}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
            <span className="font-mono text-xs text-(--secondary-text)">{exp.period}</span>
            <span className="text-xs text-(--secondary-text)">{exp.location}</span>
          </div>
        </div>
      </div>

      {exp.description.length > 0 && (
        <div className="border-l-2 border-(--accent-muted) pl-4 space-y-2">
          {exp.description.map((desc, i) => (
            <p key={i} className="text-sm text-(--foreground-muted) leading-relaxed">
              {desc}
            </p>
          ))}
        </div>
      )}

      {exp.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech, i) => (
            <Badge key={i}>{tech}</Badge>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceCard
