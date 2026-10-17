import { PolicyPage, POLICY_ROUTES, policyMetadata } from '@/components/PolicyPage'

export const revalidate = 300
export const metadata = policyMetadata(POLICY_ROUTES.refund)

export default function Page() {
  return <PolicyPage route={POLICY_ROUTES.refund} />
}
