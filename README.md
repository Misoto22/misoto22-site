# Henry Chen's Personal Website

<div align="center">

![personal-website copy](https://github.com/user-attachments/assets/d4da9841-ebdd-4ed3-abaf-41abdd3f8bbf)

*A modern, responsive personal portfolio website built with Next.js and TypeScript. Showcasing my projects, skills, and experiences in an elegant and interactive way.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase)](https://firebase.google.com/)

</div>

## ✨ Features

<div align="center">

| 🎨 Design | 📱 Responsive | 🌙 Theme | 🖼️ Gallery | 🚀 Performance | 📊 Interactive |
|:---------:|:------------:|:--------:|:----------:|:--------------:|:--------------:|
| Modern UI | Mobile First | Dark/Light | Project Showcase | Turbopack | Framer Motion |

</div>

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|:--------:|:------------|
| **Framework** | Next.js 15 with Turbopack |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion 12 |
| **Icons** | Lucide React 0.511 & React Icons |
| **Storage** | Cloudflare R2 & Firebase |
| **CDN** | Cloudflare Workers |
| **Database** | Firestore |
| **Linting** | ESLint 9 |

</div>

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── api/               # API routes
│   │   ├── education/     # Education data endpoints
│   │   ├── experience/    # Experience data endpoints
│   │   ├── photos/        # Photography data endpoints
│   │   └── projects/      # Project data endpoints
│   ├── contact/           # Contact page
│   ├── education/         # Education page
│   ├── experience/        # Experience page
│   ├── photography/       # Photography page
│   └── projects/          # Projects page
├── components/            # React components
│   ├── animations/        # Animation components
│   ├── common/            # Common utilities (ScrollToTopButton)
│   ├── layout/            # Layout components (Navigation, Footer)
│   ├── photography/       # Photo-specific components
│   ├── sections/          # Content cards (Project, Education)
│   └── ui/                # UI primitives (Badge, Card)
├── lib/                  # Shared libraries
│   └── firebase-admin.ts # Firebase Admin SDK setup
└── context/              # React context
```

## 🔌 API Endpoints

For detailed API documentation, see [API Documentation](src/app/api/README.md).

| Endpoint | Method | Description | Status Codes |
|:---------|:-------|:------------|:-------------|
| `/api/photos` | GET | Paginated photo feed | 200, 500 |
| `/api/photos/:id` | GET | Single photo by ID | 200, 400, 404, 500 |
| `/api/projects` | GET | List of projects | 200, 500 |
| `/api/education` | GET | Educational background | 200, 500 |
| `/api/experience` | GET | Work experience | 200, 500 |

## 🖼️ Image & Data Storage

- **Images**:
  - Format: WebP with high visual quality
  - Storage: Cloudflare R2
  - Delivery: Custom Cloudflare Worker with CDN
  - Loading: Next.js Image component with lazy loading
  - Caching: Long-term caching headers

- **Data**:
  - Storage: Firebase Firestore
  - Collections: photos, projects, education, experience
  - Features: Real-time updates, automatic scaling
  - Security: Firebase Admin SDK

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm 8.x or later
- Firebase project credentials

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/misoto22/my-website.git
   cd my-website
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   Create `.env.local` with your Firebase credentials:
   ```
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email
   FIREBASE_PRIVATE_KEY=your-private-key
   ```

4. **Run the development server:**
   ```bash
   pnpm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Available Scripts

| Command | Description |
|:--------|:------------|
| `pnpm run dev` | Start development server with Turbopack |
| `pnpm run build` | Build for production |
| `pnpm run start` | Start production server |
| `pnpm run lint` | Run ESLint |
| `pnpm run format` | Format code with Prettier |

## 🌐 Deployment

The application is deployed on Vercel with the following configuration:

- **Production Domain**: [misoto22.com](https://misoto22.com/)
- **Framework Preset**: Next.js
- **Build Command**: `pnpm run build`
- **Install Command**: `pnpm install`
- **Environment Variables**: All Firebase credentials are configured in Vercel
- **Deployment Triggers**: 
  - Auto-deploy on main branch updates
  - Preview deployments for pull requests

---

<div align="center">

Made by Henry Chen

</div>
