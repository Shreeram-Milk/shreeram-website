import Image from 'next/image'
import { PlayStoreButton } from '@/components/PlayStoreButton'
import { Card, Section } from '@/components/ui'
import { getPlayStoreUrl } from '@/lib/content-api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300
export const metadata = pageMetadata({
  title: 'Download the app',
  description: 'Get the ShreeRam Milks app on Google Play to order fresh milk, set up daily delivery and manage your subscription.',
  path: '/download',
})

const FEATURES = [
  { icon: '🛒', title: 'Order in a minute', text: 'Pick your milk and dairy products and choose a delivery slot.' },
  { icon: '📅', title: 'Subscribe once', text: 'Get delivery every day. Pause or skip when you travel.' },
  { icon: '📊', title: 'Track everything', text: 'See your upcoming deliveries, payments and balance in one place.' },
]

export default async function DownloadPage() {
  const playStoreUrl = await getPlayStoreUrl()
  return (
    <>
      <Section>
        <div className="split">
          <div>
            <span className="eyebrow"><span className="live-dot" aria-hidden="true" />Android app</span>
            <h1>Get the ShreeRam Milks <span className="accent">app</span></h1>
            <p className="lede">Order fresh milk and manage your deliveries from your phone, in Gujarati or English.</p>
            <div className="hero-actions"><PlayStoreButton url={playStoreUrl} /></div>
          </div>
          <div className="photo reveal"><Image src="/images/glass.jpg" alt="A glass of fresh milk" fill sizes="(min-width: 860px) 50vw, 100vw" priority /></div>
        </div>
      </Section>
      <Section tone="fill" labelledBy="app-features">
        <div className="section-head reveal"><span className="eyebrow">Inside the app</span><h2 id="app-features">What you can do in the app</h2></div>
        <div className="grid grid-3">{FEATURES.map(item => <Card key={item.title} className="reveal"><div className="icon-dot" aria-hidden="true">{item.icon}</div><h3>{item.title}</h3><p className="card-text">{item.text}</p></Card>)}</div>
      </Section>
    </>
  )
}
