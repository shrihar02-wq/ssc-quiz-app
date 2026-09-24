// Deterministic seeded PRNG + helpers. The bank regenerates with a fresh seed
// each day, so the question mix rotates daily; every attempt also shuffles.
export function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function randInt(r, min, max) {
  return Math.floor(r() * (max - min + 1)) + min
}

export function pick(r, arr) {
  return arr[Math.floor(r() * arr.length)]
}

export function shuffle(r, arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function sample(r, arr, n, max) {
  return shuffle(r, arr).slice(0, Math.min(n, max, arr.length))
}

// Build a question object. `options` already contains the correct answer at
// index `correctIndex`; this shuffles options and reports the new answer index.
export function q(r, { cat, text, options, correctIndex: ci, explanation }) {
  if (!Array.isArray(options) || options.length < 2) return null
  const keyed = options.map((o, i) => ({ o, i }))
  const mixed = shuffle(r, keyed)
  return {
    cat,
    text,
    options: mixed.map((m) => m.o),
    answer: mixed.findIndex((m) => m.i === ci),
    explanation,
  }
}

// Insert distractors around the correct value.
export function distract(r, correct, fmt, bump) {
  const set = new Set([correct])
  let guard = 0
  while (set.size < 4 && guard < 60) {
    guard++
    const delta = bump(r)
    const cand = correct + delta
    if (cand >= 0 && !set.has(cand)) set.add(cand)
  }
  const opts = [...set]
  const ci = opts.indexOf(correct)
  return { options: opts.map(fmt), correctIndex: ci }
}

export const num = String