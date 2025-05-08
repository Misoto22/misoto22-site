// src/app/layout.tsx
import './globals.css'
import { Montserrat } from 'next/font/google'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { ThemeProvider } from '@/context/ThemeContext'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'HENRY CHEN - Personal Website',
  description: 'Henry&apos;s Personal photography portfolio and blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${montserrat.variable}`}>
        <ThemeProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <ScrollToTopButton />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}