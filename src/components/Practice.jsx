import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { SUBJECTS, categoryCount, buildPracticeSet } from '../data/questions'
import { newSession } from '../lib/session'
import UserChip from './UserChip'
import ThemeToggle from './ThemeToggle'
import { Icon, SUBJECT_ICONS } from '../lib/icons'

const fmt = (n) => n.toLocaleString('en-IN')

export default function Practice() {
  const navigate = useNavigate()
  const location = useLocation()
  const initialSubject = SUBJECTS.find(
    (s) => location.state?.subject && s.id === location.state.subject
  )
  const [subject, setSubject] = useState(initialSubject || null)
  const [showConfig, setShowConfig] = useState(!!initialSubject)
  const [count, setCount] = useState(
    initialSubject ? Math.min(10, categoryCount(initialSubject.id)) : 10
  )
  const [showExplanations, setShowExplanations] = useState(true)
  const [q, setQ] = useState('')

  function openSubject(s) {
    setSubject(s)
    setCount(Math.min(10, categoryCount(s.id)))
    setShowConfig(true)
  }

  function start() {
    const questions = buildPracticeSet(subject.id, count)
    if (questions.length === 0) return
    const id = newSession({
      type: 'practice',
      label: `${subject.name} · Practice${showExplanations ? '' : ' (no hints)'}`,
      cat: subject.id,
      questions,
      durationSec: 0,
      showExpl: showExplanations,
    })
    navigate(`/quiz?session=${id}`)
  }

  const max = subject ? categoryCount(subject.id) : 0
  const quick = [10, 25, 50, 100]
  const term = q.trim().toLowerCase()
  const list = SUBJECTS.filter(
    (s) =>
      !term ||
      s.name.toLowerCase().includes(term) ||
      (s.blurb || '').toLowerCase().includes(term)
  )

  return (
    <div>
      <div className="topbar">
        <Link to="/" className="icon-btn">
          <Icon name="back" size={18} />
        </Link>
        <h1>Practice</h1>
        <ThemeToggle />
        <UserChip />
      </div>

      <div className="page">
        <div style={{ position: 'relative' }}>
          <span className="search-ico">
            <Icon name="search" size={16} />
          </span>
          <input
            className="search"
            style={{ paddingLeft: 42 }}
            placeholder="Search a subject…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        {list.length === 0 ? (
          <div className="empty">No subjects match “{q}”.</div>
        ) : (
          list.map((s) => {
            const total = categoryCount(s.id)
            return (
              <button key={s.id} className="subject-item" onClick={() => openSubject(s)}>
                <span className="subject-emoji" style={{ background: `${s.color}1a`, color: s.color }}>
                  <Icon name={SUBJECT_ICONS[s.id] || 'bank'} size={22} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="subj-name">{s.name}</div>
                  <div className="subj-meta">{s.blurb}</div>
                  <div className="subj-meta" style={{ marginTop: 4 }}>
                    <span className="badge bank">{fmt(total)} questions</span>
                  </div>
                </div>
                <Icon name="chevron" size={18} className="muted" />
              </button>
            )
          })
        )}
      </div>

      {showConfig && subject && (
        <div className="overlay" onClick={() => setShowConfig(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-head">
              <span className="subject-emoji" style={{ background: `${subject.color}1a`, color: subject.color }}>
                <Icon name={SUBJECT_ICONS[subject.id] || 'bank'} size={22} />
              </span>
              <h3>{subject.name}</h3>
            </div>

            <div className="field">
              <label>Number of questions (max {fmt(max)})</label>
              <div className="stepper">
                <button onClick={() => setCount((c) => Math.max(1, c - 5))}>−</button>
                <input
                  type="number"
                  min={1}
                  max={max}
                  value={count}
                  onChange={(e) =>
                    setCount(Math.max(1, Math.min(max, Number(e.target.value) || 1)))
                  }
                />
                <button onClick={() => setCount((c) => Math.min(max, c + 5))}>+</button>
              </div>
              <div className="seg" style={{ marginTop: 10 }}>
                {quick.map((n) => (
                  <button
                    key={n}
                    className={count === n ? 'active' : ''}
                    onClick={() => setCount(Math.min(n, max))}
                  >
                    {n}
                  </button>
                ))}
                <button className={count === max ? 'active' : ''} onClick={() => setCount(max)}>
                  All
                </button>
              </div>
            </div>

            <div className="field">
              <label>Explanations after each question</label>
              <div className="seg">
                <button className={showExplanations ? 'active' : ''} onClick={() => setShowExplanations(true)}>Show</button>
                <button className={!showExplanations ? 'active' : ''} onClick={() => setShowExplanations(false)}>Hide</button>
              </div>
            </div>

            {max <= 100 && (
              <div className="explanation" style={{ background: 'var(--primary-light)', borderColor: 'var(--primary)' }}>
                <b>This is a curated GK bank ({fmt(max)} Qs).</b> It needs real,
                verified questions to scale up — drop a question bank JSON into{' '}
                <code>src/data/custom/</code> (see{' '}
                <code>scripts/import-gk.mjs</code>) and rebuild to reach 1,000+.
              </div>
            )}

            <button className="btn btn-primary btn-block" onClick={start}>
              Start Practice
            </button>
          </div>
        </div>
      )}
    </div>
  )
}