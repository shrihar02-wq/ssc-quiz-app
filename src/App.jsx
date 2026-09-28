import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Practice from './components/Practice'
import Mock from './components/Mock'
import Quiz from './components/Quiz'
import Results from './components/Results'
import Stats from './components/Stats'
import LoginScreen from './components/LoginScreen'
import BottomNav from './components/BottomNav'
import IntroSplash from './components/IntroSplash'
import BackHandler from './components/BackHandler'
import ScrollToTop from './components/ScrollToTop'
import { useAuth } from './lib/auth'
import './lib/usage'

const NAV_HIDDEN = ['/quiz', '/login']

function Layout() {
  const { pathname } = useLocation()
  const auth = useAuth()
  const loggedIn = !!auth && !!auth.token

  // Every user must log in — no guest/offline mode anymore.
  if (!loggedIn && pathname !== '/login') {
    return <Navigate to="/login" replace />
  }
  if (loggedIn && pathname === '/login') {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <div className="page-swap" key={pathname}>
        <Routes>
          <Route path="/login" element={loggedIn ? <Navigate to="/" replace /> : <LoginScreen />} />
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/mock" element={<Mock />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
      {!NAV_HIDDEN.some((p) => pathname.startsWith(p)) && <BottomNav />}
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Layout />
      <BackHandler />
      <ScrollToTop />
      <IntroSplash />
    </HashRouter>
  )
}