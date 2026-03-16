import React from 'react'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'

interface Education {
  degree: string
  school: string
  schoolLink?: string
  location: string
  period: string
  description: string[]
  courses: string[]
  logo: string
  order?: number
}

interface EducationCardProps {
  education: Education
  index: number
}

const EducationCard: React.FC<EducationCardProps> = ({ education: edu }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-(--border-color) bg-white flex-shrink-0">
          <Image
            src={edu.logo}
            alt={`${edu.school} logo`}
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-heading text-xl md:text-2xl text-(--foreground)">{edu.degree}</h2>
          <h3 className="text-(--foreground-muted)">
            {edu.schoolLink ? (
              <a
                href={edu.schoolLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-(--accent) transition-colors duration-200"
              >
                {edu.school} &nearr;
              </a>
            ) : (
              edu.school
            )}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
            <span className="font-mono text-xs text-(--secondary-text)">{edu.period}</span>
            <span className="text-xs text-(--secondary-text)">{edu.location}</span>
          </div>
        </div>
      </div>

      {edu.description.length > 0 && (
        <div className="space-y-2">
          {edu.description.map((desc, i) => (
            <p key={i} className="text-sm text-(--foreground-muted) leading-relaxed">
              {desc}
            </p>
          ))}
        </div>
      )}

      {edu.courses.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {edu.courses.map((course, i) => (
            <Badge key={i}>{course}</Badge>
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationCard
