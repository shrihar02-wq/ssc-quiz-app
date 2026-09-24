import { useState } from 'react'
import { isDark, setTheme, resolved } from '../lib/theme'
import { Icon } from '../lib/icons'

export default function ThemeToggle() {
  const [dark, setDark] = useState(isDark())
  return (
    <button
      className="icon-btn theme-toggle"
      aria-label="Toggle dark mode"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => {
        const next = dark ? 'light' : 'dark'
        setTheme(next)
        setDark(!dark)
      }}
    >
      <Icon name={dark ? 'sun' : 'moon'} size={18} />
    </button>
  )
}

// Keep resolved value in sync when system preference changes (used optionally).
export function useResolvedTheme() {
  const [r, setR] = useState(resolved())
  return [r, setR]
}