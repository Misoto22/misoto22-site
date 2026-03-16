import PageHeader from '@/components/layout/PageHeader'
import EducationCard from '@/components/sections/EducationCard'
import { Timeline, TimelineItem } from '@/components/sections/Timeline'
import { getEducation } from '@/lib/data'

export const revalidate = 3600

export default async function EducationPage() {
  const education = await getEducation()

  return (
    <section className="pt-24 pb-24 min-h-screen bg-(--background)">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          title="Education"
          description="My academic journey and the knowledge I've gained along the way."
        />

        {education && education.length > 0 ? (
          <Timeline>
            {education.map((edu, index) => (
              <TimelineItem key={index} index={index}>
                <EducationCard education={edu} index={index} />
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <p className="text-(--secondary-text)">No education information available.</p>
        )}
      </div>
    </section>
  )
}