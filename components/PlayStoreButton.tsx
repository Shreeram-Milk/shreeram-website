import { Button } from './ui'

/** The Google Play button, or a calm "coming soon" note until the app has a Play link. */
export function PlayStoreButton({ url }: { url: string }) {
  if (url) return <Button href={url} external>Get it on Google Play</Button>
  return <span className="coming-soon">Coming soon on Google Play</span>
}
