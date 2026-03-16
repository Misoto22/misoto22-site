import PageHeader from '@/components/layout/PageHeader'
import ExperienceCard from '@/components/sections/ExperienceCard'
import { Timeline, TimelineItem } from '@/components/sections/Timeline'
import { getExperience } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience and work history.',
}

export const revalidate = 3600

export default async function ExperiencePage() {
  const experiences = await getExperience()

  return (
    <section className="pt-24 pb-24 min-h-screen bg-(--background)">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          title="Experience"
          description="My journey through various roles, each contributing to my growth as a professional."
        />

        {experiences && experiences.length > 0 ? (
          <Timeline>
            {experiences.map((exp, index) => (
              <TimelineItem key={index} index={index}>
                <ExperienceCard experience={exp} index={index} />
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <p className="text-(--secondary-text)">No experience information available.</p>
        )}
      </div>
    </section>
  )
}