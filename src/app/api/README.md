# API Documentation

This document describes all API endpoints under `src/app/api`. All data is stored in and retrieved from Firebase Firestore.

## 📚 API Endpoints

### 1. Photos API

#### GET `/api/photos`

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

#### GET `/api/photos/:id`

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

### 2. GET `/api/projects`

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

### 3. GET `/api/education`

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

### 4. GET `/api/experience`

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

## 🗄️ Data Storage

All data is stored in Firebase Firestore collections:
- `photos`: Photography portfolio items
- `projects`: Development project showcases
- `education`: Academic background and courses
- `experience`: Work history and internships

### Collection Structure

Each collection follows a specific schema for consistency:

```typescript
interface BaseDocument {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  order?: number;
}

interface Photo extends BaseDocument {
  src: string;
  width: number;
  height: number;
  alt: string;
}

// ... other interfaces ...
```

## 🔄 Sorting and Filtering

- **Photos**: 
  - Default sort: `id` (ascending)
  - Pagination: 8 items per page
  - Filter by dimensions available

- **Projects, Education, Experience**: 
  - Default sort: `order` field (ascending)
  - The `order` field is optional
  - Falls back to creation date if `order` is not specified

## 🚀 Performance

- All endpoints are implemented as Edge Functions
- Responses are cached at the edge for 1 minute
- Long-term caching for static assets
- Automatic CDN distribution

## 📝 Error Handling

All endpoints follow a consistent error response format:

```typescript
interface ErrorResponse {
  error: string;
  code?: string;
  details?: unknown;
}
```

Common HTTP status codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 429: Too Many Requests
- 500: Server Error
