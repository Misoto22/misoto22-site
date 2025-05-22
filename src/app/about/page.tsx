'use client'

import React from 'react'
import Image from 'next/image'
import FadeInSlideUp from '@/components/animations/FadeInSlideUp'

interface Skill {
  category: string;
  items: string[];
}

const skills: Skill[] = [
  {
    category: "Programming Languages",
    items: ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL"]
  },
  {
    category: "Web Development",
    items: ["React", "Next.js", "Node.js", "HTML5", "CSS3", "Tailwind CSS"]
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Linux"]
  },
  {
    category: "Tools & Others",
    items: ["Git", "VS Code", "PostgreSQL", "MongoDB", "Jira", "Agile"]
  }
];

export default function AboutPage() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInSlideUp>
          <h1 className="text-4xl md:text-5xl font-heading mb-4 tracking-wide text-[var(--foreground)] text-center">
            About Me
          </h1>
          <p className="text-[var(--secondary-text)] mb-12 text-center text-lg max-w-2xl mx-auto">
            A passionate developer with a strong foundation in both software development and DevOps practices.
          </p>
        </FadeInSlideUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FadeInSlideUp>
            <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-heading text-[var(--foreground)] mb-4">Background</h2>
              <div className="space-y-4 text-[var(--secondary-text)]">
                <p>
                  I&apos;m a recent graduate with a Master&apos;s degree in Information Technology from The University of Western Australia,
                  specializing in Software Engineering and Data Science. My journey in technology began with a strong foundation
                  in mathematics, which has helped me develop analytical thinking and problem-solving skills.
                </p>
                <p>
                  Currently, I&apos;m seeking opportunities in DevOps and Full-stack web development roles, where I can apply my
                  technical skills and continue to grow as a developer. I&apos;m particularly interested in cloud technologies
                  and building scalable applications.
                </p>
                <p>
                  When I&apos;m not coding, you can find me exploring photography, hiking, or experimenting with new technologies
                  in my personal projects.
                </p>
              </div>
            </div>
          </FadeInSlideUp>

          <FadeInSlideUp>
            <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-heading text-[var(--foreground)] mb-4">Skills & Expertise</h2>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium text-[var(--foreground)] mb-3">{skill.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, i) => (
                        <span
                          key={i}
                          className="bg-[var(--card-background)] text-[var(--foreground)] px-3 py-1 rounded-full text-sm font-medium border border-[var(--border-color)] hover:bg-[var(--background)] transition-colors duration-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSlideUp>
        </div>

        <FadeInSlideUp>
          <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--border-color)]">
            <h2 className="text-2xl font-heading text-[var(--foreground)] mb-4">Interests & Hobbies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-[var(--foreground)]">Photography</h3>
                <p className="text-[var(--secondary-text)]">
                  Capturing landscapes and street scenes, exploring different perspectives through my lens.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-[var(--foreground)]">Hiking</h3>
                <p className="text-[var(--secondary-text)]">
                  Exploring nature trails and mountains, finding inspiration in the great outdoors.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-[var(--foreground)]">Technology</h3>
                <p className="text-[var(--secondary-text)]">
                  Staying up-to-date with the latest tech trends and experimenting with new tools.
                </p>
              </div>
            </div>
          </div>
        </FadeInSlideUp>
      </div>
    </section>
  )
}