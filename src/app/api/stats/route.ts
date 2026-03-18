import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = Math.min(parseInt(searchParams.get('days') || '30', 10), 365)
    const since = new Date(Date.now() - days * 86400000).toISOString()

    // 并行查询所有统计
    const [
      totalViews,
      uniqueVisitors,
      dailyViews,
      topPages,
      topReferrers,
      browsers,
      devices,
      countries,
    ] = await Promise.all([
      // 总浏览量
      supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', since),

      // 独立访客（去重 session_hash）
      supabase.rpc('count_unique_visitors', { since_date: since }),

      // 每日浏览量
      supabase.rpc('daily_page_views', { since_date: since }),

      // Top pages
      supabase.rpc('top_pages', { since_date: since, limit_count: 10 }),

      // Top referrers
      supabase.rpc('top_referrers', { since_date: since, limit_count: 10 }),

      // 浏览器分布
      supabase.rpc('browser_stats', { since_date: since }),

      // 设备分布
      supabase.rpc('device_stats', { since_date: since }),

      // 国家分布
      supabase.rpc('country_stats', { since_date: since, limit_count: 10 }),
    ])

    return NextResponse.json({
      totalViews: totalViews.count || 0,
      uniqueVisitors: uniqueVisitors.data || 0,
      dailyViews: dailyViews.data || [],
      topPages: topPages.data || [],
      topReferrers: topReferrers.data || [],
      browsers: browsers.data || [],
      devices: devices.data || [],
      countries: countries.data || [],
      days,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Error in stats API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
