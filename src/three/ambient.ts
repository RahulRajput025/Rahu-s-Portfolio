/**
 * Hero ambient scene — raw three.js (no R3F) so the lazy chunk stays small.
 * Three copper gyroscope rings and a drift of copper motes behind the portrait,
 * lit by a room environment, easing toward the pointer. Renders only while the
 * hero is on screen and the tab is visible.
 */
import {
  Color,
  Group,
  InstancedMesh,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PMREMGenerator,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Timer,
  TorusGeometry,
  WebGLRenderer,
} from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

export type AmbientTheme = 'dark' | 'light'
export interface AmbientHandle {
  dispose(): void
  setTheme(theme: AmbientTheme): void
}

const COPPER: Record<AmbientTheme, string> = { dark: '#e39b62', light: '#b2642f' }
const ENV_INTENSITY: Record<AmbientTheme, number> = { dark: 1.15, light: 1.35 }
const EMISSIVE: Record<AmbientTheme, number> = { dark: 0.14, light: 0 }

export function mountAmbient(container: HTMLElement, opts: { theme: AmbientTheme }): AmbientHandle | null {
  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
  } catch {
    return null
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setClearColor(0x000000, 0)
  const canvas = renderer.domElement
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;transition:opacity 1.2s ease'
  container.appendChild(canvas)

  const scene = new Scene()
  const pmrem = new PMREMGenerator(renderer)
  const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04)
  scene.environment = envTarget.texture

  const camera = new PerspectiveCamera(30, 1, 0.1, 40)
  camera.position.set(0, 0, 8.2)

  const group = new Group()
  group.rotation.set(0.35, -0.4, 0)
  scene.add(group)

  const material = new MeshStandardMaterial({
    color: new Color(COPPER[opts.theme]),
    metalness: 1,
    roughness: 0.26,
    envMapIntensity: ENV_INTENSITY[opts.theme],
    emissive: new Color(COPPER[opts.theme]),
    emissiveIntensity: EMISSIVE[opts.theme],
  })

  const ringSpecs = [
    { r: 2.55, tube: 0.026, rot: [1.1, 0.25, 0], speed: [0.05, 0.11, 0.0] },
    { r: 2.05, tube: 0.02, rot: [-0.5, 0.9, 0.3], speed: [-0.08, 0.06, 0.04] },
    { r: 1.6, tube: 0.016, rot: [0.3, -0.7, 0.9], speed: [0.04, -0.09, 0.07] },
  ] as const
  const rings: Mesh[] = ringSpecs.map((s) => {
    const mesh = new Mesh(new TorusGeometry(s.r, s.tube, 10, 140), material)
    mesh.rotation.set(s.rot[0], s.rot[1], s.rot[2])
    group.add(mesh)
    return mesh
  })

  // copper motes on slow orbits
  const MOTES = 36
  const motes = new InstancedMesh(new SphereGeometry(0.032, 10, 10), material, MOTES)
  const dummy = new Object3D()
  const orbit = Array.from({ length: MOTES }, (_, i) => ({
    radius: 1.3 + (i % 7) * 0.22 + Math.random() * 0.2,
    tilt: Math.random() * Math.PI,
    phase: Math.random() * Math.PI * 2,
    speed: 0.08 + Math.random() * 0.12,
    scale: 0.6 + Math.random() * 0.9,
  }))
  group.add(motes)

  // pointer easing (window-level so the rings respond across the hero)
  let targetX = 0
  let targetY = 0
  const onPointer = (e: PointerEvent) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2
    targetY = (e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('pointermove', onPointer, { passive: true })

  // size
  const resize = () => {
    const w = container.clientWidth || 1
    const h = container.clientHeight || 1
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(container)

  // run only while visible
  const timer = new Timer()
  let visible = true
  let shown = false
  const render = () => {
    timer.update()
    const dt = Math.min(timer.getDelta(), 0.05)
    const t = timer.getElapsed()
    rings.forEach((m, i) => {
      const s = ringSpecs[i]!.speed
      m.rotation.x += s[0] * dt
      m.rotation.y += s[1] * dt
      m.rotation.z += s[2] * dt
    })
    group.rotation.y = MathUtils.damp(group.rotation.y, -0.4 + targetX * 0.35, 2.2, dt)
    group.rotation.x = MathUtils.damp(group.rotation.x, 0.35 + targetY * 0.25, 2.2, dt)
    for (let i = 0; i < MOTES; i++) {
      const o = orbit[i]!
      const a = o.phase + t * o.speed
      dummy.position.set(Math.cos(a) * o.radius, Math.sin(a) * Math.sin(o.tilt) * o.radius, Math.sin(a) * Math.cos(o.tilt) * o.radius)
      dummy.scale.setScalar(o.scale)
      dummy.updateMatrix()
      motes.setMatrixAt(i, dummy.matrix)
    }
    motes.instanceMatrix.needsUpdate = true
    renderer.render(scene, camera)
    if (!shown) {
      shown = true
      canvas.style.opacity = '1'
    }
  }
  const setLoop = () => renderer.setAnimationLoop(visible && document.visibilityState === 'visible' ? render : null)
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? true
      setLoop()
    },
    { rootMargin: '80px' },
  )
  io.observe(container)
  const onVis = () => setLoop()
  document.addEventListener('visibilitychange', onVis)
  setLoop()

  return {
    setTheme(theme) {
      material.color.set(COPPER[theme])
      material.emissive.set(COPPER[theme])
      material.emissiveIntensity = EMISSIVE[theme]
      material.envMapIntensity = ENV_INTENSITY[theme]
    },
    dispose() {
      renderer.setAnimationLoop(null)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVis)
      rings.forEach((m) => m.geometry.dispose())
      motes.geometry.dispose()
      material.dispose()
      envTarget.dispose()
      pmrem.dispose()
      renderer.dispose()
      canvas.remove()
    },
  }
}
