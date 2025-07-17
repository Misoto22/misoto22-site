import Image from 'next/image'
import { motion } from 'framer-motion'
import FadeInSlideUp from '@/components/animations/FadeInSlideUp'
import Card from '@/components/ui/Card'

// Skill Component
interface SkillProps {
  name: string
  iconPath: string
}

function Skill({ name, iconPath }: SkillProps) {
  return (
    <motion.div 
      className="flex flex-col items-center group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Image 
        src={iconPath} 
        alt={name} 
        width={48} 
        height={48} 
        className="mb-2 group-hover:brightness-110 transition-all duration-300" 
      />
      <span className="mt-2 text-sm font-medium text-(--foreground) group-hover:text-(--foreground) transition-colors duration-300">
        {name}
      </span>
    </motion.div>
  )
}

// SkillCategory Component
interface SkillItem {
  name: string
  iconPath: string
}

interface SkillCategoryProps {
  title: string
  subtitle: string
  skills: SkillItem[]
  delay?: number
  className?: string
}

function SkillCategory({ 
  title, 
  subtitle, 
  skills, 
  delay = 0,
  className = ''
}: SkillCategoryProps) {
  return (
    <div className="mb-12">
      <Card delay={delay} className={className}>
        <h3 className="text-2xl font-heading mb-6 text-(--foreground) flex items-center gap-2">
          <span>{title}</span>
          <span className="text-sm font-normal text-(--secondary-text)">({subtitle})</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <Skill
              key={index}
              name={skill.name}
              iconPath={skill.iconPath}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}

// Main SkillsSection Component
const skillsData = {
  fullstack: {
    title: 'Fullstack Development',
    subtitle: 'Core',
    skills: [
      { name: 'React', iconPath: '/icons/skills/react.svg' },
      { name: 'Next.js', iconPath: '/icons/skills/nextjs.svg' },
      { name: 'TypeScript', iconPath: '/icons/skills/typescript.svg' },
      { name: 'Node.js', iconPath: '/icons/skills/nodejs.svg' },
    ]
  },
  devops: {
    title: 'DevOps & Cloud',
    subtitle: 'Infrastructure',
    skills: [
      { name: 'Docker', iconPath: '/icons/skills/docker.svg' },
      { name: 'AWS', iconPath: '/icons/skills/aws.svg' },
      { name: 'GitHub Actions', iconPath: '/icons/skills/githubactions.svg' },
      { name: 'Vercel', iconPath: '/icons/skills/vercel.svg' },
    ]
  },
  data: {
    title: 'Data & ML',
    subtitle: 'Research',
    skills: [
      { name: 'Python', iconPath: '/icons/skills/python.svg' },
      { name: 'Pandas', iconPath: '/icons/skills/pandas.svg' },
      { name: 'PostgreSQL', iconPath: '/icons/skills/postgresql.svg' },
      { name: 'Jupyter', iconPath: '/icons/skills/jupyter.svg' },
    ]
  },
  creative: {
    title: 'Creative Tools',
    subtitle: 'Hobby',
    skills: [
      { name: 'Lightroom', iconPath: '/icons/skills/lightroom.svg' },
      { name: 'Photoshop', iconPath: '/icons/skills/photoshop.svg' },
      { name: 'Figma', iconPath: '/icons/skills/figma.svg' },
      { name: 'Capture One', iconPath: '/icons/skills/captureone.svg' },
    ]
  }
}

export default function SkillsSection() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="min-h-screen flex flex-col justify-center items-center bg-(--background) px-4 relative"
    >
      <div className="w-full max-w-6xl mx-auto px-6 scroll-mt-24">
        <FadeInSlideUp delay={0.1} className="w-full">
          <h2 className="text-3xl md:text-4xl font-heading mb-12 text-(--foreground) text-center">
            My Skills
          </h2>
          
          <SkillCategory
            title={skillsData.fullstack.title}
            subtitle={skillsData.fullstack.subtitle}
            skills={skillsData.fullstack.skills}
            delay={0.1}
          />

          <SkillCategory
            title={skillsData.devops.title}
            subtitle={skillsData.devops.subtitle}
            skills={skillsData.devops.skills}
            delay={0.2}
          />

          <SkillCategory
            title={skillsData.data.title}
            subtitle={skillsData.data.subtitle}
            skills={skillsData.data.skills}
            delay={0.3}
          />

          <SkillCategory
            title={skillsData.creative.title}
            subtitle={skillsData.creative.subtitle}
            skills={skillsData.creative.skills}
            delay={0.4}
            className="opacity-80"
          />
        </FadeInSlideUp>
      </div>
    </motion.section>
  )
}
