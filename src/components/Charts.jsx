import { SUBJECTS } from '../data/questions'
import { Icon, SUBJECT_ICONS } from '../lib/icons'

const fmt = (n) => n.toLocaleString('en-IN')

// ---- Score trend line chart (last N attempts) with average line ----
export function ScoreTrend({ attempts, maxPoints = 15 }) {
  const data = attempts.slice(0, maxPoints).reverse()
  if (data.length < 2) {
    return (
      <div className="chart-empty">
        <Icon name="trendup" size={20} style={{ opacity: 0.5 }} />
        <span style={{ display: 'block', marginTop: 6 }}>
          Take a few attempts to see your score trend
        </span>
      </div>
    )
  }
  const W = 300
  const H = 108
  const pad = 6
  const n = data.length
  const xs = (i) => pad + (i * (W - pad * 2)) / (n - 1)
  const ys = (s) => H - pad - (Math.max(0, Math.min(100, s)) / 100) * (H - pad * 2)
  const pts = data.map((a, i) => `${xs(i)},${ys(a.score)}`).join(' ')
  const area =
    `${xs(0)},${ys(data[0].score)} ` +
    data.map((a, i) => `${xs(i)},${ys(a.score)}`).join(' ') +
    ` ${xs(n - 1)},${H - pad} ${xs(0)},${H - pad} Z`
  const last = data[n - 1]
  const lastP = `${xs(n - 1)},${ys(last.score)}`
  const lastCol = last.score >= 60 ? 'var(--success)' : last.score >= 35 ? 'var(--warn)' : 'var(--danger)'
  const avg = Math.round(data.reduce((s, a) => s + a.score, 0) / n)

  return (
    <div className="card">
      <div className="chart-head">
        <span>Score trend</span>
        <span className="badge bank">last {n}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trendStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--violet)" />
          </linearGradient>
        </defs>
        {[35, 60].map((g) => (
          <line
            key={g}
            x1={pad}
            x2={W - pad}
            y1={ys(g)}
            y2={ys(g)}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
        ))}
        <line
          x1={pad}
          x2={W - pad}
          y1={ys(avg)}
          y2={ys(avg)}
          stroke="var(--success)"
          strokeWidth="1.2"
          strokeDasharray="5 4"
          opacity="0.85"
        />
        <path d={area} fill="url(#trendFill)" />
        <polyline points={pts} fill="none" stroke="url(#trendStroke)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {data.map((a, i) =>
          i === n - 1 ? null : (
            <circle key={i} cx={xs(i)} cy={ys(a.score)} r="2.4" fill="var(--surface)" stroke="var(--primary)" strokeWidth="1.6" />
          )
        )}
        <circle cx={xs(n - 1)} cy={ys(last.score)} r="4" fill={lastCol} stroke="var(--surface)" strokeWidth="2" />
        <text x={xs(n - 1) - 26} y={ys(last.score) - 8} fill={lastCol} fontSize="11" fontWeight="800">
          {last.score}%
        </text>
        <text x={pad} y={ys(avg) - 5} fill="var(--success)" fontSize="10" fontWeight="800" opacity="0.9">
          avg {avg}%
        </text>
      </svg>
      <div className="chart-legend">
        <span>
          Pass <i style={{ background: 'var(--warn)' }} />60% · Avg{' '}
          <i style={{ background: 'var(--success)' }} />
          {avg}%
        </span>
        <span>Earlier → Latest</span>
      </div>
    </div>
  )
}

// ---- 14-day activity strip ----
export function WeekStrip({ attempts }) {
  const days = []
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  for (let i = 13; i >= 0; i--) {
    const d = new Date(start)
    d.setDate(start.getDate() - i)
    days.push({
      d,
      count: attempts.filter((a) => {
        const ad = new Date(a.ts)
        return (
          ad.getFullYear() === d.getFullYear() &&
          ad.getMonth() === d.getMonth() &&
          ad.getDate() === d.getDate()
        )
      }).length,
    })
  }
  const max = Math.max(1, ...days.map((x) => x.count))
  const today = new Date().getDate()
  const activeDays = days.filter((x) => x.count > 0).length
  const wd = (d) => d.toLocaleDateString('en', { weekday: 'narrow' })

  return (
    <div className="card week-card">
      <div className="chart-head">
        <span>Last 14 days</span>
        <span className="badge bank">
          <Icon name="fire" size={13} /> {activeDays} active
        </span>
      </div>
      <div className="week-grid">
        {days.map((x) => (
          <div className="week-col" key={x.d.getTime()}>
            <span className="week-wd">{wd(x.d)}</span>
            <div className="week-bar-wrap">
              <div
                className={`week-bar ${x.count ? 'on' : ''} ${
                  x.d.getDate() === today ? 'today' : ''
                }`}
                style={{ height: `${8 + (x.count / max) * 34}px` }}
              />
            </div>
            <span className="week-day">{x.d.getDate()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---- Subject mastery bars ----
export function SubjectBars({ subjectStats }) {
  return (
    <div className="card">
      <div className="chart-head">
        <span>Subject mastery</span>
        <span className="badge bank">{SUBJECTS.length} sections</span>
      </div>
      {SUBJECTS.map((s) => {
        const st = subjectStats[s.id]
        const pra = st ? st.practiced : 0
        const acc = pra ? Math.round((st.correct / pra) * 100) : 0
        const width = pra ? Math.max(4, acc) : 0
        const full = pra && st.correct >= pra
        return (
          <div className="subj-bar-row" key={s.id}>
            <span className="subj-bar-ico" style={{ background: `${s.color}1a`, color: s.color }}>
              <Icon name={SUBJECT_ICONS[s.id] || 'bank'} size={15} />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="subj-bar-label">
                <span>{s.name}</span>
                <span className="subj-bar-meta">
                  {pra ? `${st.correct}/${pra}` : 'Not started'}
                </span>
              </div>
              <div className="bar-track" style={{ height: 7 }}>
                <div
                  className="bar-fill"
                  style={{ width: `${width}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}cc)` }}
                />
              </div>
            </div>
            <span className="subj-bar-pct" style={{ color: s.color }}>
              {pra ? `${acc}%` : '—'}
            </span>
            {full && (
              <span className="done-mark" style={{ marginLeft: 4 }}>
                <Icon name="check" size={14} />
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}