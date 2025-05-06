import { GraduationCap, School, Award } from 'lucide-react'
import Image from 'next/image'

const educationData = [
  {
    title: "Master of IT",
    school: "The University of Western Australia",
    duration: "02/2023 - 12/2024",
    extra: "UWA Global Excellence Scholarship",
    icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
    logo: "/uwa-logo.png",
  },
  {
    title: "Bachelor of Computing",
    major: "Computer Science",
    school: "The University of Sydney",
    duration: "02/2020 - 12/2022",
    extra: "GPA 3.7",
    icon: <School className="w-6 h-6 text-green-600" />,
    logo: "/usyd-logo.png",
  },
  {
    title: "Summer School Program",
    school: "Shanghai Jiao Tong University",
    duration: "06/2022 - 07/2022",
    icon: <Award className="w-6 h-6 text-yellow-600" />,
    logo: "/sjtu-logo.png",
  },
]

export default function Education() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-semibold tracking-wide mb-12 text-center text-gray-800">
          Education
        </h1>
        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="bg-white/90 dark:bg-black/40 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:gap-0 md:justify-between transition-all duration-300"
            >
              {edu.logo && (
                <div className="w-28 h-28 md:w-32 md:h-32 relative flex-shrink-0 mx-auto md:mx-0 md:mr-8 flex items-center justify-center">
                  <Image
                    src={edu.logo}
                    alt={`${edu.school} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex flex-col items-center md:items-start flex-grow w-full md:w-auto md:max-w-xl">
                <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-gray-800 text-center md:text-left leading-tight">
                  {edu.title}
                </h2>
                {edu.major && (
                  <p className="text-sm md:text-base text-[var(--secondary-text)] mt-1 text-center md:text-left font-medium">{edu.major}</p>
                )}
                <div className="flex items-center gap-2 mt-2 text-[var(--secondary-text)] text-center md:text-left">
                  {edu.icon}
                  <span className="font-medium">{edu.school}</span>
                </div>
                {edu.extra && (
                  <div className="text-xs md:text-sm text-[var(--secondary-text)] mt-2 text-center md:text-left">
                    {edu.extra}
                  </div>
                )}
              </div>
              <div className="mt-4 md:mt-0 md:ml-8 flex-shrink-0 w-full md:w-40 text-center md:text-right">
                <span className="text-xs md:text-sm text-[var(--secondary-text)] font-mono tracking-widest whitespace-nowrap block">
                  {edu.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 