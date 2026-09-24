import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register, verifyOtp, resendOtp, getAuth } from '../lib/auth'
import { api } from '../lib/api'
import { mergeRemoteProgress } from '../lib/store'
import ThemeToggle from './ThemeToggle'
import { Icon } from '../lib/icons'

export default function LoginScreen() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'register' | 'otp'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [devOtp, setDevOtp] = useState(null)
  const [cooldown, setCooldown] = useState(0)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpRefs = useRef([])

  async function finishSignup() {
    // pull cloud progress and merge into local stats
    try {
      const data = await api('/api/progress', 'GET', null, getAuth()?.token)
      mergeRemoteProgress(data.progress || {})
    } catch {
      // ignore — will sync on next save
    }
    navigate('/', { replace: true })
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (mode === 'register' && name.trim().length < 2) {
      setError('Please enter your name.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setBusy(true)
    try {
      if (mode === 'login') {
        const r = await login(email, password)
        if (r.needsOtp) {
          setEmail(r.email)
          if (r.devOtp) setDevOtp(r.devOtp)
          setMode('otp')
          setError('First verify your email — a code was sent to your inbox.')
          return
        }
        await finishSignup()
      } else {
        const r = await register(name, email, password)
        setNotice(r.otpSent ? '' : '')
        if (r.devOtp) setDevOtp(r.devOtp)
        setMode('otp')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  async function submitOtp(e) {
    e.preventDefault()
    setError('')
    const code = otp.join('')
    if (code.length !== 6) {
      setError('Please enter the 6-digit code.')
      return
    }
    setBusy(true)
    try {
      await verifyOtp(email, code)
      await finishSignup()
    } catch (err) {
      setError(err.message || 'Verification failed.')
    } finally {
      setBusy(false)
    }
  }

  async function resend() {
    if (cooldown > 0) return
    setError('')
    try {
      const r = await resendOtp(email)
      if (r.devOtp) setDevOtp(r.devOtp)
      setNotice('A new code has been sent to your email.')
      setCooldown(30)
      const t = setInterval(() => {
        setCooldown((c) => {
          if (c <= 1) {
            clearInterval(t)
            return 0
          }
          return c - 1
        })
      }, 1000)
    } catch (err) {
      setError(err.message || 'Could not resend the code.')
    }
  }

  function onOtp(i, v) {
    const d = v.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[i] = d
    setOtp(next)
    if (d && i < 5) otpRefs.current[i + 1]?.focus()
    if (!d && i > 0) otpRefs.current[i - 1]?.focus()
  }
  function onOtpKey(e, i) {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus()
  }

  return (
    <div>
      <div className="topbar">
        <span className="topbar-logo">
          <Icon name="lightning" size={17} />
        </span>
        <h1>SSC Quiz Prep</h1>
        <ThemeToggle />
      </div>

      <div className="page" style={{ paddingTop: 16 }}>
        <div className="hero" style={{ marginBottom: 20 }}>
          <span className="sheen" />
          <h2 style={{ fontSize: 26 }}>SSC Quiz Prep</h2>
          <p>
            {mode === 'otp'
              ? 'Enter the 6-digit code we emailed you.'
              : 'Sign in or create an account — your progress follows you.'}
          </p>
        </div>

      <div className="card" style={{ padding: 22 }}>
        {mode !== 'otp' ? (
          <>
            <div className="seg" style={{ marginBottom: 18 }}>
              <button
                className={mode === 'login' ? 'active' : ''}
                onClick={() => { setMode('login'); setError(''); setNotice('') }}
              >
                Login
              </button>
              <button
                className={mode === 'register' ? 'active' : ''}
                onClick={() => { setMode('register'); setError(''); setNotice('') }}
              >
                Create account
              </button>
            </div>

            <form onSubmit={submit}>
              {mode === 'register' && (
                <div className="field">
                  <label>Name</label>
                  <input
                    className="search"
                    style={{ marginBottom: 0 }}
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}

              <div className="field">
                <label>Email</label>
                <input
                  className="search"
                  style={{ marginBottom: 0 }}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  className="search"
                  style={{ marginBottom: 0 }}
                  type="password"
                  placeholder={mode === 'register' ? 'At least 6 characters' : 'Your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="explanation" style={{ background: 'var(--danger-light)', borderColor: 'var(--danger)', color: 'var(--text)' }}>
                  {error}
                </div>
              )}

              <button className="btn btn-primary btn-block" disabled={busy}>
                {busy ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create account & send code'}
              </button>
            </form>
          </>
        ) : (
          <form onSubmit={submitOtp}>
            <div className="small muted" style={{ textAlign: 'center', marginBottom: 4 }}>
              Enter the code sent to
            </div>
            <div style={{ textAlign: 'center', fontWeight: 800, marginBottom: 18 }}>{email}</div>

            <div className="otp-row">
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  className="otp-box"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => onOtp(i, e.target.value)}
                  onKeyDown={(e) => onOtpKey(e, i)}
                />
              ))}
            </div>

            {devOtp && (
              <div className="explanation" style={{ textAlign: 'center', background: 'var(--primary-light)', borderColor: 'var(--primary)' }}>
                <b>Dev server notice:</b> use code <b style={{ fontSize: 18, letterSpacing: 3 }}>{devOtp}</b>
              </div>
            )}

            {error && (
              <div className="explanation" style={{ background: 'var(--danger-light)', borderColor: 'var(--danger)', color: 'var(--text)' }}>
                {error}
              </div>
            )}

            <button className="btn btn-primary btn-block" disabled={busy}>
              {busy ? 'Verifying…' : 'Verify email'}
            </button>

            <div style={{ textAlign: 'center', marginTop: 14 }}>
              <button type="button" className="btn btn-outline" style={{ flex: 0, padding: '8px 16px' }} onClick={resend} disabled={cooldown > 0}>
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
              </button>
            </div>
            <div className="small muted" style={{ textAlign: 'center', marginTop: 10 }}>
              No email? Check your spam folder.
            </div>
          </form>
        )}

        {notice && (
          <div className="explanation" style={{ textAlign: 'center', background: 'var(--success-light)', borderColor: 'var(--success)' }}>
            {notice}
          </div>
        )}
      </div>

      <p className="small muted" style={{ textAlign: 'center', marginTop: 18 }}>
        <Icon name="lock" size={13} style={{ verticalAlign: -2 }} /> Your details
        are encrypted and never shared.
      </p>
      </div>
    </div>
  )
}