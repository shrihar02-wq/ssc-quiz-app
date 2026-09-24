import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { buildMockSet, totalQuestions } from '../data/questions'
import { newSession } from '../lib/session'
import UserChip from './UserChip'
import ThemeToggle from './ThemeToggle'
import { Icon } from '../lib/icons'

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
  const bank = totalQuestions()

  function start() {
    const p = PRESETS[preset]
    const qs = p.label === 'Custom' ? qCount : p.qs
    const mins = p.label === 'Custom' ? minutes : p.min
    const questions = buildMockSet(Math.min(qs, bank))
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
            Mocks mix <b>GK, Reasoning &amp; Quant</b> sections (like SSC CGL
            Tier-I, minus English). The countdown timer auto-submits the test
            when time runs out, and results are saved to your progress.
          </p>
        </div>

        <div className="section-title">Choose a paper</div>
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            className={`mock-preset ${preset === i ? 'active' : ''}`}
            onClick={() => setPreset(i)}
          >
            <span className="mp-emoji">
              <Icon name={p.icon} size={22} style={{ color: 'var(--violet)' }} />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="mp-name">{p.label}</div>
              <div className="mp-meta">
                {p.desc}
                {p.label !== 'Custom' ? ` · ${p.qs} Q · ${p.min} min` : ''}
              </div>
            </div>
            {preset === i && (
              <span className="mp-check">
                <Icon name="check" size={14} />
              </span>
            )}
          </button>
        ))}

        {PRESETS[preset].label === 'Custom' && (
          <>
            <div className="field" style={{ marginTop: 16 }}>
              <label>Questions (max {bank.toLocaleString('en-IN')})</label>
              <div className="stepper">
                <button onClick={() => setQCount((c) => Math.max(5, c - 5))}>−</button>
                <input
                  type="number"
                  min={1}
                  max={bank}
                  value={qCount}
                  onChange={(e) =>
                    setQCount(Math.max(1, Math.min(bank, Number(e.target.value) || 1)))
                  }
                />
                <button onClick={() => setQCount((c) => Math.min(bank, c + 5))}>+</button>
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

        <button className="btn btn-primary btn-block" onClick={start}>
          Start Mock Test
        </button>
      </div>
    </div>
  )
}