'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'

const allSkills = [
  { name: 'React', iconPath: '/icons/skills/react.svg' },
  { name: 'Next.js', iconPath: '/icons/skills/nextjs.svg' },
  { name: 'TypeScript', iconPath: '/icons/skills/typescript.svg' },
  { name: 'Node.js', iconPath: '/icons/skills/nodejs.svg' },
  { name: 'Docker', iconPath: '/icons/skills/docker.svg' },
  { name: 'AWS', iconPath: '/icons/skills/aws.svg' },
  { name: 'Python', iconPath: '/icons/skills/python.svg' },
  { name: 'PostgreSQL', iconPath: '/icons/skills/postgresql.svg' },
  { name: 'Figma', iconPath: '/icons/skills/figma.svg' },
  { name: 'Vercel', iconPath: '/icons/skills/vercel.svg' },
  { name: 'GitHub Actions', iconPath: '/icons/skills/githubactions.svg' },
  { name: 'Lightroom', iconPath: '/icons/skills/lightroom.svg' },
]

export default function SkillsSection() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
    >
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6">
        {allSkills.map((skill) => (
          <div key={skill.name} className="flex flex-col items-center gap-2 group">
            <Image
              src={skill.iconPath}
              alt={skill.name}
              width={36}
              height={36}
              className="opacity-70 group-hover:opacity-100 transition-opacity duration-200"
            />
            <span className="text-xs text-(--secondary-text) group-hover:text-(--foreground-muted) transition-colors duration-200">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
