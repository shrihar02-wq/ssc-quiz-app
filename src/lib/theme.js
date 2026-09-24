// Theme: 'light' | 'dark' | 'system'. Persisted; falls back to system preference.

const KEY = 'ssc-quiz-theme'

const mql =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)')

const listeners = new Set()

export function choice() {
  try {
    return localStorage.getItem(KEY) || 'system'
  } catch {
    return 'system'
  }
}

export function resolved() {
  const c = choice()
  if (c === 'light' || c === 'dark') return c
  return mql && mql.matches ? 'dark' : 'light'
}

export function isDark() {
  return resolved() === 'dark'
}

export function setTheme(c) {
  try {
    localStorage.setItem(KEY, c)
  } catch {
    /* ignore */
  }
  apply()
  for (const fn of listeners) fn(c)
}

export function subscribeTheme(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function apply() {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', resolved())
}

if (mql) mql.addEventListener('change', apply)