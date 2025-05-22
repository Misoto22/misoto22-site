# API Documentation

This document describes all API endpoints under `src/app/api`. All data is stored in and retrieved from Firebase Firestore.

---

## 1. Photos API

### GET `/api/photos`

**Description:**
Returns a paginated list of photos from Firestore.

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Number of photos per page (default: 8)

**Success Response:**
```json
{
  "photos": [
    {
      "id": "00001",
      "src": "https://images.misoto22.com/00001.webp",
      "width": 4000,
      "height": 6000,
      "alt": "00001"
    }
  ],
  "total": 25,
  "hasMore": true
}
```

**Error Response:**
```json
{
  "error": "Failed to fetch photos"
}
```

**Status Codes:**
- 200: Success
- 500: Server Error

### GET `/api/photos/:id`

**Description:**
Returns a single photo by ID.

**Parameters:**
- `id` (string): 5-digit photo ID

**Success Response:**
```json
{
  "id": "00001",
  "src": "https://images.misoto22.com/00001.webp",
  "width": 4000,
  "height": 6000,
  "alt": "00001"
}
```

**Error Response:**
```json
{
  "error": "Invalid photo ID format"
}
// or
{
  "error": "Photo not found"
}
```

**Status Codes:**
- 200: Success
- 400: Invalid ID Format
- 404: Photo Not Found
- 500: Server Error

---

## 2. GET `/api/projects`

**Description:**
Returns a list of projects from Firestore, ordered by the `order` field in ascending order.

**Success Response:**
```json
[
  {
    "title": "Personal Website",
    "description": "A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS.",
    "link": "https://github.com/Misoto22/my-website",
    "deploy": "https://www.misoto22.com/",
    "technologies": ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    "image": "/images/projects/personal-website.webp",
    "category": "Full-stack",
    "order": 1
  }
]
```

**Error Response:**
```json
{
  "error": "Failed to fetch projects"
}
```

**Status Codes:**
- 200: Success
- 500: Server Error

---

## 3. GET `/api/education`

**Description:**
Returns a list of educational experiences from Firestore, ordered by the `order` field in ascending order.

**Success Response:**
```json
[
  {
    "degree": "Master of Information Technology",
    "school": "The University of Western Australia",
    "schoolLink": "https://www.uwa.edu.au/",
    "location": "Perth, WA",
    "period": "2023 - 2024",
    "description": ["Dedicated to Software Engineering"],
    "courses": ["IoT", "High Performance Computing", "Geographic Info Systems"],
    "logo": "/icons/uni/uwa.svg",
    "order": 1
  }
]
```

**Error Response:**
```json
{
  "error": "Failed to fetch education"
}
```

**Status Codes:**
- 200: Success
- 500: Server Error

---

## 4. GET `/api/experience`

**Description:**
Returns a list of work experiences from Firestore, ordered by the `order` field in ascending order.

**Success Response:**
```json
[
  {
    "title": "IT and Data Intern",
    "company": "Path of Hope Foundation",
    "companyLink": "https://www.linkedin.com/company/rotary-path-of-hope/",
    "location": "Perth, WA",
    "period": "Jul 2024 - Oct 2024",
    "description": [
      "Conducted data extraction, transformation, and loading (ETL) processes..."
    ],
    "technologies": ["ETL", "Data Visualization", "Web Development"],
    "logo": "/icons/company/path-of-hope.svg",
    "order": 1
  }
]
```

**Error Response:**
```json
{
  "error": "Failed to fetch experience"
}
```

**Status Codes:**
- 200: Success
- 500: Server Error

---

## Data Storage

All data is stored in Firebase Firestore collections:
- `photos`
- `projects`
- `education`
- `experience`

Each collection uses the same data structure as shown in the response examples above.

## Sorting

- **Photos**: Sorted by `id` field in ascending order
- **Projects, Education, Experience**: Sorted by `order` field in ascending order
  - Lower `order` values appear first
  - The `order` field is optional and defaults to document creation order if not specified
  - You can manually adjust `order` values in Firebase Console to change display order
