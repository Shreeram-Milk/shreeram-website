import { ImageResponse } from 'next/og'

export const alt = 'ShreeRam Milks – fresh milk delivered daily'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** The default picture shown when a page is shared; pages without their own image use this one. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: '#EAF6EF', color: '#1F1C18' }}>
        <div style={{ fontSize: 40, color: '#1A7048', fontWeight: 700 }}>Fresh every morning</div>
        <div style={{ fontSize: 96, fontWeight: 800, color: '#B84A10', marginTop: 12 }}>ShreeRam Milks</div>
        <div style={{ fontSize: 40, marginTop: 20 }}>Fresh milk and dairy, delivered to your door</div>
        <div style={{ width: 160, height: 12, background: '#F2B33D', borderRadius: 6, marginTop: 40 }} />
      </div>
    ),
    size,
  )
}
