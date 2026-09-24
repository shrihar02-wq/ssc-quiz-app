import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register, continueOffline, getAuth } from '../lib/auth'
import { api } from '../lib/api'
import { mergeRemoteProgress } from '../lib/store'

export default function LoginScreen() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

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
      if (mode === 'login') await login(email, password)
      else await register(name, email, password)
      // pull cloud progress and merge into local stats
      try {
        const data = await api('/api/progress', 'GET', null, getAuth()?.token)
        mergeRemoteProgress(data.progress || {})
      } catch {
        // server unreachable for progress — keep local, sync later
      }
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  async function goOffline() {
    continueOffline()
    navigate('/', { replace: true })
  }

  return (
    <div className="page" style={{ paddingTop: 48 }}>
      <div className="hero" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 26 }}>SSC Quiz Prep</h2>
        <p>Sign in to save your progress online and keep it on any device.</p>
      </div>

      <div className="card" style={{ padding: 22 }}>
        <div className="seg" style={{ marginBottom: 18 }}>
          <button className={mode === 'login' ? 'active' : ''} onClick={() => { setMode('login'); setError('') }}>
            Login
          </button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setError('') }}>
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
            {busy ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>

        <button
          className="btn btn-outline btn-block"
          style={{ marginTop: 10 }}
          onClick={goOffline}
        >
          Continue without account (offline)
        </button>
      </div>

      <p className="small muted" style={{ textAlign: 'center', marginTop: 18 }}>
        Offline mode keeps everything on this device only.
      </p>
    </div>
  )
}