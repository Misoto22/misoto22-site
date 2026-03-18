import type { Metadata } from 'next'
import StatsClient from './StatsClient'

export const metadata: Metadata = {
  title: 'Stats',
  description: 'Anonymous visitor analytics for misoto22.com',
}

export default function StatsPage() {
  return <StatsClient />
}
