import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { SUBJECTS, buildMockSet, totalQuestions, categoryCount } from '../data/questions'
import { newSession } from '../lib/session'
import UserChip from './UserChip'
import ThemeToggle from './ThemeToggle'
import { Icon, SUBJECT_ICONS } from '../lib/icons'

const PRESETS = [
  { label: 'Mini Mock', qs: 25, min: 25, icon: 'lightning', desc: 'Quick 25-minute warm-up' },
  { label: 'Half Paper', qs: 50, min: 50, icon: 'practice', desc: '50 questions in 50 minutes' },
  { label: 'Full Mock · CGL Tier-I', qs: 100, min: 60, icon: 'trophy', desc: 'The real SSC CGL format' },
  { label: 'Custom', qs: 0, min: 0, icon: 'calc', desc: 'Pick your own size & duration' },
]

export default function Mock() {
  const navigate = useNavigate()
  const [preset, setPreset] = useState(2)
  const [qCount, setQCount] = useState(100)
  const [minutes, setMinutes] = useState(60)
  const [selected, setSelected] = useState(
    SUBJECTS.filter((s) => s.id !== 'english').map((s) => s.id)
  )
  const bank = totalQuestions()

  const available = selected.reduce((n, id) => n + categoryCount(id), 0)
  const qs = PRESETS[preset].label === 'Custom' ? qCount : Math.min(PRESETS[preset].qs, available)
  const mins = PRESETS[preset].label === 'Custom' ? minutes : PRESETS[preset].min

  function toggle(id) {
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    )
  }

  function start() {
    if (selected.length === 0 || available === 0) return
    const p = PRESETS[preset]
    const count = Math.min(p.label === 'Custom' ? qCount : p.qs, available, bank)
    const questions = buildMockSet(count, selected)
    if (questions.length === 0) return
    const id = newSession({
      type: 'mock',
      label: `${p.label} · Mock`,
      cat: null,
      questions,
      durationSec: mins * 60,
    })
    navigate(`/quiz?session=${id}`)
  }

  return (
    <div>
      <div className="topbar">
        <Link to="/" className="icon-btn">
          <Icon name="back" size={18} />
        </Link>
        <h1>Mock Test</h1>
        <ThemeToggle />
        <UserChip />
      </div>

      <div className="page">
        <div className="card" style={{ marginBottom: 16 }}>
          <p className="small" style={{ lineHeight: 1.5 }}>
            Pick the <b>subjects you want</b> below — the paper is built from your
            selection. Questions and options are <b>shuffled</b> every time. The
            countdown timer auto-submits when time runs out, and results are
            saved to your progress.
          </p>
        </div>

        <div className="section-title">
          Choose subjects
          <span className="section-count">{selected.length}/{SUBJECTS.length} selected</span>
        </div>
        <div className="chip-row" style={{ marginBottom: 18 }}>
          {SUBJECTS.map((s) => {
            const on = selected.includes(s.id)
            return (
              <button
                key={s.id}
                className={`chip subj-chip ${on ? 'on' : ''}`}
                style={
                  on
                    ? { background: `${s.color}1f`, borderColor: s.color, color: s.color }
                    : undefined
                }
                onClick={() => toggle(s.id)}
              >
                <Icon name={SUBJECT_ICONS[s.id] || 'bank'} size={15} style={{ verticalAlign: -2 }} /> {s.name}
              </button>
            )
          })}
        </div>

        <div className="section-title">Choose a paper</div>
        {PRESETS.map((p, i) => {
          const cap = Math.min(p.qs, available)
          const disabled = p.label !== 'Custom' && cap === 0
          return (
            <button
              key={p.label}
              className={`mock-preset ${preset === i ? 'active' : ''} ${disabled ? 'off' : ''}`}
              onClick={() => !disabled && setPreset(i)}
            >
              <span className="mp-emoji">
                <Icon name={p.icon} size={22} style={{ color: 'var(--violet)' }} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mp-name">{p.label}</div>
                <div className="mp-meta">
                  {disabled
                    ? 'Select at least one subject'
                    : p.label !== 'Custom'
                      ? `${p.desc} · ${cap} Q · ${p.min} min`
                      : p.desc}
                </div>
              </div>
              {preset === i && !disabled && (
                <span className="mp-check">
                  <Icon name="check" size={14} />
                </span>
              )}
            </button>
          )
        })}

        {PRESETS[preset].label === 'Custom' && (
          <>
            <div className="field" style={{ marginTop: 16 }}>
              <label>Questions (available: {available.toLocaleString('en-IN')})</label>
              <div className="stepper">
                <button onClick={() => setQCount((c) => Math.max(1, c - 5))}>−</button>
                <input
                  type="number"
                  min={1}
                  max={Math.max(1, available)}
                  value={Math.min(qCount, Math.max(1, available))}
                  onChange={(e) =>
                    setQCount(Math.max(1, Math.min(available, Number(e.target.value) || 1)))
                  }
                />
                <button onClick={() => setQCount((c) => Math.min(available, c + 5))}>+</button>
              </div>
            </div>
            <div className="field">
              <label>Duration (minutes)</label>
              <div className="stepper">
                <button onClick={() => setMinutes((m) => Math.max(1, m - 5))}>−</button>
                <input
                  type="number"
                  min={1}
                  max={300}
                  value={minutes}
                  onChange={(e) =>
                    setMinutes(Math.max(1, Math.min(300, Number(e.target.value) || 1)))
                  }
                />
                <button onClick={() => setMinutes((m) => Math.min(300, m + 5))}>+</button>
              </div>
            </div>
          </>
        )}

        <button
          className="btn btn-primary btn-block"
          onClick={start}
          disabled={selected.length === 0 || available === 0}
        >
          Start Mock Test · {qs} Q
        </button>
      </div>
    </div>
  )
}