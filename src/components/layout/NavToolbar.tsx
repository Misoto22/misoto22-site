'use client'

import { Search, Sun, Moon, Monitor } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useTransition } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

const Divider = () => <div className="w-px h-3.5 bg-(--border-subtle)" />

export default function NavToolbar() {
  const t = useTranslations('Nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const { theme, cycleTheme } = useTheme()

  const themeIcon = {
    light: { icon: Sun, rotate: 90 },
    dark: { icon: Moon, rotate: -90 },
    system: { icon: Monitor, rotate: 0 },
  }[theme]

  const switchLocale = () => {
    const target = locale === 'en' ? 'zh' : 'en'
    startTransition(() => {
      router.replace(pathname, { locale: target })
    })
  }

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  const buttonBase =
    'flex items-center justify-center transition-colors duration-150 text-(--secondary-text) hover:text-(--foreground) hover:bg-(--accent-muted)/50 focus:outline-hidden'

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-(--border-subtle) overflow-hidden ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
    >
      {/* Search */}
      <button
        onClick={openCommandPalette}
        className={`${buttonBase} gap-1.5 px-2 py-1.5`}
        aria-label={t('search')}
      >
        <Search className="w-3.5 h-3.5" />
        <kbd className="hidden nav:inline font-mono text-[10px] text-(--secondary-text) leading-none">
          ⌘K
        </kbd>
      </button>

      <Divider />

      {/* Locale */}
      <button
        onClick={switchLocale}
        className={`${buttonBase} px-2 py-1.5 font-mono text-[11px] leading-none min-w-[28px]`}
        aria-label={locale === 'en' ? '切换到中文' : 'Switch to English'}
      >
        {locale === 'en' ? '中' : 'EN'}
      </button>

      <Divider />

      {/* Theme */}
      <button
        onClick={cycleTheme}
        className={`${buttonBase} px-2 py-1.5`}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ scale: 0, rotate: themeIcon.rotate }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -themeIcon.rotate }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex items-center justify-center"
          >
            <themeIcon.icon className="w-3.5 h-3.5" />
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  )
}
