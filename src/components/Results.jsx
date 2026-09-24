import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getLastResult, clearSession } from '../lib/session'
import { CATEGORY } from '../data/questions'

export default function Results() {
  const navigate = useNavigate()
  const result = useMemo(() => getLastResult(), [])

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
  const verb =
    result.score >= 60
      ? 'Great job, keep it up!'
      : result.score >= 35
      ? 'Good effort — review and retry.'
      : 'Needs work — practice more of this topic.'

  return (
    <div>
      <div className="topbar">
        <h1>Result</h1>
        <button className="btn btn-outline" onClick={() => navigate('/')}>
          Close
        </button>
      </div>

      <div className="page">
        <div className="card">
          <div className="result-score">
            <div className={`big ${cls}`}>{result.score}%</div>
            <p>
              {result.score >= 60 ? 'Passed 🎉' : result.score >= 35 ? 'Almost there' : 'Keep practising'} · {verb}
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
                <span style={{ color: 'var(--text-muted)' }}>Skipped · Correct: {String.fromCharCode(65 + r.answer)}</span>
              ) : r.isCorrect ? (
                <span style={{ color: 'var(--success)' }}>✓ Your answer {String.fromCharCode(65 + r.chosen)} is correct</span>
              ) : (
                <span style={{ color: 'var(--danger)' }}>
                  ✗ You chose {String.fromCharCode(65 + r.chosen)} · Correct: {String.fromCharCode(65 + r.answer)}
                </span>
              )}
            </div>
            {r.cat && CATEGORY[r.cat] && (
              <div className="small muted" style={{ marginTop: 4 }}>
                {CATEGORY[r.cat].emoji} {CATEGORY[r.cat].name}
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