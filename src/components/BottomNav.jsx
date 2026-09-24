import { useLocation, Link } from 'react-router-dom'

const TABS = [
  { to: '/', emoji: '🏠', label: 'Home' },
  { to: '/practice', emoji: '📝', label: 'Practice' },
  { to: '/mock', emoji: '⏱️', label: 'Mock' },
  { to: '/stats', emoji: '📈', label: 'Progress' },
]

export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="bottom-nav">
      {TABS.map((t) => (
        <Link
          key={t.to}
          to={t.to}
          className={`nav-item ${pathname === t.to ? 'active' : ''}`}
        >
          <span className="nav-emoji">{t.emoji}</span>
          <span>{t.label}</span>
        </Link>
      ))}
    </nav>
  )
}