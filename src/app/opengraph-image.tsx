import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Henry Chen — Fullstack Developer & Photographer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#F7F3EE',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Accent line */}
        <div style={{ width: 64, height: 3, backgroundColor: '#8B6E4E', marginBottom: 32 }} />

        {/* Name */}
        <div style={{ fontSize: 64, color: '#2C2825', lineHeight: 1.2, marginBottom: 16 }}>
          Henry Chen
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 28, color: '#5C5650', lineHeight: 1.5, marginBottom: 40 }}>
          Developer. Photographer.
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 18,
            color: '#8C857D',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
          }}
        >
          misoto22.com
        </div>

        {/* Decorative corner brackets */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ width: 40, height: 2, backgroundColor: '#8B6E4E', opacity: 0.5 }} />
          <div style={{ width: 2, height: 40, backgroundColor: '#8B6E4E', opacity: 0.5 }} />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 40,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ width: 2, height: 40, backgroundColor: '#8B6E4E', opacity: 0.5 }} />
          <div style={{ width: 40, height: 2, backgroundColor: '#8B6E4E', opacity: 0.5 }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
