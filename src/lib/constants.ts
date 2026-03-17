// Site-wide constants
export const SITE_CONFIG = {
  // Personal Information
  FULL_NAME: 'Henry Chen',
  DISPLAY_NAME: 'Henry Chen', // Serif wordmark in nav

  // Contact Information
  EMAIL: 'henrycxw@gmail.com',
  LOCATION: 'Sydney, New South Wales',

  // Social Links
  GITHUB_URL: 'https://github.com/Misoto22',
  LINKEDIN_URL: 'https://linkedin.com/in/henry-misoto22',
  INSTAGRAM_URL: 'https://instagram.com/hry.photography',
  UNSPLASH_URL: 'https://unsplash.com/@misoto22',

  // Resume
  RESUME_URL: '/files/resume.pdf',

  // Site Information
  SITE_TITLE: 'Personal Website',
  SITE_DESCRIPTION: "Henry Chen's Personal website",

  // Professional Information
  PROFESSION: 'Fullstack developer & DevOps Engineer',
  SECONDARY_PASSION: 'Photography',
} as const

// Navigation Configuration
export const NAV_PAGES = [
  { href: '/', text: 'Home' },
  { href: '/projects', text: 'Projects' },
  { href: '/photography', text: 'Photography' },
  { href: '/blog', text: 'Blog' },
  {
    href: '/about',
    text: 'About',
    children: [
      { href: '/about', text: 'About' },
      { href: '/education', text: 'Education' },
      { href: '/experience', text: 'Experience' }
    ]
  },
  { href: '/contact', text: 'Contact' }
] as const

// Export individual constants for convenience
export const {
  FULL_NAME,
  DISPLAY_NAME,
  EMAIL,
  LOCATION,
  RESUME_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  UNSPLASH_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  PROFESSION,
  SECONDARY_PASSION,
} = SITE_CONFIG
