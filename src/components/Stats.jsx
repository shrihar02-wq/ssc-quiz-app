import { useState } from 'react'
import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { SUBJECTS, categoryCount } from '../data/questions'
import { subscribeProgress, getProgress, resetProgress } from '../lib/store'

function useProgress() {
  return useSyncExternalStore(subscribeProgress, getProgress)
}

export default function Stats() {
  const p = useProgress()
  const [confirm, setConfirm] = useState(false)
  const accuracy = p.answered ? Math.round((p.correct / p.answered) * 100) : 0

  return (
    <div>
      <div className="topbar">
        <Link to="/" className="icon-btn">←</Link>
        <h1>Progress</h1>
      </div>

      <div className="page">
        <div className="section-title">Overview</div>
        <div className="stat-row">
          <div className="stat">
            <div className="num">{p.answered}</div>
            <div className="lbl">Answered</div>
          </div>
          <div className="stat">
            <div className="num">{accuracy}%</div>
            <div className="lbl">Accuracy</div>
          </div>
          <div className="stat">
            <div className="num">{p.streak.current}</div>
            <div className="lbl">Day streak</div>
          </div>
        </div>
        <div className="small muted" style={{ marginTop: 10 }}>
          Best streak: {p.streak.best} days · Practise at least one question a
          day to keep it alive. Tap any subject to practise it.
        </div>

        <div className="section-title">Subject-wise accuracy</div>
        {SUBJECTS.map((s) => {
          const st = p.subjectStats[s.id]
          const acc = st && st.practiced ? Math.round((st.correct / st.practiced) * 100) : null
          const total = categoryCount(s.id)
          const pra = st ? st.practiced : 0
          const mastered = st && st.correct >= total
          return (
            <Link
              key={s.id}
              to="/practice"
              state={{ subject: s.id }}
              className="subject-item"
            >
              <span
                className="ring"
                style={{ background: `conic-gradient(${s.color} ${Math.min(100, (pra / total) * 100)}%, var(--surface-2) 0)` }}
              >
                <span>{acc === null ? '—' : `${acc}%`}</span>
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="subj-name">{s.name}</div>
                <div className="subj-meta">
                  {st ? `${st.correct}/${st.practiced} correct` : 'Not practised yet'}
                  {mastered && ' · ✅ done'}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge bank">{total}</span>
                <div className="small muted" style={{ marginTop: 2 }}>Qs</div>
              </div>
              <div className="chevron">›</div>
            </Link>
          )
        })}

        <div className="section-title">Recent attempts</div>
        {p.attempts.length === 0 ? (
          <div className="empty">No attempts recorded yet.</div>
        ) : (
          p.attempts.slice(0, 10).map((a) => (
            <div className="attempt-item" key={a.id}>
              <div>
                <div className="t">{a.label}</div>
                <div className="s">
                  {new Date(a.ts).toLocaleString(undefined, {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              <span className={`pill ${a.score >= 60 ? 'good' : a.score >= 35 ? 'mid' : 'bad'}`}>
                {a.correct}/{a.total} · {a.score}%
              </span>
            </div>
          ))
        )}

        <button
          className="btn btn-outline btn-block"
          style={{ color: 'var(--danger)' }}
          onClick={() => setConfirm(true)}
        >
          Reset all progress
        </button>
      </div>

      {confirm && (
        <div className="modal-backdrop" onClick={() => setConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Reset progress?</h3>
            <p>This will permanently erase your stats and attempt history.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setConfirm(false)}>
                Cancel
              </button>
              <button
                className="btn"
                style={{ flex: 1, background: 'var(--danger)', color: '#fff' }}
                onClick={() => {
                  resetProgress()
                  setConfirm(false)
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}