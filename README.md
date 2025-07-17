# Henry Chen's Personal Website

<div align="center">

<img width="3840" height="2880" alt="753_2x_shots_so1" src="https://github.com/user-attachments/assets/3bbb7856-0998-4083-8dc0-ed9c01718a14" />

*A modern, responsive personal portfolio website built with Next.js and TypeScript. Showcasing my projects, skills, experiences, and blog posts in an elegant and interactive way.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

</div>

## ✨ Features

<div align="center">

| 🎨 Design | 📱 Responsive | 🌙 Theme | 🖼️ Gallery | 📝 Blog | 🚀 Performance | 📊 Interactive |
|:---------:|:------------:|:--------:|:----------:|:-------:|:--------------:|:--------------:|
| Modern UI | Mobile First | Dark/Light | Project Showcase | Markdown Posts | Turbopack | Framer Motion |

</div>

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|:--------:|:------------|
| **Framework** | Next.js 15 with Turbopack |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **Animation** | Framer Motion 12 |
| **Icons** | Lucide React 0.525 & React Icons |
| **Database** | Supabase PostgreSQL |
| **Storage** | Supabase Storage |
| **Linting** | ESLint 9 |

</div>

## 🏗️ Project Architecture

This is a modern full-stack personal website built with Next.js 15 and TypeScript, featuring a clean architecture that separates concerns between presentation, business logic, and data management. The application follows Next.js App Router conventions with server-side rendering, API routes, and optimized performance through Turbopack.

**Key Architectural Principles:**
- **Component-Based**: Modular React components with clear separation of concerns
- **Type-Safe**: Full TypeScript implementation for better developer experience
- **Server-First**: Leveraging Next.js SSR and API routes for optimal performance
- **Database-Driven**: Dynamic content management through Supabase PostgreSQL
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 📁 File Structure

```
src/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── api/               # API routes
│   │   ├── blog/          # Blog data endpoints
│   │   ├── photos/        # Photography data endpoints
│   │   └── revalidate/    # Cache revalidation endpoint
│   ├── blog/              # Blog pages
│   │   ├── category/      # Blog category pages
│   │   └── [slug]/        # Individual blog post pages
│   ├── contact/           # Contact page
│   ├── education/         # Education page
│   ├── experience/        # Experience page
│   ├── photography/       # Photography page
│   └── projects/          # Projects page
├── components/            # React components
│   ├── animations/        # Animation components
│   ├── blog/              # Blog-specific components
│   ├── common/            # Common utilities (ScrollToTopButton)
│   ├── layout/            # Layout components (Navigation, Footer)
│   ├── photography/       # Photo-specific components
│   ├── sections/          # Content cards (Project, Education)
│   └── ui/                # UI primitives (Badge, Card)
├── lib/                  # Shared libraries
│   ├── constants.ts      # Application constants
│   ├── data.ts           # Data fetching functions
│   └── supabase.ts       # Supabase client setup
└── context/              # React context
```

### 🗄️ Database Structure

![Database Structure](https://github.com/user-attachments/assets/ab33f824-5d20-4a61-85a6-4a0eac9db7cb)


The application uses Supabase PostgreSQL with the following main tables:

**Core Tables:**
- `users` - Blog author information and profile data
- `blog_posts` - Blog content with metadata (title, slug, content, published_at)
- `blog_categories` - Blog categorization system
- `tags` - Tagging system for blog posts and projects
- `photos` - Photography portfolio with metadata and storage references
- `projects` - Project showcase with descriptions, technologies, and links
- `education` - Educational background and achievements
- `experience` - Professional experience and work history

**Key Features:**
- **Real-time Updates**: Live data synchronization
- **Automatic Scaling**: Managed PostgreSQL with auto-scaling
- **Storage Integration**: Seamless file storage for images and assets

## 🔌 API Endpoints

For detailed API documentation, see [API Documentation](src/app/api/README.md).

| Endpoint | Method | Description | Status Codes |
|:---------|:-------|:------------|:-------------|
| `/api/photos` | GET | Paginated photo feed | 200, 400, 500 |
| `/api/blog` | GET | Paginated blog posts | 200, 400, 500 |
| `/api/blog/[slug]` | GET | Single blog post by slug | 200, 400, 404, 500 |
| `/api/blog/categories` | GET | Blog categories | 200, 500 |
| `/api/revalidate` | POST | Cache revalidation | 200, 401, 500 |

## 🚀 Development

### Prerequisites

- Node.js 18.x or later
- pnpm 8.x or later
- Supabase project credentials

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
   Create `.env.local` with your `Supabase` and `EmailJS` credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-emailjs-service-id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-emailjs-template-id
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

## 🌐 Deployment

The application is deployed on Vercel with the following configuration:

- **Production Domain**: [misoto22.com](https://misoto22.com/)
- **Framework Preset**: Next.js
- **Build Command**: `pnpm run build`
- **Install Command**: `pnpm install`
- **Environment Variables**: All Supabase credentials are configured in Vercel
- **Deployment Triggers**:
  - Auto-deploy on main branch updates
  - Preview deployments for pull requests

---

<div align="center">

Made by Henry Chen

</div>
