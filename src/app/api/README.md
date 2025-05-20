# API Documentation

This document describes all API endpoints under `src/app/api`.

---

## 1. GET `/api/photos`

**Description:**
Returns a paginated list of photos for the photography gallery.

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Number of photos per page (default: 8)

**Response:**
```json
{
  "photos": [
    {
      "id": "00001",
      "src": "https://images.misoto22.com/00001.webp",
      "width": 4000,
      "height": 6000,
      "alt": "00001"
    },
    // ... more photos
  ],
  "total": 25,
  "hasMore": true
}
```

**Fields:**
- `photos[]`: Array of photo objects
  - `id` (string): Unique photo ID
  - `src` (string): Image URL
  - `width` (number): Image width in pixels
  - `height` (number): Image height in pixels
  - `alt` (string): Alt text for the image
- `total` (number): Total number of photos
- `hasMore` (boolean): Whether there are more photos to load

---

## 2. GET `/api/projects`

**Description:**
Returns a list of projects.

**Response:**
```json
[
  {
    "title": "Personal Website",
    "description": "A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS. Features dark mode, smooth animations, and a photography gallery.",
    "link": "https://github.com/Misoto22/my-website",
    "deploy": "https://www.misoto22.com/",
    "technologies": ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    "image": "/images/projects/personal-website.jpeg",
    "category": "Full-stack"
  }
  // ... more projects
]
```

**Fields:**
- `title` (string): Project name
- `description` (string): Project description
- `link` (string): GitHub or source link
- `deploy` (string, optional): Live demo link
- `technologies` (string[]): Technologies used
- `image` (string): Image path or URL
- `category` (string): Project category

---

## 3. GET `/api/education`

**Description:**
Returns a list of educational experiences.

**Response:**
```json
[
  {
    "degree": "Master of Information Technology",
    "school": "The University of Western Australia",
    "schoolLink": "https://www.uwa.edu.au/",
    "location": "Perth, WA",
    "period": "2023 - 2024",
    "description": ["Dedicated to Software Engineering"],
    "courses": ["IoT", "High Performance Computing", "Geographic Info Systems", "Artificial Intelligence", "Cloud Computing", "Cybersecurity", "Data Analysis"],
    "logo": "/icons/uni/uwa.svg"
  }
  // ... more education
]
```

**Fields:**
- `degree` (string): Degree name
- `school` (string): School name
- `schoolLink` (string): School website
- `location` (string): Location
- `period` (string): Study period
- `description` (string[]): Description or highlights
- `courses` (string[]): Main courses
- `logo` (string): Logo path or URL

---

## 4. GET `/api/experience`

**Description:**
Returns a list of work experiences.

**Response:**
```json
[
  {
    "title": "IT and Data Intern",
    "company": "Path of Hope Foundation",
    "companyLink": "https://www.linkedin.com/company/rotary-path-of-hope/",
    "location": "Perth, WA",
    "period": "Jul 2024 - Oct 2024",
    "description": [
      "Conducted data extraction, transformation, and loading (ETL) processes, along with data cleaning and visualization, contributing to the foundation's 'HOPE Report: 100 Years and One Hundred Reports' initiative aimed at preventing family domestic violence.",
      "Migrated the foundation's official website to a more secure and scalable platform, enhancing user experience and overall site performance.",
      "Collaborated with leadership and cross-functional teams to develop IT and data management improvement strategies, ensuring alignment with organizational goals and best practices."
    ],
    "technologies": ["ETL", "Data Visualization", "Web Development", "IT Strategy", "Data Management"],
    "logo": "/icons/company/path-of-hope.svg"
  }
  // ... more experiences
]
```

**Fields:**
- `title` (string): Job title
- `company` (string): Company name
- `companyLink` (string): Company website or LinkedIn
- `location` (string): Location
- `period` (string): Work period
- `description` (string[]): Description or highlights
- `technologies` (string[]): Technologies or skills used
- `logo` (string): Logo path or URL
