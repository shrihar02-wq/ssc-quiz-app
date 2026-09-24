import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { SUBJECTS, totalQuestions, categoryCount } from '../data/questions'
import { subscribeProgress, getProgress } from '../lib/store'
import { getAuth } from '../lib/auth'
import UserChip from './UserChip'

function useProgress() {
  return useSyncExternalStore(subscribeProgress, getProgress)
}

const fmt = (n) => n.toLocaleString('en-IN')

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Home() {
  const p = useProgress()
  const auth = getAuth()
  const name = auth && auth.user ? auth.user.name.split(' ')[0] : null
  const accuracy = p.answered ? Math.round((p.correct / p.answered) * 100) : 0
  const totalQs = totalQuestions()

  return (
    <div>
      <div className="topbar">
        <span className="topbar-logo">🎓</span>
        <h1>SSC Quiz Prep</h1>
        <UserChip />
      </div>

      <div className="page">
        <div className="hero">
          <span className="sheen" />
          <h2>{greeting()}, {name || 'Aspirant'} 👋</h2>
          <p>SSC CGL · CHSL · MTS · GD — practice anywhere, on any device.</p>
          <div className="hero-chips">
            <span className="hero-chip">📚 {fmt(totalQs)} questions</span>
            <span className="hero-chip">🔥 {p.streak.current}-day streak</span>
          </div>
        </div>

        <div className="home-actions">
          <Link to="/practice" className="action-tile">
            <span className="icon-bubble tile-blue">📝</span>
            <strong>Practice</strong>
            <span className="tile-sub">Topic-wise warm-ups</span>
          </Link>
          <Link to="/mock" className="action-tile">
            <span className="icon-bubble tile-violet">⏱️</span>
            <strong>Mock Test</strong>
            <span className="tile-sub">Timed full-paper test</span>
          </Link>
          <Link to="/stats" className="action-tile">
            <span className="icon-bubble tile-green">📈</span>
            <strong>Progress</strong>
            <span className="tile-sub">Your performance</span>
          </Link>
          <Link to="/practice" className="action-tile">
            <span className="icon-bubble tile-amber">📚</span>
            <strong>Question Bank</strong>
            <span className="tile-sub">{fmt(totalQs)} questions in the bank</span>
          </Link>
        </div>

        <div className="section-title">Your stats</div>
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

        <div className="section-title">Subjects ({SUBJECTS.length})</div>
        <div className="subject-grid">
          {SUBJECTS.map((s) => (
            <SubjectCard key={s.id} s={s} />
          ))}
        </div>

        <div className="section-title">Latest attempts</div>
        {p.attempts.length === 0 ? (
          <div className="empty">
            No attempts yet. Start a practice session or a mock test to begin!
          </div>
        ) : (
          p.attempts.slice(0, 5).map((a) => (
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
      </div>
    </div>
  )
}

function SubjectCard({ s }) {
  const p = getProgress()
  const st = p.subjectStats[s.id]
  const total = categoryCount(s.id)
  const pra = st ? st.practiced : 0
  const acc = st && st.practiced ? Math.round((st.correct / st.practiced) * 100) : null
  const done = st && st.correct >= total
  return (
    <Link to="/practice" state={{ subject: s.id }} className="subject-card">
      <span className="ring subj-cheek" style={{ background: `conic-gradient(${s.color} ${Math.min(100, (pra / total) * 100)}%, var(--surface-2) 0)` }}>
        <span>{pra > 0 ? `${acc}%` : '0'}</span>
      </span>
      <span className="subj-emoji" style={{ background: `${s.color}1a` }}>
        {s.emoji}
      </span>
      <div className="subj-name">{s.name}</div>
      <div className="subj-meta">
        {fmt(total)} questions{st ? ` · ${st.correct}/${st.practiced} correct` : ''}
      </div>
      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className={`badge ${done ? 'done' : 'bank'}`}>{done ? '✓ Done' : 'Practice'}</span>
        <span className="small muted">›</span>
      </div>
    </Link>
  )
}