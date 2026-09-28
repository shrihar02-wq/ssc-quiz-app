import { useEffect, useState } from 'react'
import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { SUBJECTS, categoryCount } from '../data/questions'
import { subscribeProgress, getProgress, resetProgress } from '../lib/store'
import UserChip from './UserChip'
import ThemeToggle from './ThemeToggle'
import { useCountUp } from '../lib/anim'
import { setOverlay } from '../lib/layout'
import { Icon } from '../lib/icons'
import { ScoreTrend, WeekStrip, TimeChart, SubjectBars } from './Charts'
import { getUsage, subscribeUsage, todayKey } from '../lib/usage'

function useProgress() {
  return useSyncExternalStore(subscribeProgress, getProgress)
}

function ringColor(v) {
  return v >= 60 ? 'var(--success)' : v >= 35 ? 'var(--warn)' : 'var(--danger)'
}

function fmtTime(sec) {
  sec = Math.max(0, Math.floor(sec))
  if (sec < 60) return `${sec}s`
  const m = Math.floor(sec / 60)
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  return `${h}h ${m % 60}m`
}

function TimeCard() {
  const usage = useSyncExternalStore(subscribeUsage, getUsage)
  const today = usage.totals?.[todayKey()] || 0
  return (
    <div className="time-card">
      <span className="time-ico">
        <Icon name="clock" size={20} />
      </span>
      <div>
        <div className="time-big">{fmtTime(usage.seconds)}</div>
        <div className="time-lbl">Total time in app</div>
      </div>
      <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
        <div className="time-big today">{fmtTime(today)}</div>
        <div className="time-lbl">Today</div>
      </div>
      <span className="time-dot" title="Live" />
    </div>
  )
}

function OverviewCard({ p, accuracy }) {
  const R = 52
  const C = 2 * Math.PI * R
  const shown = useCountUp(accuracy, 900)
  const answered = useCountUp(p.answered)
  const cur = useCountUp(p.streak.current)
  const best = useCountUp(p.streak.best)
  return (
    <div className="overview-card">
      <svg width="128" height="128" viewBox="0 0 128 128" className="overview-ring">
        <circle cx="64" cy="64" r={R} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="9" />
        <circle
          cx="64"
          cy="64"
          r={R}
          fill="none"
          stroke="url(#ovrGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C - (accuracy / 100) * C}
          transform="rotate(-90 64 64)"
        />
        <defs>
          <linearGradient id="ovrGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#f0abfc" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <text x="64" y="60" textAnchor="middle" fill="#fff" fontSize="30" fontWeight="800">
          {shown}%
        </text>
        <text x="64" y="78" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="11" fontWeight="600">
          accuracy
        </text>
      </svg>
      <div className="overview-info">
        <span className="overview-eyebrow">Lifetime</span>
        <div className="overview-big">
          <span className="overview-num">{answered}</span>
          <span>questions answered</span>
        </div>
        <div className="overview-chips">
          <span className="overview-chip">
            <Icon name="fire" size={14} /> {cur}-day streak
          </span>
          <span className="overview-chip">
            <Icon name="award" size={14} /> best {best}
          </span>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, value, label, accent }) {
  const v = useCountUp(value)
  return (
    <div className="stat">
      <span className="stat-ico" style={{ color: accent, background: `${accent}1a` }}>
        <Icon name={icon} size={16} />
      </span>
      <div className="num" style={{ color: accent }}>{v}</div>
      <div className="lbl">{label}</div>
    </div>
  )
}

export default function Stats() {
  const p = useProgress()
  const [confirm, setConfirm] = useState(false)
  const accuracy = p.answered ? Math.round((p.correct / p.answered) * 100) : 0

  // Hide the bottom nav while the confirm dialog is open.
  useEffect(() => {
    setOverlay(confirm)
  }, [confirm])

  return (
    <div>
      <div className="topbar">
        <Link to="/" className="icon-btn">
          <Icon name="back" size={18} />
        </Link>
        <h1>Progress</h1>
        <ThemeToggle />
        <UserChip />
      </div>

      <div className="page">
        <div className="section-title">Overview</div>
        <OverviewCard p={p} accuracy={accuracy} />
        <TimeCard />

        <div className="stat-row four">
          <StatCard icon="stats" value={p.attempts.length} label="Attempts" accent="var(--primary)" />
          <StatCard icon="trendup" value={p.answered} label="Answered" accent="var(--violet)" />
          <StatCard icon="fire" value={p.streak.current} label="Day streak" accent="var(--warn)" />
          <StatCard icon="award" value={p.streak.best} label="Best streak" accent="var(--success)" />
        </div>

        <div className="small muted" style={{ marginTop: 12 }}>
          Answer at least one question each day to keep your streak alive.
        </div>

        <div className="section-title">Charts</div>
        <TimeChart attempts={p.attempts} />
        <div style={{ marginTop: 12 }}>
          <WeekStrip attempts={p.attempts} />
        </div>
        <div style={{ marginTop: 12 }}>
          <ScoreTrend attempts={p.attempts} />
        </div>
        <div style={{ marginTop: 12 }}>
          <SubjectBars subjectStats={p.subjectStats} />
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
                  {mastered && (
                    <span className="done-mark">
                      <Icon name="check" size={13} /> done
                    </span>
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge bank">{total}</span>
                <div className="small muted" style={{ marginTop: 2 }}>Qs</div>
              </div>
              <Icon name="chevron" size={18} className="muted" />
            </Link>
          )
        })}

        <div className="section-title">Recent attempts</div>
        {p.attempts.length === 0 ? (
          <div className="empty">
            <Icon name="stats" size={30} style={{ opacity: 0.35, marginBottom: 8 }} />
            <div>No attempts recorded yet.</div>
            <div className="small muted" style={{ marginTop: 4 }}>
              Take a practice session or a mock test to start tracking.
            </div>
          </div>
        ) : (
          p.attempts.slice(0, 10).map((a) => (
            <div className="attempt-item" key={a.id}>
              <span
                className={`attempt-ico ${a.type === 'mock' ? 'mock' : 'practice'}`}
              >
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
                      background: ringColor(a.score),
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

        <button
          className="btn btn-outline btn-block"
          style={{ color: 'var(--danger)', marginTop: 18 }}
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