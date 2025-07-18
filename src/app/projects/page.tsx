import React from 'react'
import PageHeader from '@/components/layout/PageHeader'
import ProjectCard from '@/components/sections/ProjectCard'
import { getProjects } from '@/lib/data'
import { unstable_cache } from 'next/cache'

interface Project {
  title: string;
  description: string;
  link: string;
  deploy?: string;
  technologies: string[];
  image: string;
  category: string;
  order?: number;
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
    <section className="pt-24 min-h-screen bg-(--background)">
      <div className="max-w-6xl mx-auto px-6">
        <PageHeader
          title="Projects"
          description="Here are some of my recent projects. Each one represents a unique challenge and learning opportunity."
        />

        <div className="space-y-16">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))
          ) : (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="text-gray-500 text-center">
                <p>No projects available at the moment.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
