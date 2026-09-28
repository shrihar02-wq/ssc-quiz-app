import { getAuth, logout } from '../lib/auth'
import { Icon } from '../lib/icons'

export default function UserChip() {
  const auth = getAuth()
  const name = auth && auth.user ? auth.user.name.split(' ')[0] : ''

  if (!auth || !auth.token) return null

  return (
    <>
      <div className="user-chip">
        <span className="uc-avatar">{name.charAt(0).toUpperCase()}</span>
        <span className="uc-name">{name}</span>
      </div>
      <button className="logout-btn" onClick={logout} title="Log out" aria-label="Log out">
        <Icon name="logout" size={16} />
      </button>
    </>
  )
}