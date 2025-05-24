// Site-wide constants
export const SITE_CONFIG = {
  // Personal Information
  FULL_NAME: 'Henry Chen',
  DISPLAY_NAME: 'HENRY CHEN', // For navigation/logo

  // Contact Information
  EMAIL: 'cxw8848@hotmail.com',
  LOCATION: 'Perth, Western Australia',

  // Social Links
  GITHUB_URL: 'https://github.com/Misoto22',
  LINKEDIN_URL: 'https://linkedin.com/in/henry-misoto22',
  INSTAGRAM_URL: 'https://instagram.com/hry.photography',

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
  { href: '/education', text: 'Education' },
  { href: '/projects', text: 'Projects' },
  { href: '/experience', text: 'Experience' },
  { href: '/photography', text: 'Photography' },
  { href: '/contact', text: 'Contact' }
] as const

// Export individual constants for convenience
export const {
  FULL_NAME,
  DISPLAY_NAME,
  EMAIL,
  LOCATION,
  GITHUB_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  PROFESSION,
  SECONDARY_PASSION,
} = SITE_CONFIG
