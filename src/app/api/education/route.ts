import { NextResponse } from 'next/server';

const education = [
  {
    degree: "Master of Information Technology",
    school: "The University of Western Australia",
    schoolLink: "https://www.uwa.edu.au/",
    location: "Perth, WA",
    period: "2023 - 2024",
    description: [
      "Dedicated to Software Engineering"
    ],
    courses: [
      "IoT", "High Performance Computing", "Geographic Info Systems", "Artificial Intelligence",
      "Cloud Computing", "Cybersecurity", "Data Analysis"
    ],
    logo: "/icons/uni/uwa.svg"
  },
  {
    degree: "Bachelor of Computing",
    school: "The University of Sydney",
    schoolLink: "https://www.sydney.edu.au/",
    location: "Sydney, NSW",
    period: "2020 - 2022",
    description: [
      "Major in Computer Science"
    ],
    courses: [
      "Data Structures & Algorithms", "Systems Programming", "Models of Computation",
      "OS and Network", "Algorithm Design", "Agile Software Development", "Database Management"
    ],
    logo: "/icons/uni/usyd.svg"
  }
];

export async function GET() {
  return NextResponse.json(education);
} 