'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'
import { useTranslations } from 'next-intl'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'

interface StatsData {
  totalViews: number
  uniqueVisitors: number
  dailyViews: { date: string; views: number }[]
  topPages: { path: string; views: number }[]
  topReferrers: { referrer: string; views: number }[]
  browsers: { browser: string; views: number }[]
  devices: { device: string; views: number }[]
  countries: { country: string; views: number }[]
  days: number
}

const RANGES = [
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
]

export default function StatsClient() {
  const t = useTranslations('Stats')
  const [data, setData] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(30)

  const fetchStats = useCallback(async (d: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/stats?days=${d}`)
      if (res.ok) setData(await res.json())
    } catch {
      // 静默失败
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats(days)
  }, [days, fetchStats])

  const handleRange = (d: number) => setDays(d)

  return (
    <main className="pt-24 pb-24 min-h-screen bg-(--background)">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
          className="mb-12"
        >
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-(--foreground) mb-4">
            {t('title')}
          </h1>
          <div className="w-12 h-px bg-(--accent) mb-4" />
          <p className="text-(--secondary-text) text-lg max-w-xl">
            {t('description')}
          </p>
        </motion.div>

        {/* Range toggle */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: ANIMATION.duration.slow, delay: 0.1, ease: ANIMATION.ease.out }}
          className="flex gap-2 mb-10"
        >
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => handleRange(r.days)}
              className={`font-mono text-xs tracking-wider px-4 py-2 rounded-md transition-all duration-200 ${
                days === r.days
                  ? 'bg-(--accent) text-white'
                  : 'text-(--secondary-text) hover:text-(--foreground) bg-(--card-bg) border border-(--border-subtle)'
              }`}
            >
              {r.label}
            </button>
          ))}
        </motion.div>

        {loading && !data ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-(--accent) animate-[pulse_1.5s_infinite]"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        ) : data ? (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <StatCard label={t('pageViews')} value={data.totalViews} delay={0.1} />
              <StatCard label={t('uniqueVisitors')} value={data.uniqueVisitors} delay={0.15} />
              <StatCard
                label={t('pagesPerVisit')}
                value={data.uniqueVisitors > 0 ? (data.totalViews / data.uniqueVisitors).toFixed(1) : '0'}
                delay={0.2}
              />
              <StatCard label={t('countries')} value={data.countries.length} delay={0.25} />
            </div>

            {/* Traffic chart */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{ duration: ANIMATION.duration.slow, delay: 0.2, ease: ANIMATION.ease.out }}
              className="mb-12 p-6 rounded-xl bg-(--card-bg) border border-(--border-subtle)"
            >
              <h2 className="font-mono text-xs uppercase tracking-widest text-(--secondary-text) mb-6">
                {t('traffic', { days })}
              </h2>
              {data.dailyViews.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={data.dailyViews}>
                    <defs>
                      <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10, fill: 'var(--secondary-text)' }}
                      tickFormatter={(v) => {
                        const d = new Date(v)
                        return `${d.getMonth() + 1}/${d.getDate()}`
                      }}
                      axisLine={false}
                      tickLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: 'var(--secondary-text)' }}
                      axisLine={false}
                      tickLine={false}
                      width={30}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: 'var(--foreground)',
                      }}
                      labelFormatter={(v) => new Date(v).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="var(--accent)"
                      strokeWidth={2}
                      fill="url(#viewsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-(--secondary-text) text-center py-16">{t('noData')}</p>
              )}
            </motion.div>

            {/* Two-column: Top Pages + Referrers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <BarList title={t('topPages')} items={data.topPages.map((p) => ({ label: p.path, value: p.views }))} delay={0.3} />
              <BarList title={t('referrers')} items={data.topReferrers.map((r) => ({ label: r.referrer, value: r.views }))} delay={0.35} />
            </div>

            {/* Three-column: Devices, Browsers, Countries */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <BarList title={t('devices')} items={data.devices.map((d) => ({ label: d.device, value: d.views }))} delay={0.4} />
              <BarList title={t('browsers')} items={data.browsers.map((b) => ({ label: b.browser, value: b.views }))} delay={0.45} />
              <BarList title={t('countries')} items={data.countries.map((c) => ({ label: c.country, value: c.views }))} delay={0.5} />
            </div>

            {/* Privacy notice */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
              className="text-center text-xs text-(--secondary-text) font-mono tracking-wide"
            >
              {t('privacy')}
            </motion.p>
          </>
        ) : null}
      </div>
    </main>
  )
}

// ── Stat Card ──
function StatCard({ label, value, delay }: { label: string; value: number | string; delay: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: ANIMATION.duration.slow, delay, ease: ANIMATION.ease.out }}
      className="p-5 rounded-xl bg-(--card-bg) border border-(--border-subtle)"
    >
      <p className="font-heading text-3xl md:text-4xl text-(--foreground) mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      <p className="font-mono text-xs uppercase tracking-widest text-(--secondary-text)">
        {label}
      </p>
    </motion.div>
  )
}

// ── Bar List ──
function BarList({ title, items, delay }: {
  title: string
  items: { label: string; value: number }[]
  delay: number
}) {
  const maxValue = Math.max(...items.map((i) => i.value), 1)

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: ANIMATION.duration.slow, delay, ease: ANIMATION.ease.out }}
      className="p-5 rounded-xl bg-(--card-bg) border border-(--border-subtle)"
    >
      <h3 className="font-mono text-xs uppercase tracking-widest text-(--secondary-text) mb-4">
        {title}
      </h3>
      {items.length > 0 ? (
        <div className="space-y-2.5">
          {items.map((item) => (
            <div key={item.label} className="group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-(--foreground) truncate mr-4">{item.label}</span>
                <span className="font-mono text-xs text-(--secondary-text) shrink-0">{item.value.toLocaleString()}</span>
              </div>
              <div className="h-1.5 rounded-full bg-(--border-subtle) overflow-hidden">
                <div
                  className="h-full rounded-full bg-(--accent) opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-(--secondary-text) text-sm">No data yet.</p>
      )}
    </motion.div>
  )
}
