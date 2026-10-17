import Link from 'next/link'
import { Card, Section } from '@/components/ui'
import { pageMetadata } from '@/lib/seo'
import { DeletionFlow } from './DeletionFlow'

export const metadata = pageMetadata({
  title: 'Delete your account',
  description: 'Ask ShreeRam Milks to erase your account and personal details.',
  path: '/account-deletion',
})

/**
 * The public page the app stores ask for: how a customer deletes their account without opening the app.
 * The page is plain server-rendered text; only the form below it needs the browser.
 */
export default function AccountDeletionPage() {
  return (
    <Section narrow>
      <div className="page-breadcrumb"><Link href="/">Home</Link><span>/</span><span>Account & privacy</span></div>
      <span className="eyebrow">YOUR DATA. YOUR CHOICE.</span>
      <h1>Delete your account</h1>
      <p className="lede">You can erase your ShreeRam Milks account here, without opening the app.</p>

      <h2>What happens</h2>
      <ul className="steps">
        <li>Your name, email, phone number and saved addresses are erased.</li>
        <li>You are signed out on every phone.</li>
        <li>Past orders and payments stay in our records, without your personal details, because the law asks us to keep them.</li>
        <li>This cannot be undone. You can sign up again later with the same email, but it will be a new account.</li>
      </ul>

      <h2>Delete it now</h2>
      <p>We send a 6-digit code to your email address to check it is really you.</p>
      <Card>
        <DeletionFlow />
      </Card>

      <h2>Prefer to do it in the app?</h2>
      <p>Open the app, go to Profile, then Settings, and choose Delete my account.</p>
    </Section>
  )
}
