import { PlayStoreButton } from '@/components/PlayStoreButton'
import { Card, PageHeader, Section } from '@/components/ui'
import { getPlayStoreUrl } from '@/lib/content-api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300
export const metadata = pageMetadata({
  title: 'Download the app',
  description: 'Get the ShreeRam Milks app on Google Play to order fresh milk, set up daily delivery and manage your subscription.',
  path: '/download',
})

const FEATURES = [
  { title: 'Order in a minute', text: 'Pick your milk and dairy products and choose a delivery slot.' },
  { title: 'Subscribe once', text: 'Get delivery every day. Pause or skip when you travel.' },
  { title: 'Track everything', text: 'See your upcoming deliveries, payments and balance in one place.' },
]

export default async function DownloadPage() {
  const playStoreUrl = await getPlayStoreUrl()
  return (
    <>
      <Section narrow>
        <PageHeader title="Get the ShreeRam Milks app" intro="Order fresh milk and manage your deliveries from your phone." />
        <div className="hero-actions"><PlayStoreButton url={playStoreUrl} /></div>
      </Section>
      <Section tone="fill" labelledBy="app-features">
        <h2 id="app-features" className="section-title">What you can do in the app</h2>
        <div className="grid grid-3">{FEATURES.map(item => <Card key={item.title}><h3>{item.title}</h3><p className="card-text">{item.text}</p></Card>)}</div>
      </Section>
    </>
  )
}
