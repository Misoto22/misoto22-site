import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Bot 检测：常见爬虫关键词
export const BOT_PATTERNS = /bot|crawler|spider|crawling|facebookexternalhit|linkedinbot|twitterbot|slackbot|whatsapp|preview|headless|phantom|selenium/i

export function parseDevice(ua: string): string {
  if (/tablet|ipad/i.test(ua)) return 'tablet'
  if (/mobile|iphone|android.*mobile/i.test(ua)) return 'mobile'
  return 'desktop'
}

export function parseBrowser(ua: string): string {
  if (/edg/i.test(ua)) return 'Edge'
  if (/chrome|crios/i.test(ua)) return 'Chrome'
  if (/firefox|fxios/i.test(ua)) return 'Firefox'
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari'
  if (/opera|opr/i.test(ua)) return 'Opera'
  return 'Other'
}

export function extractDomain(referrer: string): string | null {
  if (!referrer) return null
  try {
    const url = new URL(referrer)
    const host = url.hostname.replace(/^www\./, '')
    // 过滤自身域名
    if (host === 'misoto22.com' || host === 'localhost') return null
    return host
  } catch {
    return null
  }
}

// 简单的 session hash：基于日期 + path + UA 片段，不存 IP
export function createSessionHash(date: string, path: string, ua: string): string {
  const raw = `${date}:${path}:${ua.slice(0, 50)}`
  let hash = 0
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return hash.toString(36)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, referrer } = body

    if (!path || typeof path !== 'string') {
      return NextResponse.json({ error: 'Missing path' }, { status: 400 })
    }

    // 只追踪页面路径，忽略 API 和静态资源
    if (path.startsWith('/api/') || path.startsWith('/_next/')) {
      return NextResponse.json({ ok: true })
    }

    const ua = request.headers.get('user-agent') || ''

    // 过滤 bot
    if (BOT_PATTERNS.test(ua)) {
      return NextResponse.json({ ok: true })
    }

    const device = parseDevice(ua)
    const browser = parseBrowser(ua)
    const domain = extractDomain(referrer || '')
    const country = request.headers.get('x-vercel-ip-country') || null
    const today = new Date().toISOString().slice(0, 10)
    const sessionHash = createSessionHash(today, path, ua)

    await supabase.from('page_views').insert({
      path: path.split('?')[0], // 去掉 query params
      referrer: domain,
      country,
      device,
      browser,
      session_hash: sessionHash,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true }) // 静默失败，不影响用户体验
  }
}
