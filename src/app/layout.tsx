// src/app/layout.tsx
import './globals.css'
import { Inter, DM_Serif_Display, JetBrains_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ScrollToTopButton from '@/components/common/ScrollToTopButton'
import KeyboardNavigation from '@/components/layout/KeyboardNavigation'
import { ThemeProvider } from '@/context/ThemeContext'
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
  title: `${DISPLAY_NAME} - ${SITE_TITLE}`,
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} ${dmSerifDisplay.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          <Navigation />
          <KeyboardNavigation>
            <main>{children}</main>
          </KeyboardNavigation>
          <Footer />
          <ScrollToTopButton />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
