import './globals.css'
import { Inter, DM_Serif_Display, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'
import { ViewTransitions } from 'next-view-transitions'
import { getLocale } from 'next-intl/server'

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
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
        <ViewTransitions>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ViewTransitions>
      </body>
    </html>
  )
}
