import { useLocation, Link } from 'react-router-dom'
import { Icon } from '../lib/icons'

const TABS = [
  { to: '/', icon: 'home', label: 'Home' },
  { to: '/practice', icon: 'practice', label: 'Practice' },
  { to: '/mock', icon: 'clock', label: 'Mock' },
  { to: '/stats', icon: 'stats', label: 'Progress' },
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
          <Icon name={t.icon} size={20} className="nav-ico" />
          <span>{t.label}</span>
        </Link>
      ))}
    </nav>
  )
}