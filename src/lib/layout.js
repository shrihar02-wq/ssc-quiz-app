import { useSyncExternalStore } from 'react'

// Tracks whether any modal/sheet overlay is currently open.
// The bottom navigation hides itself while an overlay is up so its
// buttons (e.g. "Start Practice") are never covered.
const listeners = new Set()
let open = false
let timer = null

export function setOverlay(isOpen) {
  // small delay so the overlay actually appears before the nav hides
  clearTimeout(timer)
  if (isOpen) {
    open = true
    notify()
  } else {
    timer = setTimeout(() => {
      open = false
      notify()
    }, 220)
  }
}

export function getOverlay() {
  return open
}

export function subscribeOverlay(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function notify() {
  for (const l of listeners) l()
}

export function useOverlay() {
  return useSyncExternalStore(subscribeOverlay, getOverlay)
}