import { useId } from 'react'

/**
 * The RR mark: a copper bezel with a slowly turning tick ring and two
 * overlapping Fraunces R's — one outlined, one cut from the metal gradient.
 */
export function Monogram({ size = 36, className = '' }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <span className={`monogram ${className}`} style={{ width: size, height: size, fontSize: size }} aria-hidden="true">
      <svg viewBox="0 0 40 40" className="monogram-ring">
        <defs>
          <linearGradient id={`mg-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f3c5a2" />
            <stop offset="0.45" stopColor="#e39b62" />
            <stop offset="1" stopColor="#8a4b2b" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="19" fill="none" stroke={`url(#mg-${id})`} strokeWidth="1.1" />
        <circle cx="20" cy="20" r="15.6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="0.8 2.4" opacity="0.6" className="monogram-ticks" />
        <circle cx="20" cy="3.2" r="1.3" fill={`url(#mg-${id})`} />
      </svg>
      <span className="monogram-letters">
        <span className="monogram-r1">R</span>
        <span className="monogram-r2">R</span>
      </span>
    </span>
  )
}
