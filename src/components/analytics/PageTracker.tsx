'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTracker() {
  const pathname = usePathname()
  const lastPath = useRef('')

  useEffect(() => {
    // 避免同一页面重复发送
    if (pathname === lastPath.current) return
    lastPath.current = pathname

    const data = JSON.stringify({
      path: pathname,
      referrer: document.referrer || '',
    })

    // 优先用 sendBeacon（不阻塞页面卸载），fallback 到 fetch
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', data)
    } else {
      fetch('/api/track', {
        method: 'POST',
        body: data,
        keepalive: true,
      }).catch(() => {})
    }
  }, [pathname])

  return null
}
