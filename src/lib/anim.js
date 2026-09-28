import { useEffect, useState } from 'react'

// Ease-out count-up for stats numbers.
export function useCountUp(target, dur = 650) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!target) {
      setV(0)
      return
    }
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur)
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, dur])
  return v
}