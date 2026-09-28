import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { App as CapacitorApp } from '@capacitor/app'

// Android hardware / gesture back button:
//  - on a top-level screen (Home, Practice, Mock, Progress, Login, Results) it
//    closes the app, matching normal behaviour;
//  - anywhere else (e.g. during a Quiz) it goes back inside the app instead of
//    killing the whole app.
const EXIT_ROUTES = ['/', '/practice', '/mock', '/stats', '/login', '/results']

export default function BackHandler() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return

    const onBack = () => {
      if (EXIT_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/'))) {
        CapacitorApp.exitApp()
      } else {
        navigate(-1)
      }
    }

    let handle = null
    const p = CapacitorApp.addListener('backButton', onBack)
    p.then((h) => (handle = h)).catch(() => {})
    return () => {
      handle?.remove()
    }
  }, [pathname, navigate])

  return null
}