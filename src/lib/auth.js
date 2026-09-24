// Auth state: logged-in user + token. Persisted so the session survives
// app restarts. Works alongside the offline progress store.

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

export async function register(name, email, password) {
  const data = await api('/api/auth/register', 'POST', { name, email, password })
  set(data)
  return data.user
}

export async function login(email, password) {
  const data = await api('/api/auth/login', 'POST', { email, password })
  set(data)
  return data.user
}

export function logout() {
  set(null)
}

// Let users use the app without an account (offline / guest mode).
export function continueOffline() {
  set({ offline: true })
}

export function isOnline() {
  return !!state && !!state.token
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