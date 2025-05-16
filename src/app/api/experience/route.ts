import { NextResponse } from 'next/server';

const experiences = [
  {
    title: "IT and Data Intern",
    company: "Path of Hope Foundation",
    companyLink: "https://www.linkedin.com/company/rotary-path-of-hope/",
    location: "Perth, WA",
    period: "Jul 2024 - Oct 2024",
    description: [
      "Conducted data extraction, transformation, and loading (ETL) processes, along with data cleaning and visualization, contributing to the foundation's \"HOPE Report: 100 Years and One Hundred Reports\" initiative aimed at preventing family domestic violence.",
      "Migrated the foundation's official website to a more secure and scalable platform, enhancing user experience and overall site performance.",
      "Collaborated with leadership and cross-functional teams to develop IT and data management improvement strategies, ensuring alignment with organizational goals and best practices."
    ],
    technologies: ["ETL", "Data Visualization", "Web Development", "IT Strategy", "Data Management"],
    logo: "/icons/company/path-of-hope.svg"
  },
  {
    title: "Senior Math Tutor",
    company: "HD Education",
    companyLink: "https://www.linkedin.com/company/hdeducation/",
    location: "Sydney, NSW",
    period: "Jul 2019 - Jan 2023",
    description: [
      "Devised and implemented targeted curricula with innovative teaching techniques.",
      "Fostered a supportive learning environment through strong communication with students.",
      "Tailored lesson plans based on individual student progress for improved understanding and retention."
    ],
    technologies: ["Curriculum Development", "Student Assessment", "Educational Technology", "Communication", "Problem Solving"],
    logo: "/icons/company/hd-education.svg"
  }
];

export async function GET() {
  return NextResponse.json(experiences);
} 