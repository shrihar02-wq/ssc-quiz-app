import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getLastResult, clearSession } from '../lib/session'
import { CATEGORY } from '../data/questions'
import { Icon, SUBJECT_ICONS } from '../lib/icons'
import { useCountUp } from '../lib/anim'

const PASS_MARK = 60

function particleArray(n, gen) {
  return Array.from({ length: n }, (_, i) => gen(i))
}

export default function Results() {
  const navigate = useNavigate()
  const result = useMemo(() => getLastResult(), [])
  const passed = !!result && result.score >= PASS_MARK

  const confetti = useMemo(
    () =>
      passed &&
      particleArray(70, (i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 1.1,
        dur: 2.6 + Math.random() * 2.4,
        size: 6 + Math.random() * 8,
        rot: Math.random() * 200,
        color: ['#f472b6', '#818cf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#e879f9'][i % 7],
      })),
    [passed]
  )

  const drizzle = useMemo(
    () =>
      !passed &&
      particleArray(34, (i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 2.4,
        dur: 3.2 + Math.random() * 2.2,
        size: 2 + Math.random() * 2,
        sway: 10 + Math.random() * 30,
      })),
    [passed]
  )

  const sparks = useMemo(
    () =>
      passed &&
      particleArray(10, (i) => ({
        left: 5 + Math.random() * 90,
        top: 18 + Math.random() * 45,
        delay: Math.random() * 3,
        dur: 3 + Math.random() * 2.5,
        emoji: ['✨', '⭐', '🎉', '💫', '🌟', '🔥'][i % 6],
      })),
    [passed]
  )

  const anim = useCountUp(result?.score || 0, 1500)

  if (!result) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: 60 }}>
        <p>No results available.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
          Back to Home
        </Link>
      </div>
    )
  }

  const score = result.score
  const gap = Math.max(0, PASS_MARK - score)
  const above = Math.max(0, score - PASS_MARK)
  const verdictColor = passed ? 'var(--success)' : 'var(--danger)'

  return (
    <div>
      <div className="topbar">
        <h1>Result</h1>
        <button className="btn btn-outline" onClick={() => navigate('/')}>
          Close
        </button>
      </div>

      {confetti && (
        <div className="confetti" aria-hidden>
          {confetti.map((c, i) => (
            <span
              key={i}
              style={{
                left: `${c.left}%`,
                width: c.size,
                height: c.size * 0.45,
                background: c.color,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.dur}s`,
              }}
            />
          ))}
          <span className="burst" />
        </div>
      )}

      {drizzle && (
        <div className="drizzle" aria-hidden>
          {drizzle.map((c, i) => (
            <span
              key={i}
              style={{
                left: `${c.left}%`,
                width: c.size,
                height: c.size * 5,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.dur}s`,
                '--sway': `${c.sway}px`,
              }}
            />
          ))}
        </div>
      )}

      <div className="page">
        <div className={'verdict-hero ' + (passed ? 'pass' : 'fail')}>
          <div className="aura">
            <span className="aura-orb" />
            {sparks &&
              sparks.map((s, i) => (
                <span
                  key={`s${i}`}
                  className="spark"
                  style={{
                    left: `${s.left}%`,
                    top: `${s.top}%`,
                    animationDelay: `${s.delay}s`,
                    animationDuration: `${s.dur}s`,
                  }}
                >
                  {s.emoji}
                </span>
              ))}
          </div>

          <div className="verdict-mascot pop">{passed ? '🏆' : '😅'}</div>

          <div className={'verdict-badge ' + (passed ? 'pass' : 'fail')}>
            <span className="vb-text">
              <Icon name={passed ? 'trophy' : 'target'} size={18} />
              {passed ? 'PASSED' : 'BELOW PASS MARK'}
            </span>
            <span className="vb-sheen" />
          </div>

          <div
            className="score-hero-ring"
            style={{ '--ring': `${anim * 3.6}deg`, '--tick-rot': `${PASS_MARK * 3.6}deg` }}
          >
            <span className="rays" />
            <div className="ring-glow" style={{ '--glow': verdictColor }} />
            <span className="ring-tick" style={{ '--tick-color': 'var(--success)' }} />
            {!passed && (
              <span
                className="ring-tick r-you"
                style={{ '--tick-rot': `${score * 3.6}deg`, '--tick-color': 'var(--danger)' }}
              />
            )}
            <div className="score-hero-inner">
              <span className={`hero-score ${passed ? 'good' : 'bad'}`}>{anim}%</span>
              <span className="hero-label">SCORE</span>
            </div>
          </div>

          <p className={`verdict-title ${passed ? 'pass' : ''}`}>
            <span className="vt-shimmer">{passed ? 'Absolutely crushing it! 🎉' : 'Tough one — don’t give up! 💪'}</span>
          </p>
          <p className="verdict-sub">
            {passed
              ? `You beat the ${PASS_MARK}% pass mark by ${above}% points. Brilliant work — keep the streak going!`
              : `You need ${gap}% more to cross the ${PASS_MARK}% pass mark. Review your answers and try again — you’ve got this!`}
          </p>

          <div className="metric-grid stagger">
            <div className="stat">
              <div className="num" style={{ color: 'var(--success)' }}>{result.correct}</div>
              <div className="lbl">Correct</div>
            </div>
            <div className="stat">
              <div className="num" style={{ color: 'var(--danger)' }}>{result.wrong}</div>
              <div className="lbl">Wrong</div>
            </div>
            <div className="stat">
              <div className="num" style={{ color: 'var(--text-muted)' }}>{result.skipped}</div>
              <div className="lbl">Skipped</div>
            </div>
          </div>

          <div className="small muted" style={{ textAlign: 'center' }}>
            {result.label} · {Math.floor(result.durationSec / 60)}m {result.durationSec % 60}s · {result.total} Qs
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <Link to="/" className="btn btn-outline" style={{ flex: 1 }}>
              Home
            </Link>
            {result.cat ? (
              <Link to="/practice" className="btn btn-outline" style={{ flex: 1 }}>
                Retry topic
              </Link>
            ) : (
              <Link to="/mock" className="btn btn-outline" style={{ flex: 1 }}>
                New mock
              </Link>
            )}
          </div>
        </div>

        <div className="section-title">Review all questions</div>
        {result.reviewed.map((r, i) => (
          <div className="review-item" key={r.id}>
            <div className="q">
              {i + 1}. {r.text}
            </div>
            <div className="ans">
              {r.chosen === -1 ? (
                <span style={{ color: 'var(--text-muted)' }}>
                  Skipped · Correct: {String.fromCharCode(65 + r.answer)}
                </span>
              ) : r.isCorrect ? (
                <span style={{ color: 'var(--success)' }}>
                  <Icon name="check" size={13} style={{ verticalAlign: -2 }} /> Your answer {String.fromCharCode(65 + r.chosen)} is correct
                </span>
              ) : (
                <span style={{ color: 'var(--danger)' }}>
                  <Icon name="x" size={13} style={{ verticalAlign: -2 }} /> You chose {String.fromCharCode(65 + r.chosen)} · Correct: {String.fromCharCode(65 + r.answer)}
                </span>
              )}
            </div>
            {r.cat && CATEGORY[r.cat] && (
              <div className="small muted" style={{ marginTop: 4 }}>
                <Icon name={SUBJECT_ICONS[r.cat] || 'bank'} size={12} style={{ verticalAlign: -2 }} /> {CATEGORY[r.cat].name}
              </div>
            )}
            {r.explanation && <div className="small" style={{ marginTop: 4, color: 'var(--text-muted)' }}>{r.explanation}</div>}
          </div>
        ))}

        <button
          className="btn btn-outline btn-block"
          style={{ marginTop: 8 }}
          onClick={() => {
            clearSession()
            navigate('/')
          }}
        >
          Done
        </button>
      </div>
    </div>
  )
}