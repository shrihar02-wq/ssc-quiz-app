// Tracks total active (foreground) time spent in the app, in seconds.
// Survives reloads via localStorage, pauses while the app/tab is hidden,
// and stays accurate on native Android via Capacitor's pause/resume events.
import { Capacitor } from '@capacitor/core'
import { App } from '@capacitor/app'

const KEY = 'ssc-usage-v1'

const listeners = new Set()

export function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { seconds: 0, totals: {}, lastTs: Date.now() }
    const d = JSON.parse(raw)
    return {
      seconds: Number(d.seconds) || 0,
      totals: d.totals || {},
      lastTs: Number(d.lastTs) || Date.now(),
    }
  } catch {
    return { seconds: 0, totals: {}, lastTs: Date.now() }
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    /* storage unavailable — ignore */
  }
}

export function getUsage() {
  return data
}

export function subscribeUsage(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function emit() {
  for (const fn of listeners) fn(data)
}

let data = load()
let suspended = document.visibilityState === 'hidden'
let lastTs = Date.now()

function roll(deltaSec) {
  if (deltaSec <= 0) return
  const today = todayKey()
  data = {
    ...data,
    seconds: (data.seconds || 0) + deltaSec,
    totals: { ...(data.totals || {}), [today]: (data.totals?.[today] || 0) + deltaSec },
  }
}

function tick() {
  const now = Date.now()
  const el = Math.min(3, Math.max(0, (now - lastTs) / 1000))
  lastTs = now
  if (!suspended) {
    roll(el)
    save()
    emit()
  }
}

if (Capacitor.isNativePlatform()) {
  App.addListener('pause', () => {
    tick()
    suspended = true
  })
  App.addListener('resume', () => {
    suspended = false
    lastTs = Date.now()
  })
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    tick()
    suspended = true
  } else {
    suspended = false
    lastTs = Date.now()
  }
})

// Start the clock as soon as the app loads.
setInterval(tick, 1000)
window.addEventListener('beforeunload', save)