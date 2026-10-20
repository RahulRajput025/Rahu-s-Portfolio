/** Numeric easing curves for motion/react (mirror the CSS --ease-* tokens). */
export const EASE = {
  outExpo: [0.16, 1, 0.3, 1],
  outQuart: [0.25, 1, 0.5, 1],
  inOutSmooth: [0.65, 0, 0.35, 1],
  mask: [0.77, 0, 0.175, 1],
  word: [0.33, 1, 0.68, 1],
  stamp: [0.34, 1.56, 0.64, 1],
  fold: [0.76, 0, 0.24, 1],
  swift: [0.32, 0.72, 0, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>

export const SPRING = {
  seat: { type: 'spring', stiffness: 260, damping: 24, mass: 0.8 },
  tap: { type: 'spring', stiffness: 500, damping: 30, mass: 0.6 },
  rail: { type: 'spring', stiffness: 110, damping: 28, mass: 0.4 },
  odometer: { type: 'spring', stiffness: 300, damping: 30 },
  sheet: { type: 'spring', stiffness: 200, damping: 30 },
  tilt: { type: 'spring', stiffness: 150, damping: 15 },
  knob: { type: 'spring', stiffness: 400, damping: 32 },
} as const

export const DUR = {
  press: 0.12,
  hover: 0.2,
  swap: 0.35,
  reveal: 0.7,
  word: 0.9,
  print: 0.45,
  pop: 0.22,
  draw: 0.8,
  wipe: 0.7,
} as const
