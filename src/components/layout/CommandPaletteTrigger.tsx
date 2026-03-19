'use client'

import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function CommandPaletteTrigger() {
  const t = useTranslations('Nav')

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 p-2 rounded-lg text-(--secondary-text) hover:text-(--foreground) hover:bg-(--accent-muted) transition-colors duration-200 focus:outline-hidden"
      aria-label={t('search')}
    >
      <Search className="w-[18px] h-[18px]" />
      <kbd className="hidden nav:inline-flex items-center gap-0.5 px-1.5 py-0.5 font-mono text-[10px] bg-(--background) border border-(--border-color) rounded leading-none">
        ⌘K
      </kbd>
    </button>
  )
}
