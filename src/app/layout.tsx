// src/app/layout.tsx
import './globals.css'
import { Inter, DM_Serif_Display, JetBrains_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ScrollToTopButton from '@/components/common/ScrollToTopButton'
import KeyboardNavigation from '@/components/layout/KeyboardNavigation'
import { ThemeProvider } from '@/context/ThemeContext'
import CommandPalette from '@/components/command-palette/CommandPalette'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { DISPLAY_NAME, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/constants'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://misoto22.com'),
  title: {
    default: `${DISPLAY_NAME} - ${SITE_TITLE}`,
    template: `%s - ${DISPLAY_NAME}`,
  },
  description: SITE_DESCRIPTION,
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    siteName: DISPLAY_NAME,
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme') || 'system';
              var resolved = theme;
              if (theme === 'system') {
                resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              if (resolved === 'dark') document.documentElement.classList.add('dark');
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className={`${inter.className} ${inter.variable} ${dmSerifDisplay.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-(--background) focus:text-(--foreground) focus:border focus:border-(--accent) focus:rounded"
          >
            Skip to main content
          </a>
          <Navigation />
          <KeyboardNavigation>
            <main id="main-content">{children}</main>
          </KeyboardNavigation>
          <Footer />
          <ScrollToTopButton />
          <CommandPalette />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
