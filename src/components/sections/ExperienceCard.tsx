import React from 'react'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

interface Experience {
  title: string;
  company: string;
  companyLink?: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  logo: string;
  order?: number;
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience: exp, index }) => {
  return (
    <Card
      key={index}
      delay={index * 0.1}
      width="full"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Company Logo Section */}
        <div className="md:w-1/4 flex justify-center items-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[var(--border-color)] bg-white">
            <Image
              src={exp.logo}
              alt={`${exp.company} logo`}
              fill
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-3/4 space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-heading text-[var(--foreground)]">{exp.title}</h2>
              <h3 className="text-xl text-[var(--secondary-text)]">
                {exp.companyLink ? (
                  <a
                    href={exp.companyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--foreground)] transition-colors duration-200 inline-flex items-center font-normal"
                  >
                    {exp.company}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  exp.company
                )}
              </h3>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[var(--foreground)] font-medium bg-[var(--accent)] px-4 py-1 rounded-full inline-block">
                {exp.period}
              </p>
              <p className="text-[var(--secondary-text)]">{exp.location}</p>
            </div>
          </div>

          <div className="space-y-4">
            <ul className="space-y-2 pl-4">
              {exp.description.map((desc, i) => (
                <li key={i} className="flex items-start gap-2 text-[var(--secondary-text)] leading-relaxed">
                  <span className="mt-1 text-[var(--accent)]">•</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--foreground)] font-medium mb-3">Key Technologies & Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
                <Badge key={i}>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ExperienceCard
