import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getLastResult, clearSession } from '../lib/session'
import { CATEGORY } from '../data/questions'
import { Icon, SUBJECT_ICONS } from '../lib/icons'

const CONF = Array.from({ length: 42 }, (_, i) => ({
  left: Math.random() * 100,
  delay: Math.random() * 0.9,
  dur: 2.4 + Math.random() * 2,
  size: 6 + Math.random() * 7,
  color: ['#f472b6', '#818cf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa'][i % 6],
}))

export default function Results() {
  const navigate = useNavigate()
  const result = useMemo(() => getLastResult(), [])
  const [party] = useState(result && result.score >= 60)

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

  const cls = result.score >= 60 ? 'good' : result.score >= 35 ? 'mid' : 'bad'
  const color = result.score >= 60 ? 'var(--success)' : result.score >= 35 ? 'var(--warn)' : 'var(--danger)'
  const verb =
    result.score >= 60
      ? 'Great job, keep it up!'
      : result.score >= 35
      ? 'Good effort — review and retry.'
      : 'Needs work — practice more of this topic.'
  const head =
    result.score >= 60 ? 'Passed!' : result.score >= 35 ? 'Almost there' : 'Keep practising'

  return (
    <div>
      <div className="topbar">
        <h1>Result</h1>
        <button className="btn btn-outline" onClick={() => navigate('/')}>
          Close
        </button>
      </div>

      {party && (
        <div className="confetti" aria-hidden>
          {CONF.map((c, i) => (
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
        </div>
      )}

      <div className="page">
        <div className="card">
          <div className="result-score">
            <div className={`score-ring ${cls}`} style={{ background: `conic-gradient(${color} ${result.score * 3.6}deg, var(--surface-2) 0deg)` }}>
              <span className={`big ${cls}`}>{result.score}%</span>
            </div>
            <p>
              {head}{result.score >= 60 ? ' 🎉' : ''} · {verb}
            </p>
          </div>

          <div className="metric-grid">
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