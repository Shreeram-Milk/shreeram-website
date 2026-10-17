const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000').replace(/\/$/, '')

/** A failed request, carrying the backend's stable error code so the page can show plain wording. */
export class AccountApiError extends Error {
  constructor(readonly code: string) { super(code) }
}

/** What the customer sees for each error the backend can return on this flow. */
const MESSAGES: Record<string, string> = {
  VALIDATION_ERROR: 'Check the email address or code you entered and try again.',
  INVALID_CODE: 'That code is not correct or has expired. Check it, or ask for a new one.',
  CODE_TOO_SOON: 'Please wait a minute before asking for another code.',
  TOO_MANY_CODES: 'Too many codes were requested. Please try again in an hour.',
  RATE_LIMITED: 'Too many tries. Please wait a little and try again.',
  ACCOUNT_BLOCKED: 'This account cannot be changed here. Please contact support.',
  CODE_SEND_FAILED: 'We could not send the code. Please try again.',
  UNAUTHENTICATED: 'Your session ended. Please start again.',
  NETWORK_ERROR: 'We could not reach the server. Check your connection and try again.',
}

export const describeAccountError = (error: unknown): string =>
  error instanceof AccountApiError ? (MESSAGES[error.code] ?? 'Something went wrong. Please try again.') : 'Something went wrong. Please try again.'

async function call<Body>(method: 'POST' | 'DELETE', path: string, body?: unknown, token?: string): Promise<Body> {
  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: { Accept: 'application/json', ...(body === undefined ? {} : { 'Content-Type': 'application/json' }), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    })
  } catch {
    throw new AccountApiError('NETWORK_ERROR')
  }
  const payload = (await response.json().catch(() => null)) as { error?: { code?: unknown } } | null
  if (!response.ok) throw new AccountApiError(typeof payload?.error?.code === 'string' ? payload.error.code : 'UNKNOWN_ERROR')
  return payload as Body
}

/** Proof of identity is the same as in the app: a code sent to the account's email, so only its owner can erase the account. */
export const requestCode = (email: string): Promise<void> => call('POST', '/customer/auth/request-code', { email })

export async function verifyCode(email: string, code: string): Promise<string> {
  const result = await call<{ token?: unknown }>('POST', '/customer/auth/verify', { email, code, deviceLabel: 'website' })
  if (typeof result.token !== 'string' || result.token === '') throw new AccountApiError('UNKNOWN_ERROR')
  return result.token
}

export const deleteAccount = (token: string): Promise<void> => call('DELETE', '/customer/me', undefined, token)
