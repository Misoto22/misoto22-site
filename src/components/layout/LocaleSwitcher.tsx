'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useTransition } from 'react'

export default function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function switchTo(target: 'en' | 'zh') {
    if (target === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: target })
    })
  }

  return (
    <div
      className={`inline-flex items-center rounded-md border border-(--border-subtle) text-[11px] font-mono leading-none overflow-hidden ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <button
        onClick={() => switchTo('en')}
        className={`px-2 py-1.5 transition-colors duration-150 ${
          locale === 'en'
            ? 'bg-(--accent-muted) text-(--foreground) font-medium'
            : 'text-(--secondary-text) hover:text-(--foreground) hover:bg-(--accent-muted)/50'
        }`}
        aria-label="English"
      >
        EN
      </button>
      <div className="w-px h-3.5 bg-(--border-subtle)" />
      <button
        onClick={() => switchTo('zh')}
        className={`px-2 py-1.5 transition-colors duration-150 ${
          locale === 'zh'
            ? 'bg-(--accent-muted) text-(--foreground) font-medium'
            : 'text-(--secondary-text) hover:text-(--foreground) hover:bg-(--accent-muted)/50'
        }`}
        aria-label="中文"
      >
        中
      </button>
    </div>
  )
}
