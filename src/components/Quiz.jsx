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
import { Icon } from '../lib/icons'

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
  const [anim, setAnim] = useState('in')

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
      recordAnswer(q.cat, i === q.answer, q.id)
      setNow(Date.now())
    }
  }

  function goTo(i) {
    setAnim('out')
    setTimeout(() => {
      setIdx(i)
      setAnim('in')
    }, 150)
  }

  function next() {
    if (idx < total - 1) goTo(idx + 1)
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
  const revealCorrect = !isMock && answered && showExpl
  // timer ring math
  const ringR = 14
  const ringC = 2 * Math.PI * ringR
  const frac = isMock && rem !== null ? rem / (session.durationSec || 1) : 1
  const ringOff = ringC * (1 - Math.min(1, Math.max(0, frac)))
  const timerCls = isMock && rem !== null && rem < 60 ? 'warn' : ''

  return (
    <div>
      <div className="topbar">
        <Link to="/" className="icon-btn" style={{ fontSize: 18 }}>
          <Icon name="close" size={16} />
        </Link>
        <h1 style={{ fontSize: 14 }}>{session.label}</h1>
        {isMock && (
          <span className={`timer ${timerCls}`}>
            <svg width="26" height="26" viewBox="0 0 32 32" className="timer-ring">
              <circle cx="16" cy="16" r={ringR} fill="none" stroke="var(--surface-3)" strokeWidth="3" />
              <circle
                cx="16"
                cy="16"
                r={ringR}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={ringC}
                strokeDashoffset={ringOff}
                transform="rotate(-90 16 16)"
              />
            </svg>
            {rem !== null ? fmt(rem) : '--:--'}
          </span>
        )}
      </div>

      <div className="page" style={{ paddingTop: 12 }}>
        <div className="quiz-head">
          <span className="small muted">
            Q {idx + 1}/{total} {answered ? '· answered' : ''}
          </span>
          {!isMock && (
            <span className="done-chip">
              <Icon name="check" size={12} /> {answeredCount} done
            </span>
          )}
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${((idx + 1) / total) * 100}%` }}
          />
        </div>

        <div className={`card quiz-card ${anim}`} key={`${idx}-${anim}`}>
          <div className="question-text">{q.text}</div>
          {q.options.map((opt, i) => {
            const isSelected = chosen === i
            const lastChosen = answered && chosen === i
            const isRight = revealCorrect && i === q.answer
            const isWrong = revealCorrect && lastChosen && i !== q.answer
            const cls = [
              'option',
              isSelected ? 'selected' : '',
              isRight ? 'correct pop-in' : '',
              isWrong ? 'wrong shake' : '',
              !isMock && !answered ? '' : !isMock ? 'locked' : '',
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
                {isRight && (
                  <span className="opt-status ok">
                    <Icon name="check" size={15} />
                  </span>
                )}
                {isWrong && (
                  <span className="opt-status no">
                    <Icon name="x" size={15} />
                  </span>
                )}
              </button>
            )
          })}

          {!isMock && answered && showExpl && (
            <div className={`explanation ${chosen === q.answer ? 'good' : 'bad'}`}>
              <span className="expl-ico">
                <Icon name={chosen === q.answer ? 'check' : 'x'} size={16} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <b>
                  {chosen === q.answer
                    ? 'Correct!'
                    : `Correct answer: ${String.fromCharCode(65 + q.answer)}`}
                </b>
                <div>{q.explanation}</div>
              </div>
            </div>
          )}

          {isMock && (
            <div className="quiz-nav">
              <button
                className="btn btn-outline"
                disabled={idx === 0}
                onClick={() => goTo(idx - 1)}
              >
                <Icon name="back" size={15} /> Prev
              </button>
              <button className="btn btn-outline" onClick={() => submit()}>
                Submit
              </button>
              <button className="btn btn-primary" onClick={next}>
                {idx === total - 1 ? 'Finish' : 'Next'} <Icon name="chevron" size={15} />
              </button>
            </div>
          )}

          {!isMock && (
            <div className="quiz-nav">
              {idx > 0 && (
                <button className="btn btn-outline" onClick={() => goTo(idx - 1)}>
                  <Icon name="back" size={15} /> Prev
                </button>
              )}
              <button className="btn btn-primary" onClick={next}>
                {idx === total - 1 ? 'Finish' : 'Next'} <Icon name="chevron" size={15} />
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
                onClick={() => goTo(i)}
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