# Henry Chen's Personal Website

<div align="center">

![personal-website copy](https://github.com/user-attachments/assets/d4da9841-ebdd-4ed3-abaf-41abdd3f8bbf)

*A modern, responsive personal portfolio website built with Next.js and TypeScript. Showcasing my projects, skills, and experiences in an elegant and interactive way.*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## ✨ Features

<div align="center">

| 🎨 Design | 📱 Responsive | 🌙 Theme | 🖼️ Gallery | 🚀 Performance | 📊 Interactive |
|:---------:|:------------:|:--------:|:----------:|:--------------:|:--------------:|
| Modern UI | Mobile First | Dark/Light | Project Showcase | Fast Loading | Framer Motion |

</div>

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|:--------:|:------------|
| **Framework** | Next.js 14 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **Icons** | Lucide React & React Icons |
| **Storage** | Cloudflare R2 |
| **CDN** | Cloudflare Workers |

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
└── context/              # React context
```

## 🔌 API Endpoints

For detailed API documentation, see [API Documentation](src/app/api/README.md).

| Endpoint        | Method | Description           | Returns                                 |
|:--------------- |:------ |:---------------------|:----------------------------------------|
| `/api/photos`   | GET    | Paginated photo feed | `photos[]` (`id`, `src`, `width`, `height`, `alt`), `total`, `hasMore` |
| `/api/projects` | GET    | List of projects     | `title`, `description`, `tech`, `links`, `image`, `category` |
| `/api/education`| GET    | Educational background| `degree`, `school`, `location`, `period`, `description`, `logo` |
| `/api/experience`| GET   | Work experience      | `position`, `company`, `location`, `period`, `description`, `tech`, `logo` |

## 🖼️ Image Optimization

- **Format**: WebP with high visual quality
- **Storage**: Cloudflare R2 for cost-effective hosting
- **Delivery**: Custom Cloudflare Worker with CDN support
- **Loading**: Next.js Image component with lazy loading
- **Caching**: Long-term caching headers for optimal performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/misoto22/my-website.git
   cd my-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Available Scripts

| Command | Description |
|:--------|:------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🌐 Deployment

The application is deployed on Vercel at [misoto22.com](https://misoto22.com/).

---

<div align="center">

Made by Henry Chen

</div>
