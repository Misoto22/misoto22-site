import React from 'react'
import PageHeader from '@/components/layout/PageHeader'
import EducationCard from '@/components/sections/EducationCard'
import { getEducation } from '@/lib/data'

interface Education {
  degree: string;
  school: string;
  schoolLink?: string;
  location: string;
  period: string;
  description: string[];
  courses: string[];
  logo: string;
  order?: number;
}

// Enable ISR with revalidation every 3600 seconds (1 hour)
export const revalidate = 3600;

export default async function EducationPage() {
  const education = await getEducation();

  return (
    <section className="pt-24 min-h-screen bg-(--background)">
      <div className="max-w-6xl mx-auto px-6">
        <PageHeader
          title="Education"
          description="My academic journey and the knowledge I've gained along the way."
          showDivider={true}
        />

        <div className="space-y-12">
          {education && education.length > 0 ? (
            education.map((edu, index) => (
              <EducationCard key={index} education={edu} index={index} />
            ))
          ) : (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="text-gray-500 text-center">
                <p>No education information available at the moment.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}