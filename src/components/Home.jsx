import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { SUBJECTS, totalQuestions, categoryCount } from '../data/questions'
import { subscribeProgress, getProgress } from '../lib/store'
import { getAuth, useAuth } from '../lib/auth'
import UserChip from './UserChip'
import ThemeToggle from './ThemeToggle'
import { Icon, SUBJECT_ICONS } from '../lib/icons'

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
  const auth = useAuth()
  const name = auth && auth.user ? auth.user.name.split(' ')[0] : null
  const accuracy = p.answered ? Math.round((p.correct / p.answered) * 100) : 0
  const totalQs = totalQuestions()

  return (
    <div>
      <div className="topbar">
        <span className="topbar-logo">
          <Icon name="lightning" size={17} />
        </span>
        <h1>SSC Quiz Prep <span className="ver-badge">v2</span></h1>
        <ThemeToggle />
        <UserChip />
      </div>

      <div className="page">
        <div className="hero">
          <span className="sheen" />
          <span className="hero-glint" />
          <span className="hero-logo">
            <span className="hero-logo-sheen" />
            <Icon name="lightning" size={26} />
          </span>
          <h2>{greeting()}, {name || 'Aspirant'} 👋</h2>
          <p>SSC CGL · CHSL · MTS · GD — practice anywhere, on any device.</p>
          <div className="hero-chips">
            <span className="hero-chip">
              <Icon name="bank" size={14} /> {fmt(totalQs)} questions
            </span>
            <span className="hero-chip">
              <Icon name="fire" size={14} /> {p.streak.current}-day streak
            </span>
          </div>
        </div>

        <div className="home-actions">
          <Link to="/practice" className="action-tile">
            <span className="icon-bubble tile-blue">
              <Icon name="practice" size={22} style={{ color: 'var(--primary-dark)' }} />
            </span>
            <strong>Practice</strong>
            <span className="tile-sub">Topic-wise warm-ups</span>
          </Link>
          <Link to="/mock" className="action-tile">
            <span className="icon-bubble tile-violet">
              <Icon name="clock" size={22} style={{ color: 'var(--violet)' }} />
            </span>
            <strong>Mock Test</strong>
            <span className="tile-sub">Timed full-paper test</span>
          </Link>
          <Link to="/stats" className="action-tile">
            <span className="icon-bubble tile-green">
              <Icon name="stats" size={22} style={{ color: 'var(--success)' }} />
            </span>
            <strong>Progress</strong>
            <span className="tile-sub">Your performance</span>
          </Link>
          <Link to="/practice" className="action-tile">
            <span className="icon-bubble tile-amber">
              <Icon name="bank" size={22} style={{ color: 'var(--warn)' }} />
            </span>
            <strong>Question Bank</strong>
            <span className="tile-sub">{fmt(totalQs)} questions in the bank</span>
          </Link>
        </div>

        <div className="section-title">Your stats</div>
        <div className="stat-row four">
          <div className="stat">
            <span className="stat-ico" style={{ color: 'var(--primary)', background: 'rgba(79,70,229,.14)' }}>
              <Icon name="stats" size={16} />
            </span>
            <div className="num" style={{ color: 'var(--primary)' }}>{p.attempts.length}</div>
            <div className="lbl">Attempts</div>
          </div>
          <div className="stat">
            <span className="stat-ico" style={{ color: 'var(--violet)', background: 'rgba(168,85,247,.14)' }}>
              <Icon name="trendup" size={16} />
            </span>
            <div className="num" style={{ color: 'var(--violet)' }}>{p.answered}</div>
            <div className="lbl">Answered</div>
          </div>
          <div className="stat">
            <span className="stat-ico" style={{ color: 'var(--warn)', background: 'rgba(245,158,11,.14)' }}>
              <Icon name="target" size={16} />
            </span>
            <div className="num" style={{ color: 'var(--warn)' }}>{accuracy}%</div>
            <div className="lbl">Accuracy</div>
          </div>
          <div className="stat">
            <span className="stat-ico" style={{ color: 'var(--success)', background: 'rgba(34,197,94,.14)' }}>
              <Icon name="fire" size={16} />
            </span>
            <div className="num" style={{ color: 'var(--success)' }}>{p.streak.current}</div>
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
            <span className="empty-ico">
              <Icon name="pencil" size={26} />
            </span>
            <div>No attempts yet</div>
            <div className="small muted" style={{ marginTop: 4 }}>
              Take a practice session or a mock test to begin!
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <Link to="/practice" className="btn">
                <Icon name="practice" size={14} /> Practice
              </Link>
              <Link to="/mock" className="btn btn-outline">
                <Icon name="clock" size={14} /> Mock test
              </Link>
            </div>
          </div>
        ) : (
          p.attempts.slice(0, 5).map((a) => (
            <div className="attempt-item" key={a.id}>
              <span className={`attempt-ico ${a.type === 'mock' ? 'mock' : 'practice'}`}>
                <Icon name={a.type === 'mock' ? 'clock' : 'pencil'} size={14} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="t">
                  {a.label}
                  <span className={`pill-mini ${a.type === 'mock' ? 'mock' : 'practice'}`}>
                    {a.type === 'mock' ? 'Mock' : 'Practice'}
                  </span>
                </div>
                <div className="s">
                  {new Date(a.ts).toLocaleString(undefined, {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div className="attempt-track">
                  <div
                    className="attempt-fill"
                    style={{
                      width: `${Math.min(100, a.score)}%`,
                      background: a.score >= 60 ? 'var(--success)' : a.score >= 35 ? 'var(--warn)' : 'var(--danger)',
                    }}
                  />
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
      <span className="subj-emoji" style={{ background: `${s.color}1a`, color: s.color }}>
        <Icon name={SUBJECT_ICONS[s.id] || 'bank'} size={20} />
      </span>
      <div className="subj-name">{s.name}</div>
      <div className="subj-meta">
        {fmt(total)} questions{st ? ` · ${st.correct}/${st.practiced} correct` : ''}
      </div>
      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className={`badge ${done ? 'done' : 'bank'}`}>
          {done ? <Icon name="check" size={12} /> : 'Practice'}
        </span>
        <Icon name="chevron" size={16} className="muted" />
      </div>
    </Link>
  )
}