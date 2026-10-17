import { PlayStoreButton } from '@/components/PlayStoreButton'
import { PhonePreview } from '@/components/PhonePreview'
import { Icon, type IconName } from '@/components/Icons'
import { getPlayStoreUrl } from '@/lib/content-api'
import { pageMetadata } from '@/lib/seo'
export const revalidate = 300
export const metadata = pageMetadata({
  title: 'Download the app',
  description:
    'Get the ShreeRam Milks app on Google Play to order fresh milk, set up daily delivery and manage your subscription.',
  path: '/download',
})
const FEATURES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'cart',
    title: 'Your favourites, a tap away.',
    text: 'Pick your milk and dairy products, choose a delivery slot and order securely.',
  },
  {
    icon: 'calendar',
    title: 'A routine that fits your life.',
    text: 'Set up daily deliveries. Change quantities, pause or skip when you travel.',
  },
  {
    icon: 'chart',
    title: 'Everything, in one place.',
    text: 'See your upcoming deliveries, payments and balance without the extra phone calls.',
  },
]
export default async function DownloadPage() {
  const playStoreUrl = await getPlayStoreUrl()
  return (
    <>
      <section className="section download-hero">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">FRESHNESS. ON YOUR PHONE.</span>
            <h1>
              Your mornings.
              <br />
              <span className="muted-heading">Beautifully</span>
              <br />
              sorted.
            </h1>
            <p className="lede">
              Meet the ShreeRam Milks app. Fresh dairy, flexible daily plans and
              a little less on your to-do list.
            </p>
            <div className="hero-actions">
              <PlayStoreButton url={playStoreUrl} />
            </div>
            <p className="download-note">
              For Android · Ordering and delivery availability are shown in the
              app.
            </p>
            <div className="download-language">
              <span>English</span>
              <span lang="gu">ગુજરાતી</span>
            </div>
          </div>
          <PhonePreview />
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">A SIMPLER EVERYDAY</span>
            <h2>
              More goodness.
              <br />
              Fewer things to remember.
            </h2>
          </div>
          <ul className="features features-3">
            {FEATURES.map((item, index) => (
              <li
                key={item.title}
                className="feature reveal"
                data-delay={index * 100}
              >
                <Icon name={item.icon} size={29} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
