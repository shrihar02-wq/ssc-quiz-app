import { SUBJECTS } from '../data/questions'
import { Icon, SUBJECT_ICONS } from '../lib/icons'

// ---- Score trend line chart (last N attempts) ----
export function ScoreTrend({ attempts, maxPoints = 15 }) {
  const data = attempts.slice(0, maxPoints).reverse()
  if (data.length < 2) {
    return (
      <div className="chart-empty">Take a few attempts to see your score trend 📈</div>
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
        <path d={area} fill="url(#trendFill)" />
        <polyline points={pts} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={xs(0)} cy={ys(data[0].score)} r="2.6" fill="var(--primary)" opacity="0.55" />
        <circle cx={xs(n - 1)} cy={ys(last.score)} r="4" fill={lastCol} stroke="var(--surface)" strokeWidth="2" />
        <text x={xs(n - 1) - 26} y={ys(last.score) - 8} fill={lastCol} fontSize="11" fontWeight="800">
          {last.score}%
        </text>
      </svg>
      <div className="chart-legend">
        <span>Pass line: <i style={{ background: 'var(--warn)' }} />60%</span>
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

  return (
    <div className="card week-card">
      <div className="chart-head">
        <span>Last 14 days</span>
        <span className="badge bank">{attempts.length} attempts</span>
      </div>
      <div className="week-grid">
        {days.map((x) => (
          <div className="week-col" key={x.d.getTime()}>
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
        return (
          <div className="subj-bar-row" key={s.id}>
            <span className="subj-bar-ico" style={{ background: `${s.color}1a`, color: s.color }}>
              <Icon name={SUBJECT_ICONS[s.id] || 'bank'} size={15} />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="subj-bar-label">
                <span>{s.name}</span>
                <span className="subj-bar-meta">
                  {pra ? `${st.correct}/${pra}` : '—'}
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
              {pra ? `${acc}%` : '0%'}
            </span>
          </div>
        )
      })}
    </div>
  )
}