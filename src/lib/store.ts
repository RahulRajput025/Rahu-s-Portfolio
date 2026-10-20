import { useSyncExternalStore } from 'react'

/**
 * Minimal external store: readable from anywhere (including R3F useFrame loops,
 * which must never read React state), subscribable, and usable as a hook.
 * Selectors must return primitives or stable references.
 */
export function createStore<T>(initial: T) {
  let state = initial
  const listeners = new Set<(s: T) => void>()

  const get = () => state
  const set = (next: T | ((prev: T) => T)) => {
    const value = typeof next === 'function' ? (next as (prev: T) => T)(state) : next
    if (Object.is(value, state)) return
    state = value
    listeners.forEach((l) => l(state))
  }
  const subscribe = (l: (s: T) => void) => {
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  }
  function use(): T
  function use<U>(selector: (s: T) => U): U
  function use<U>(selector?: (s: T) => U) {
    const sel = selector ?? ((s: T) => s as unknown as U)
    return useSyncExternalStore(
      subscribe,
      () => sel(state),
      () => sel(state),
    )
  }
  return { get, set, subscribe, use }
}

export type Store<T> = ReturnType<typeof createStore<T>>
