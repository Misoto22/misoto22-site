'use client'

import React from 'react'
import PageHeader from '@/components/layout/PageHeader'
import ExperienceCard from '@/components/sections/ExperienceCard'
import { useExperience } from '@/hooks/useApiData'

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

export default function ExperiencePage() {
  const { data: experiences, loading, error } = useExperience();

  if (loading) {
    return (
      <section className="pt-24 min-h-screen bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6">
          <PageHeader
            title="Professional Experience"
            description="My journey through various roles and responsibilities, each contributing to my growth as a professional."
            showDivider={true}
          />
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <PageHeader
          title="Professional Experience"
          description="My journey through various roles and responsibilities, each contributing to my growth as a professional."
          showDivider={true}
        />

        <div className="space-y-12">
          {experiences && experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>

        {error && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-red-500 text-center">
              <p>Error loading experience: {error}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}