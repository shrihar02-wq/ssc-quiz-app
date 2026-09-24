// Holds the currently-active quiz session so the app survives a page refresh
// mid-quiz (offline friendly). Stored in sessionStorage.
const KEY = 'ssc-active-session-v1'

let current = load()

function load() {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function save() {
  try {
    if (current) sessionStorage.setItem(KEY, JSON.stringify(current))
    else sessionStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}

export function newSession({ type, label, cat, questions, durationSec, showExpl }) {
  current = {
    id: Date.now().toString(36),
    type,
    label,
    cat: cat || null,
    questions: questions.map((q) => ({
      id: q.id,
      cat: q.cat,
      text: q.text,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation,
    })),
    durationSec: durationSec || 0,
    showExpl: !!showExpl,
    answers: [], // per-question chosen index, -1 = skipped
    startTs: Date.now(),
  }
  save()
  return current.id
}

export function getSession() {
  return current
}

export function updateAnswer(index, choice) {
  if (!current) return
  while (current.answers.length < current.questions.length) current.answers.push(-1)
  current.answers[index] = choice
  current = { ...current }
  save()
}

export function elapsedSec() {
  if (!current) return 0
  return Math.round((Date.now() - current.startTs) / 1000)
}

export function remainingSec() {
  if (!current || !current.durationSec) return null
  return Math.max(0, current.durationSec - elapsedSec())
}

export function isTimeUp() {
  const r = remainingSec()
  return r !== null && r <= 0
}

export function clearSession() {
  current = null
  save()
}

export function finishSession() {
  if (!current) return null
  while (current.answers.length < current.questions.length) current.answers.push(-1)
  let correct = 0
  const reviewed = current.questions.map((q, i) => {
    const chosen = current.answers[i]
    const isCorrect = chosen === q.answer
    if (isCorrect) correct += 1
    return {
      id: q.id,
      cat: q.cat,
      text: q.text,
      options: q.options,
      answer: q.answer,
      chosen,
      isCorrect,
      questionAnswered: chosen !== -1,
      explanation: q.explanation,
    }
  })
  const total = current.questions.length
  const right = correct
  const wrong = reviewed.filter((r) => r.chosen !== -1 && !r.isCorrect).length
  const skipped = total - right - wrong
  const score = total ? Math.round((right / total) * 100) : 0
  const result = {
    sessionId: current.id,
    type: current.type,
    label: current.label,
    cat: current.cat,
    score,
    total,
    correct: right,
    wrong,
    skipped,
    durationSec: elapsedSec(),
    reviewed,
    ts: Date.now(),
  }
  try {
    sessionStorage.setItem('ssc-last-result', JSON.stringify(result))
  } catch {
    /* ignore */
  }
  return result
}

export function getLastResult() {
  try {
    const raw = sessionStorage.getItem('ssc-last-result')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}