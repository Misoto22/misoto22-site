'use client'

import React, { useState, useEffect } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import ExperienceCard from '@/components/sections/ExperienceCard'

interface Experience {
  title: string;
  company: string;
  companyLink?: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  logo: string;
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experience');
        if (!response.ok) {
          throw new Error('Failed to fetch experience data');
        }
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experience data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

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
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
} 