const P = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </>
  ),
  practice: (
    <path d="M17 3l4 4L8 20l-5 1 1-5L17 3z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  stats: (
    <>
      <path d="M3 21h18" />
      <path d="M6 21V11" />
      <path d="M12 21V6" />
      <path d="M18 21v-7" />
    </>
  ),
  bank: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </>
  ),
  back: (
    <>
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </>
  ),
  close: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  fire: (
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  logout: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </>
  ),
  moon: (
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
  ),
  lock: (
    <>
      <rect x="4.5" y="11" width="15" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  trophy: (
    <>
      <path d="M6 3h12v5a6 6 0 0 1-12 0V3z" />
      <path d="M6 5H3v2a4 4 0 0 0 4 4" />
      <path d="M18 5h3v2a4 4 0 0 1-4 4" />
      <path d="M12 14v4" />
      <path d="M8 21h8" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  landmark: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V10" />
      <path d="M9 21V10" />
      <path d="M15 21V10" />
      <path d="M19 21V10" />
      <path d="M4 10l8-6 8 6" />
      <path d="M12 2v2" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v17" />
      <path d="M9 20h6" />
      <path d="M4 6h16" />
      <path d="M6 6 3.8 10.4a3 3 0 0 0 4.4 2.2L6 6z" />
      <path d="m18 6-2.2 4.4a3 3 0 0 0 4.4 2.2L18 6z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.5 5.5 3.5 9S14.5 18.5 12 21C9.5 18.5 8.5 15.5 8.5 12s1-6.5 3.5-9z" />
    </>
  ),
  chart: (
    <>
      <path d="M3 21h18" />
      <path d="M6 21V11" />
      <path d="M12 21V6" />
      <path d="M18 21v-7" />
    </>
  ),
  flask: (
    <>
      <path d="M10 2v6L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 8V2" />
      <path d="M8.5 2h7" />
      <path d="M7 14h10" />
    </>
  ),
  puzzle: (
    <path d="M14 3c0-1 1-2 2-2a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v3h-1.5a1.5 1.5 0 0 0 0 3H22v4a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2c0-1.1-.9-2-2-2s-2 .9-2 2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3h1.5a1.5 1.5 0 0 0 0-3H3V6a2 2 0 0 1 2-2h3c0-1 .9-2 2-2s2 1 2 2h2z" />
  ),
  calc: (
    <>
      <rect x="4.5" y="2.5" width="15" height="19" rx="2" />
      <path d="M8 7h8" />
      <rect x="7" y="11" width="2" height="2" rx="0.4" />
      <rect x="11" y="11" width="2" height="2" rx="0.4" />
      <rect x="15" y="11" width="2" height="2" rx="0.4" />
      <rect x="7" y="15" width="2" height="2" rx="0.4" />
      <rect x="11" y="15" width="2" height="2" rx="0.4" />
      <rect x="15" y="15" width="2" height="2" rx="0.4" />
    </>
  ),
  pencil: (
    <>
      <path d="M17 3l4 4L8 20l-5 1 1-5L17 3z" />
      <path d="m14 6 4 4" />
    </>
  ),
  lightning: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />,
}

// subject id -> icon name (crisp vector glyph replaces the emoji)
export const SUBJECT_ICONS = {
  history: 'landmark',
  polity: 'scale',
  geography: 'globe',
  economy: 'chart',
  science: 'flask',
  'static-gk': 'bank',
  reasoning: 'puzzle',
  quant: 'calc',
  english: 'pencil',
}

export function Icon({ name, size = 18, className = '', style }) {
  const node = P[name]
  if (!node) return null
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {node}
    </svg>
  )
}