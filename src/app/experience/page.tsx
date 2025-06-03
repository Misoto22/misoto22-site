import React from 'react'
import PageHeader from '@/components/layout/PageHeader'
import ExperienceCard from '@/components/sections/ExperienceCard'
import { getExperience } from '@/lib/data'

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

// Enable ISR with revalidation every 3600 seconds (1 hour)
export const revalidate = 3600;

export default async function ExperiencePage() {
  const experiences = await getExperience();

  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <PageHeader
          title="Professional Experience"
          description="My journey through various roles and responsibilities, each contributing to my growth as a professional."
          showDivider={true}
        />

        <div className="space-y-12">
          {experiences && experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} index={index} />
            ))
          ) : (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="text-gray-500 text-center">
                <p>No experience information available at the moment.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}