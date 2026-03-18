'use client'

import { useState, useEffect } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  createLongitude,
  createLatitude,
} from '@vnedyalk0v/react19-simple-maps'
import type { Coordinates } from '@vnedyalk0v/react19-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const coord = (lng: number, lat: number): Coordinates =>
  [createLongitude(lng), createLatitude(lat)]

const SHANGHAI = coord(121.47, 31.23)
const SYDNEY = coord(151.21, -33.87)

// 航线弧线中间控制点
const ROUTE_POINTS = [
  SHANGHAI,
  coord(130, 8),
  coord(140, -5),
  coord(148, -18),
  SYDNEY,
]

// 模块级缓存，避免重复请求
let cachedTopoData: Record<string, unknown> | null = null

/**
 * 写实风格亚太地图背景 — 标注上海与悉尼
 */
export default function SydneyMapBackground() {
  const [topoData, setTopoData] = useState<Record<string, unknown> | null>(cachedTopoData)

  useEffect(() => {
    if (cachedTopoData) return
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((data) => { cachedTopoData = data; setTopoData(data) })
      .catch((err) => console.warn('Map background unavailable:', err))
  }, [])

  if (!topoData) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1200px,180%)] aspect-[2/1] animate-[fadeIn_2s_ease-out]">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: coord(135, -2),
            scale: 350,
          }}
          width={800}
          height={400}
          style={{ width: '100%', height: '100%' }}
        >
          {/* ── 真实海岸线 ── */}
          <Geographies geography={topoData}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="var(--accent)"
                  stroke="var(--accent)"
                  strokeWidth={0.3}
                  style={{
                    default: { fillOpacity: 0.07, strokeOpacity: 0.12 },
                    hover: { fillOpacity: 0.07, strokeOpacity: 0.12 },
                    pressed: { fillOpacity: 0.07, strokeOpacity: 0.12 },
                  }}
                />
              ))
            }
          </Geographies>

          {/* ── 航线连接弧（虚线） ── */}
          {ROUTE_POINTS.slice(0, -1).map((point, i) => (
            <Line
              key={i}
              from={point}
              to={ROUTE_POINTS[i + 1]}
              stroke="var(--accent)"
              strokeWidth={0.6}
              strokeOpacity={0.18}
              strokeLinecap="round"
              strokeDasharray="3 4"
            />
          ))}

          {/* ── 上海标记 ── */}
          <Marker coordinates={SHANGHAI}>
            <circle r={4} fill="none" stroke="var(--accent)" strokeWidth={0.6} opacity={0.25}>
              <animate attributeName="r" from="4" to="12" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.25" to="0" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle r={2} fill="var(--accent)" opacity={0.35} />
            <text
              textAnchor="end"
              x={-8}
              y={1}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '6px',
                fill: 'var(--accent)',
                opacity: 0.3,
                letterSpacing: '0.05em',
              }}
            >
              Shanghai
            </text>
          </Marker>

          {/* ── 悉尼标记 ── */}
          <Marker coordinates={SYDNEY}>
            <circle r={4} fill="none" stroke="var(--accent)" strokeWidth={0.6} opacity={0.25}>
              <animate attributeName="r" from="4" to="12" dur="3s" begin="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.25" to="0" dur="3s" begin="1.5s" repeatCount="indefinite" />
            </circle>
            <circle r={2} fill="var(--accent)" opacity={0.35} />
            <text
              textAnchor="start"
              x={8}
              y={1}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '6px',
                fill: 'var(--accent)',
                opacity: 0.3,
                letterSpacing: '0.05em',
              }}
            >
              Sydney
            </text>
          </Marker>
        </ComposableMap>
      </div>
    </div>
  )
}
