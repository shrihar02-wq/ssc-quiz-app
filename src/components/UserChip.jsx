import { getAuth, logout } from '../lib/auth'
import { Icon } from '../lib/icons'

export default function UserChip() {
  const auth = getAuth()
  const name = auth && auth.user ? auth.user.name.split(' ')[0] : ''

  if (!auth || !auth.token) return null

  return (
    <div className="user-chip">
      <span className="uc-avatar">{name.charAt(0).toUpperCase()}</span>
      <span className="uc-name">{name}</span>
      <button className="uc-logout" onClick={logout} title="Logout">
        <Icon name="logout" size={15} />
      </button>
    </div>
  )
}