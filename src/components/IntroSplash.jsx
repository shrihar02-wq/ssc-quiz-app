import { useEffect, useState } from 'react'
import { Icon } from '../lib/icons'

let alreadyShown = false

// Full-screen branded animation shown once when the app opens: the logo
// (indigo->violet rounded tile + bolt) scales in with expanding rings and a
// light sweep, then the whole overlay wipes away to reveal the app.
export default function IntroSplash() {
  const [visible, setVisible] = useState(!alreadyShown)
  const [leaving, setLeaving] = useState(false)
  useEffect(() => {
    alreadyShown = true
    const t = setTimeout(() => setLeaving(true), 1600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(() => setVisible(false), 450)
    return () => clearTimeout(t)
  }, [leaving])

  if (!visible) return null

  return (
    <div
      className={`intro-splash ${leaving ? 'out' : ''}`}
      onAnimationEnd={(e) => {
        if (e.animationName === 'splashOut') setVisible(false)
      }}
    >
      <span className="intro-orb intro-orb-a" />
      <span className="intro-orb intro-orb-b" />
      <div className="intro-logo">
        <span className="intro-ring" style={{ animationDelay: '0.15s' }} />
        <span className="intro-ring" style={{ animationDelay: '0.45s' }} />
        <span className="intro-tile">
          <span className="intro-sheen" />
          <Icon name="lightning" size={42} />
        </span>
      </div>
      <div className="intro-title">
        <span className="intro-name">SSC Quiz Prep</span>
        <span className="intro-tag">Practice &middot; Mock &middot; Progress</span>
      </div>
    </div>
  )
}