const KEY = 'ssc-quiz-progress-v1'

import { api } from './api'
import { getAuth } from './auth'

const DEFAULT = {
  attempts: [], // recent quiz/mock attempts (score summaries)
  subjectStats: {}, // cat -> { practiced: n, correct: n }
  qStats: {}, // qid -> { practiced: n, correct: n }  (drives rotation)
  streak: { best: 0, current: 0, lastDay: null },
  answered: 0,
  correct: 0,
}

function now() {
  return Date.now()
}

function dayKey() {
  return new Date().toISOString().slice(0, 10)
}

function dayKeyOf(d) {
  return d.toISOString().slice(0, 10)
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULT, subjectStats: {}, attempts: [] }
    const data = JSON.parse(raw)
    return {
      ...DEFAULT,
      ...data,
      subjectStats: data.subjectStats || {},
      qStats: data.qStats || {},
      attempts: Array.isArray(data.attempts) ? data.attempts : [],
    }
  } catch {
    return { ...DEFAULT, subjectStats: {}, attempts: [] }
  }
}

function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // storage full or unavailable — ignore, app still works in-memory
  }
  pushRemote(state)
}

// Sync progress to the backend when logged in (throttled to every 5s).
let lastPush = 0
function pushRemote(state) {
  const auth = getAuth()
  if (!auth || !auth.token) return
  if (Date.now() - lastPush < 5000) return
  lastPush = Date.now()
  api('/api/progress', 'PUT', { progress: state }, auth.token).catch(() => {})
}

// Progress store with subscribe pattern so React can react to changes.
const listeners = new Set()
let state = load()

export function getProgress() {
  return state
}

export function subscribeProgress(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function emit() {
  for (const fn of listeners) fn(state)
}

// Record the result of one attempt (practice section or mock test).
export function recordAttempt(entry) {
  const attempt = {
    id: entry.id || `a_${now()}`,
    type: entry.type, // 'practice' | 'mock'
    label: entry.label,
    cat: entry.cat || null,
    score: entry.score,
    total: entry.total,
    correct: entry.correct,
    wrong: entry.wrong,
    skipped: entry.skipped,
    durationSec: entry.durationSec,
    ts: now(),
    day: dayKey(),
  }

  state.attempts = [attempt, ...state.attempts].slice(0, 100)
  state = { ...state, attempts: state.attempts }
  emit()
}

// Update counters per question answered (used in practice mode live tracking).
export function recordAnswer(cat, isCorrect, qid) {
  const st = state.subjectStats[cat] || { practiced: 0, correct: 0 }
  st.practiced += 1
  if (isCorrect) st.correct += 1
  state.subjectStats = { ...state.subjectStats, [cat]: st }

  if (qid) {
    const qs = state.qStats[qid] || { practiced: 0, correct: 0 }
    qs.practiced += 1
    if (isCorrect) qs.correct += 1
    state.qStats = { ...state.qStats, [qid]: qs }
  }

  state.answered += 1
  if (isCorrect) state.correct += 1

  const d = dayKey()
  if (state.streak.lastDay === d) {
    // same day, no change
  } else if (state.streak.lastDay === dayKeyOf(new Date(Date.now() - 86400000))) {
    state.streak.current += 1
  } else {
    state.streak.current = 1
  }
  state.streak.lastDay = d
  state.streak.best = Math.max(state.streak.best, state.streak.current)
  state = { ...state }
  emit()
}

export function resetProgress() {
  state = { ...DEFAULT, subjectStats: {}, attempts: [] }
  save(state)
  emit()
}

// Merge progress pulled from the backend into local state (called after login).
export function mergeRemoteProgress(remote) {
  if (!remote || typeof remote !== 'object') return state
  const ss = { ...(state.subjectStats || {}) }
  for (const [cat, st] of Object.entries(remote.subjectStats || {})) {
    const cur = ss[cat] || { practiced: 0, correct: 0 }
    ss[cat] = {
      practiced: Math.max(cur.practiced || 0, st.practiced || 0),
      correct: Math.max(cur.correct || 0, st.correct || 0),
    }
  }
  const qs = { ...(state.qStats || {}) }
  for (const [qid, st] of Object.entries(remote.qStats || {})) {
    const cur = qs[qid] || { practiced: 0, correct: 0 }
    qs[qid] = {
      practiced: Math.max(cur.practiced || 0, st.practiced || 0),
      correct: Math.max(cur.correct || 0, st.correct || 0),
    }
  }
  const attempts = [...(remote.attempts || []), ...(state.attempts || [])]
  const seen = new Set()
  const uniq = []
  for (const a of attempts) {
    if (a && a.id && !seen.has(a.id)) {
      seen.add(a.id)
      uniq.push(a)
    }
  }
  uniq.sort((a, b) => (b.ts || 0) - (a.ts || 0))

  state = {
    ...state,
    subjectStats: ss,
    qStats: qs,
    attempts: uniq.slice(0, 100),
    streak: {
      best: Math.max(state.streak?.best || 0, remote.streak?.best || 0),
      current: Math.max(state.streak?.current || 0, remote.streak?.current || 0),
      lastDay: state.streak?.lastDay || remote.streak?.lastDay || null,
    },
    answered: Object.values(ss).reduce((n, s) => n + (s.practiced || 0), 0),
    correct: Object.values(ss).reduce((n, s) => n + (s.correct || 0), 0),
  }
  save(state)
  emit()
  return state
}

// Persist on every change so offline reload keeps data.
setInterval(() => save(state), 1000)
window.addEventListener('beforeunload', () => save(state))