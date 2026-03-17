'use client'

import Badge from '@/components/ui/Badge'
import { motion } from 'framer-motion'
import { fadeInUp, ANIMATION, viewportConfig, staggerContainer } from '@/lib/animation'

const skills = [
  { category: 'Programming Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'SQL'] },
  { category: 'Web Development', items: ['React', 'Next.js', 'Node.js', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { category: 'DevOps & Cloud', items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Linux'] },
  { category: 'Tools & Others', items: ['Git', 'VS Code', 'PostgreSQL', 'MongoDB', 'Jira', 'Agile'] },
]

const interests = [
  { title: 'Photography', description: 'Capturing landscapes and street scenes, exploring different perspectives through my lens.' },
  { title: 'Hiking', description: 'Exploring nature trails and mountains, finding inspiration in the great outdoors.' },
  { title: 'Technology', description: 'Staying up-to-date with the latest tech trends and experimenting with new tools.' },
]

export default function AboutClient() {
  return (
    <>
      {/* Two-column: Bio + Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 mb-24">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
          className="space-y-6"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-(--foreground)">Background</h2>
          <div className="space-y-4 text-(--secondary-text) leading-relaxed">
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
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: ANIMATION.duration.slow, delay: 0.1, ease: ANIMATION.ease.out }}
          className="space-y-8"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-(--foreground)">Skills & Expertise</h2>
          {skills.map((skill) => (
            <div key={skill.category}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--secondary-text) mb-3">
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Interests */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-24"
      >
        <motion.h2
          variants={fadeInUp}
          transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
          className="font-heading text-2xl md:text-3xl text-(--foreground) mb-10"
        >
          Interests & Hobbies
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {interests.map((interest) => (
            <motion.div
              key={interest.title}
              variants={fadeInUp}
              transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
            >
              <h3 className="font-heading text-xl text-(--foreground) mb-2">{interest.title}</h3>
              <p className="text-(--secondary-text) leading-relaxed">{interest.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
