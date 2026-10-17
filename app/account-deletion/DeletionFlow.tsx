'use client'

import { useState, type FormEvent } from 'react'
import { deleteAccount, describeAccountError, requestCode, verifyCode } from '@/lib/account-api'

type Step = 'email' | 'code' | 'confirm' | 'done'

const isEmail = (value: string): boolean => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)

/**
 * Email address, then the 6-digit code, then a last confirmation, then done. The sign-in token lives only in this
 * component's memory for the minute it is needed: it is never stored in the browser.
 */
export function DeletionFlow() {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [token, setToken] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  // The backend lower-cases emails; do the same so the code request and the check always agree.
  const address = email.trim().toLowerCase()

  const run = async (work: () => Promise<void>) => {
    setBusy(true)
    setError('')
    try { await work() } catch (failure) { setError(describeAccountError(failure)) } finally { setBusy(false) }
  }

  const sendCode = (event?: FormEvent) => {
    event?.preventDefault()
    if (!isEmail(address) || busy) return
    void run(async () => { await requestCode(address); setCode(''); setStep('code') })
  }
  const checkCode = (event: FormEvent) => {
    event.preventDefault()
    if (!/^\d{6}$/.test(code) || busy) return
    void run(async () => { setToken(await verifyCode(address, code)); setStep('confirm') })
  }
  const erase = () => {
    if (busy) return
    void run(async () => { await deleteAccount(token); setToken(''); setStep('done') })
  }

  if (step === 'done') {
    return (
      <div role="status" className="status-notice success">
        <strong>Your account has been deleted.</strong>
        <p style={{ margin: '6px 0 0' }}>Your personal details are erased and you are signed out everywhere. Thank you for being with us.</p>
      </div>
    )
  }

  return (
    <>
      {step === 'email' && (
        <form onSubmit={sendCode} noValidate>
          <label>
            Email address
            <input type="email" inputMode="email" autoComplete="email" value={email} onChange={event => { setEmail(event.target.value); setError('') }} aria-describedby="email-hint" />
            <span id="email-hint" className="hint">The email you use to sign in to the app.</span>
          </label>
          <button type="submit" disabled={!isEmail(address) || busy}>{busy ? 'Sending…' : 'Send code'}</button>
        </form>
      )}

      {step === 'code' && (
        <form onSubmit={checkCode} noValidate>
          <label>
            6-digit code
            <input type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={event => { setCode(event.target.value.replace(/\D/g, '')); setError('') }} aria-describedby="code-hint" />
            <span id="code-hint" className="hint">We sent it to {address}.</span>
          </label>
          <div className="actions">
            <button type="submit" disabled={!/^\d{6}$/.test(code) || busy}>{busy ? 'Checking…' : 'Continue'}</button>
            <button type="button" className="secondary" disabled={busy} onClick={() => { setStep('email'); setError('') }}>Use a different email</button>
          </div>
        </form>
      )}

      {step === 'confirm' && (
        <div className="actions">
          <p style={{ margin: 0 }}><strong>Delete the account for {address}?</strong></p>
          <ul className="consequences">
            <li>Your details and saved addresses are erased.</li>
            <li>You are signed out on every phone.</li>
            <li>This cannot be undone.</li>
          </ul>
          <button type="button" className="danger" disabled={busy} onClick={erase}>{busy ? 'Deleting…' : 'Delete my account'}</button>
          <button type="button" className="secondary" disabled={busy} onClick={() => { setToken(''); setStep('email'); setEmail(''); setCode(''); setError('') }}>Keep my account</button>
        </div>
      )}

      {error ? <p role="alert" className="status-notice error" style={{ marginTop: 14 }}>{error}</p> : null}
    </>
  )
}
