import { useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect, type RefObject } from 'react'
import { SPRING } from '@/lib/ease'
import { useFinePointer } from '@/lib/hooks'
import { useReducedMotionPref } from '@/lib/motionPrefs'

/**
 * Pointer tilt for cards and device frames (fine pointers only, ±max degrees,
 * springed, no React state). Apply the returned style to a motion element
 * that is the ONLY transform writer for that node; put it inside a container
 * with `perspective`.
 */
export function useTilt<T extends HTMLElement>(ref: RefObject<T | null>, max = 6) {
  const fine = useFinePointer()
  const reduced = useReducedMotionPref()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), SPRING.tilt)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), SPRING.tilt)

  useEffect(() => {
    const el = ref.current
    if (!el || !fine || reduced) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      px.set((e.clientX - r.left) / r.width - 0.5)
      py.set((e.clientY - r.top) / r.height - 0.5)
    }
    const onLeave = () => {
      px.set(0)
      py.set(0)
    }
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [ref, fine, reduced, px, py])

  return { rotateX, rotateY, transformStyle: 'preserve-3d' as const }
}
