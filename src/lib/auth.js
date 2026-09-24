// Auth state: logged-in user + token. Persisted so the session survives
// app restarts. Every user must sign up and verify their email via OTP.

import { api } from './api'

const KEY = 'ssc-quiz-auth-v1'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || null
  } catch {
    return null
  }
}

const listeners = new Set()
let state = load() // { token, user } or null

export function getAuth() {
  return state
}

export function subscribeAuth(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function set(newState) {
  state = newState
  try {
    if (newState) localStorage.setItem(KEY, JSON.stringify(newState))
    else localStorage.removeItem(KEY)
  } catch {
    // storage unavailable — session lives in memory only
  }
  for (const fn of listeners) fn(state)
}

// Register: creates the account and sends a 6-digit OTP to the email.
// Does NOT log in yet — the app then shows the OTP screen.
export async function register(name, email, password) {
  return api('/api/auth/register', 'POST', { name, email, password })
}

// Verify the emailed code; on success the website returns a session token.
export async function verifyOtp(email, otp) {
  const data = await api('/api/auth/verify-otp', 'POST', { email, otp })
  set(data)
  return data.user
}

export async function resendOtp(email) {
  return api('/api/auth/resend-otp', 'POST', { email })
}

// Login. If the account isn't verified yet the server responds 403 with
// meta.needsOtp = true, and the login screen switches to the OTP step.
export async function login(email, password) {
  try {
    const data = await api('/api/auth/login', 'POST', { email, password })
    set(data)
    return { user: data.user }
  } catch (err) {
    if (err.meta?.needsOtp) {
      return { needsOtp: true, email, devOtp: err.meta.devOtp }
    }
    throw err
  }
}

export function logout() {
  set(null)
}

export async function refreshMe() {
  if (!state || !state.token) return null
  try {
    const data = await api('/api/me', 'GET', null, state.token)
    set({ ...state, user: data.user })
    return data.user
  } catch {
    return null
  }
}