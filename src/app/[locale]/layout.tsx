import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ScrollToTopButton from '@/components/common/ScrollToTopButton'
import KeyboardNavigation from '@/components/layout/KeyboardNavigation'
import CommandPalette from '@/components/command-palette/CommandPalette'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import PageTracker from '@/components/analytics/PageTracker'
import { DISPLAY_NAME } from '@/lib/constants'
import type { Metadata } from 'next'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    metadataBase: new URL('https://misoto22.com'),
    title: {
      default: `${DISPLAY_NAME} - ${t('siteTitle')}`,
      template: `%s - ${DISPLAY_NAME}`,
    },
    description: t('siteDescription'),
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
      locale: locale === 'zh' ? 'zh_CN' : 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      languages: {
        en: '/',
        zh: '/zh',
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Validate locale
  if (!routing.locales.includes(locale as 'en' | 'zh')) {
    notFound()
  }

  const messages = await getMessages()
  const t = await getTranslations('Nav')

  return (
    <NextIntlClientProvider messages={messages}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-(--background) focus:text-(--foreground) focus:border focus:border-(--accent) focus:rounded"
      >
        {t('skipToMain')}
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
      <PageTracker />
    </NextIntlClientProvider>
  )
}
