import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Reset scroll to the top on every route change so a new screen never
// opens mid-page (e.g. switching to Progress while Home was scrolled down).
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}