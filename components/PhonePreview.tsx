import Image from 'next/image'
import { Icon } from './Icons'

/** A real screen captured from the Android app. */
export function PhonePreview() {
  return (
    <div className="phone-scene reveal">
      <span className="phone-orbit orbit-one" />
      <span className="phone-orbit orbit-two" />
      <div className="phone phone-capture">
        <div className="phone-screen">
          <Image
            src="/images/app/product-detail.png"
            alt="ShreeRam Milks Android app showing Pure Cow Ghee, pack sizes and ordering options"
            width={1080}
            height={2354}
            sizes="(max-width: 600px) 245px, 288px"
            className="app-screenshot"
          />
        </div>
      </div>
      <div className="phone-floating">
        <Icon name="cart" />
        <span>Your favourites, a tap away.<small>Explore sizes. Order in the app.</small></span>
      </div>
      <span className="preview-caption">Inside the ShreeRam Milks Android app</span>
    </div>
  )
}
