import React from 'react'
import PageHeader from '@/components/layout/PageHeader'
import ProjectCard from '@/components/sections/ProjectCard'
import { getProjects } from '@/lib/data'
import { unstable_cache } from 'next/cache'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A selection of recent work, each representing a unique challenge.',
}

// Enable ISR with revalidation every 3600 seconds (1 hour)
export const revalidate = 3600;

// Force static generation
export const dynamic = 'force-static';

// Create a cached version of getProjects
const getCachedProjects = unstable_cache(
  getProjects,
  ['projects'],
  {
    revalidate: 3600,
    tags: ['projects']
  }
)

export default async function Projects() {
  const projects = await getCachedProjects();

  return (
    <section className="pt-24 pb-24 min-h-screen bg-(--background)">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          title="Projects"
          description="A selection of recent work, each representing a unique challenge."
        />

        <div className="space-y-20">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))
          ) : (
            <p className="text-(--secondary-text)">No projects available at the moment.</p>
          )}
        </div>
      </div>
    </section>
  )
}
