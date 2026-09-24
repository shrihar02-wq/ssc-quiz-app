import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getSession,
  updateAnswer,
  remainingSec,
  isTimeUp,
  finishSession,
} from '../lib/session'
import { recordAttempt, recordAnswer } from '../lib/store'

function fmt(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function Quiz() {
  const navigate = useNavigate()
  const session = useMemo(() => getSession(), [])
  const [idx, setIdx] = useState(0)
  const [now, setNow] = useState(Date.now())

  const isMock = session?.type === 'mock'
  const showExpl = !!session?.showExpl

  useEffect(() => {
    if (!session) {
      navigate('/', { replace: true })
      return
    }
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [session, navigate])

  const rem = session ? remainingSec() : null
  const timeUp = isMock && rem !== null && rem <= 0

  // auto-submit when the clock hits zero
  useEffect(() => {
    if (timeUp) submit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeUp])

  if (!session) return null
  if (timeUp) return null // will navigate shortly

  const q = session.questions[idx]
  const answers = session.answers
  const chosen = answers[idx] ?? -1
  const answered = chosen !== -1
  const total = session.questions.length

  function choose(i) {
    if (isMock) {
      updateAnswer(idx, i)
      setNow(Date.now())
    } else {
      if (answered) return // practice locks answer once selected
      updateAnswer(idx, i)
      // record learning stats immediately
      recordAnswer(q.cat, i === q.answer, q.id)
      setNow(Date.now())
    }
  }

  function next() {
    if (idx < total - 1) setIdx(idx + 1)
    else submit()
  }

  function submit() {
    const result = finishSession()
    if (!result) return
    recordAttempt({
      type: result.type,
      label: result.label,
      cat: result.cat,
      score: result.score,
      total: result.total,
      correct: result.correct,
      wrong: result.wrong,
      skipped: result.skipped,
      durationSec: result.durationSec,
    })
    navigate('/results', { replace: true })
  }

  const answeredCount = answers.filter((a) => a !== -1).length

  return (
    <div>
      <div className="topbar">
        <Link to="/" className="icon-btn" style={{ fontSize: 18 }}>✕</Link>
        <h1 style={{ fontSize: 14 }}>{session.label}</h1>
      </div>

      <div className="page" style={{ paddingTop: 12 }}>
        <div className="quiz-head">
          <span className="small muted">
            Q {idx + 1}/{total} {answered ? '· answered' : ''}
          </span>
          {isMock ? (
            <span className={`timer ${rem !== null && rem < 60 ? 'warn' : ''}`}>
              ⏱ {rem !== null ? fmt(rem) : '--:--'}
            </span>
          ) : (
            <span className="small muted">{answeredCount} done</span>
          )}
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${((idx + 1) / total) * 100}%` }}
          />
        </div>

        <div className="card">
          <div className="question-text">{q.text}</div>
          {q.options.map((opt, i) => {
            const isSelected = chosen === i
            const revealCorrect = !isMock && answered && showExpl
            const cls = [
              'option',
              isSelected ? 'selected' : '',
              revealCorrect && i === q.answer ? 'correct' : '',
              revealCorrect && isSelected && i !== q.answer ? 'wrong' : '',
            ]
              .filter(Boolean)
              .join(' ')
            return (
              <button
                key={i}
                className={cls}
                onClick={() => choose(i)}
                disabled={!isMock && answered}
              >
                <span className="opt-key">{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
                {revealCorrect && i === q.answer ? ' ✓' : ''}
                {revealCorrect && isSelected && i !== q.answer ? ' ✗' : ''}
              </button>
            )
          })}

          {!isMock && answered && showExpl && (
            <div className="explanation">
              <b>{chosen === q.answer ? '✅ Correct! ' : `❌ Correct answer: ${String.fromCharCode(65 + q.answer)} — `}</b>
              {q.explanation}
            </div>
          )}

          {isMock && (
            <div className="quiz-nav">
              <button
                className="btn btn-outline"
                disabled={idx === 0}
                onClick={() => setIdx(idx - 1)}
              >
                ← Prev
              </button>
              <button className="btn btn-outline" onClick={() => submit()}>
                Submit
              </button>
              <button className="btn btn-primary" onClick={next}>
                {idx === total - 1 ? 'Finish' : 'Next →'}
              </button>
            </div>
          )}

          {!isMock && (
            <div className="quiz-nav">
              {idx > 0 && (
                <button className="btn btn-outline" onClick={() => setIdx(idx - 1)}>
                  ← Prev
                </button>
              )}
              <button className="btn btn-primary" onClick={next}>
                {idx === total - 1 ? 'Finish' : 'Next →'}
              </button>
            </div>
          )}
        </div>

        {isMock && (
          <div className="section-title">Question palette</div>
        )}
        {isMock && (
          <div className="chip-row" style={{ marginBottom: 20 }}>
            {session.questions.map((_, i) => (
              <button
                key={i}
                className="chip"
                style={{
                  background: i === idx ? 'var(--primary)' : 'var(--surface)',
                  color: i === idx ? '#fff' : 'var(--text)',
                  borderColor:
                    i === idx ? 'var(--primary)' : answers[i] !== -1 ? 'var(--success)' : 'var(--border)',
                }}
                onClick={() => setIdx(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}