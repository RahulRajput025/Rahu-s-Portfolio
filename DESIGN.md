# DESIGN.md — Rahul Rajput · "Open Caseback" (final build specification)

Target: `D:\Rahul-Portfolio` · Vite 7 + React 19 + TypeScript + Tailwind CSS v4 + motion v12 (`motion/react`) + React Three Fiber 9.8.2 + @react-three/drei 10.7.9 + three 0.182.0 (+ @types/three 0.182, maath 0.10.8) · static build (GitHub Pages / Vercel) · native scroll only — no Lenis, no drei ScrollControls, no scroll-rig.

## 0. Decision record

Base: Concept 3 "Open Caseback" (unanimous) with every coherent judge graft and every must-fix applied. Resolved: matrix early in §4; plate labels `--ink-soft` at 0.045 u; plain-copy 404; light theme "Paper dial"; all WebGL screens are 2D `CanvasTexture`s (no troika, no drei `Html`); Views keep rendering during the theme wipe; no custom cursor; no marquee; skills once (§10); the name is the display line; four pins: hero 160 svh, Case 02 280, Apps 240, Case 04 260 (9.4 pinned viewports; Apps reached at ≈ 8.2 screens; phones un-pin everything except the Case 01 sticky phone).

## 1. Concept

A luxury watch earns trust by showing its movement through a sapphire caseback. This site does the same: every product Rahul shipped is shown **running** as a real React miniature — WebSocket chat arriving while a per-minute meter debits a wallet, a puja booking paying through a Razorpay-style sheet, a childcare day-sheet compiling a CCS report, a CodeIgniter controller morphing into an Express handler, apps on 3D phones. Proof by running mechanism; never adjectives, never invented numbers. Copper is the movement; navy is the dial — midnight at night, warm paper by day ("one ink, one paper, inverted": dark ground #090D16 ≈ light ink #0D1322).

Watch words appear in exactly four visible places: the preloader word "Winding", the power-reserve tooltip, the Backstage title "Caseback", the footer line "In working order." Everywhere else the copy is plain engineering nouns; case eyebrows read `CASE 01 — VEDIC VAIBHAV · BOOKING`. One object is carried everywhere: the copper trace leaves the hero's closed case as a 2 px spine in the left gutter, pads each section and ends in the footer echo. Machine beats are fast (≤ 400 ms), human sections slow (800–1100 ms), idle life rare. Every demo carries a 10 px mono caption "Simulated — illustrative values"; every number derives from `src/data/content.ts`, whose facts carry a `source` and store figures an `asOf` date.

## 2. Colour tokens

~90 % of every screen is ink-on-paper or paper-on-ink; navy (OKLCH h 257–267) lives in the ground tint at night and in the ink by day; copper (h 46–60) is the only metal, at hairline, numeral, button, pad and packet scale. Hue is constant across themes; only lightness moves. Contrast = WCAG 2.x on `--ground` / `--panel`.

### 2.1 Dark — "Midnight dial" (`html[data-theme="dark"]`)

| token | hex | oklch | contrast (ground / panel) |
|---|---|---|---|
| `--ground` | #090D16 | 16.0% 0.020 266 | — |
| `--raise` | #0F1521 | 19.6% 0.026 264 | ink 15.8 |
| `--panel` | #151D2C | 23.1% 0.032 263 | — |
| `--panel-2` | #1B2435 | 26.0% 0.035 263 | — |
| `--ink` | #F1EEE8 | 95.0% 0.009 85 | 16.8 / 14.6 |
| `--ink-soft` | #A6ADBA | 74.6% 0.020 263 | 8.6 / 7.5 |
| `--ink-mute` | #7E8796 | 62.1% 0.025 261 | 5.4 / 4.7 |
| `--copper` | #D08A5B | 69.5% 0.106 54 | 6.9 / 6.0 |
| `--copper-hover` | #DDA077 | 75.5% 0.091 55 | 8.7 / 7.5 |
| `--copper-raw` | #B87333 | 61.8% 0.117 60 | 5.1 (≥ 18 px) |
| `--sapphire` | #7FA3D6 | 70.8% 0.085 257 | 7.5 / 6.5 |
| `--rule` | #222C3E | 29.2% 0.036 262 | 1.4 (decorative) |
| `--rule-strong` | #5E6B82 | 52.6% 0.040 262 | 3.6 / 3.1 |
| `--live` | #8FC4A8 | 77.5% 0.068 161 | 9.8 / 8.5 |
| `--warn` | #E2B86E | 80.4% 0.104 81 | 10.5 / 9.1 |
| `--err` | #E39A8B | 75.4% 0.091 32 | 8.6 / 7.4 |
| `--screen` | #0B1020 | 17.7% 0.034 270 | ink 16.4 |

### 2.2 Light — "Paper dial" (`html[data-theme="light"]`)

| token | hex | oklch | contrast (ground / panel) |
|---|---|---|---|
| `--ground` | #F5F3EE | 96.4% 0.007 89 | — |
| `--raise` | #FBFAF7 | 98.5% 0.004 91 | ink 17.8 |
| `--panel` | #ECE9E2 | 93.4% 0.010 87 | — |
| `--panel-2` | #E3DFD5 | 90.4% 0.014 89 | — |
| `--ink` | #0D1322 | 18.9% 0.032 267 | 16.7 / 15.3 |
| `--ink-soft` | #4C5566 | 44.8% 0.030 263 | 6.8 / 6.2 |
| `--ink-mute` | #5B6374 | 49.9% 0.029 265 | 5.4 / 5.0 |
| `--copper` | #8A4B2B | 48.2% 0.097 46 | 6.1 / 5.6 |
| `--copper-hover` | #6F3B21 | 41.2% 0.083 46 | 8.2 / 7.5 |
| `--copper-raw` | #B87333 | 61.8% 0.117 60 | 3.4 (decorative only) |
| `--navy` | #102542 | 26.4% 0.061 257 | 13.9 / 12.7 |
| `--rule` | #D8D4CB | 87.1% 0.013 87 | 1.3 (decorative) |
| `--rule-strong` | #767C8A | 58.6% 0.023 267 | 3.8 / 3.5 |
| `--live` | #2F6B4F | 47.9% 0.078 161 | 5.7 / 5.2 |
| `--warn` | #7A5D18 | 49.5% 0.091 84 | 5.6 / 5.1 |
| `--err` | #9A3B2E | 48.2% 0.130 30 | 6.2 / 5.7 |
| `--screen` | #0B1020 | 17.7% 0.034 270 | constant |

Roles (both themes): `--ground` page; `--raise` header pill, dock, sticky copy; `--panel` cards and demo UIs; `--panel-2` hovered card, "their" bubble; `--ink` text; `--ink-soft` secondary text, plate labels; `--ink-mute` ghost labels; `--copper` accent, live lines, packets (patina on paper); `--copper-raw` 3D metal, bezels, bridges — decorative on paper; `--sapphire` (dark) / `--navy` (light) links and hue carrier; `--rule` decorative hairlines; `--rule-strong` input borders (WCAG 1.4.11); `--live` / `--warn` / `--err` status; `--screen` device screens, constant because phones are objects, not paper. Primary button text is always `--ground`: on `--copper` at night (6.9), on `--navy` by day (13.9) — "the metal glows at night, the ink takes over by day"; `--ink` on copper is never used (2.4:1).

### 2.3 Derived colours, shadows, radii

- Hover lift `oklch(from var(--copper) calc(l + .06) c h)`; scrim `color-mix(in oklab, var(--ground) 72%, transparent)`; header pill `color-mix(in oklab, var(--raise) 82%, transparent)` + `backdrop-filter: blur(12px)` (the only blur); bubble "mine" `color-mix(in oklab, var(--copper) 14%, var(--panel))`; focus `outline: 2px solid var(--copper); outline-offset: 2px`.
- Shadows: light cards `0 1px 0 var(--rule), 0 14px 32px -18px oklch(26% .06 257 / .28)`; dark cards `inset 0 1px 0 oklch(100% 0 0 / .045)`; shadows never animate.
- Radii: `--r-card: 10px`, `--r-pill: 999px`; one exception `--r-device: 28px` for phone frames.

### 2.4 Metallic rules

1. Gradient copper text only on the footer echo "In working order." and the 404 numeral; the hero word "running." is solid `--copper` Fraunces italic.
2. Ramp, dark: `linear-gradient(105deg,#5A2E17 0%,#C9834F 22%,#F3C5A2 34%,#B86A3A 48%,#6B3A1E 62%,#E1A273 82%,#8A4B2B 100%)` via `background-clip: text` inside `@supports`; light: `#5A2E17 0%,#8A4B2B 20%,#C9834F 34%,#6F3B21 48%,#4A2512 62%,#B86A3A 80%,#5A2E17 100%`; Fraunces ≥ 3 rem only.
3. Sheen = animate the light: a second layer `linear-gradient(105deg, transparent 42%, oklch(100% 0 0 / .75) 50%, transparent 58%)`, `background-size: 200% 100%`, `background-position` sweeping once per 4.6 s with a 55 % hold, in view only.
4. Bezels: `conic-gradient` copper stops on a `::before` masked to the border (`mask-composite: exclude`) on CSS phone frames and the power-reserve ring; brushed grain on the §6 dial from three `repeating-linear-gradient`s at 7/11/13 px.
5. Pointer specular on cards and CSS phones: `--pointer-x/--pointer-y` from one `pointermove` listener per section → `radial-gradient(240px circle at var(--pointer-x) var(--pointer-y), oklch(100% 0 0 / .18), transparent 60%)`, `mix-blend-mode: soft-light`; fine pointers only.
6. `@property --sheen-x`, `--wound`, `--meter` registered; tokens sRGB; P3 only for `--glow: oklch(63% .14 60)`.

### 2.5 3D materials (both sets pre-created at mount)

Phone body `meshPhysicalMaterial` #2F3542, metalness .88, roughness .30, clearcoat 1 (envMapIntensity .9 dark / 1.15 light). Glass plates: tier-dependent transmission, tint `--panel`, `background` #090D16 / #F5F3EE. Bridges, traces, bearings #B87333, metalness 1, roughness .35, emissive #B87333 × .25 dark / 0 light. Packets `meshBasicMaterial toneMapped=false` #D08A5B dark / #8A4B2B light. Screen textures ground #0B1020 always. `environmentIntensity` .65 / 1.0. Lightformer rig — dark: ceiling #F1EEE8 ×1.4, sides #7FA3D6 ×.5 and #F1EEE8 ×.35, copper ring ×2.5; light: ceiling #FFF ×3.2, sides #FBFAF7 ×1.6, ring ×1.2. Shadow catcher alphaMap `--ink` 35 % / `--navy` 18 %. Devices are theme-constant; only lights, environment intensity, shadow tint and packet colour damp (600 ms). ACESFilmic in both themes; screens and Lightformers `toneMapped={false}`.

### 2.6 Implementation

Tailwind v4 `@theme { --color-ground: light-dark(oklch(96.4% .007 89), oklch(16% .02 266)); … }` for every token; `html { color-scheme: light dark }` with `html[data-theme]` override; `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`. Inline pre-paint `<head>` script: `localStorage['oc-theme']` else `prefers-color-scheme` → `data-theme` + `<meta name="theme-color">` (#090D16 / #F5F3EE), plus `data-boot="winding"` when the preloader will show. WebGL reads `dataset.theme` through a zustand store inside `useFrame`.

## 3. Typography

| role | family | package | import | notes |
|---|---|---|---|---|
| Display | Fraunces | `@fontsource-variable/fraunces` | `/opsz.css` + `/opsz-italic.css` (~65 KB; not `full`) | wght 300 at opsz 144; no `tnum` — never for changing numbers |
| Body / UI | Geist | `@fontsource-variable/geist` | `/wght.css` + `/wght-italic.css` (~28 KB) | `tnum`, italic |
| Instruments / code | Geist Mono | `@fontsource-variable/geist-mono` | `/wght.css` (~22 KB) | also the screen painter's font |

≈ 180 KB; `font-display: swap` with fontpie metric fallbacks (Georgia / Arial); preload the Fraunces and Geist latin woff2; the preloader awaits `document.fonts.ready`.

Settings: H1 Fraunces 300 `"opsz" 144` `--step-5` lh .98 tracking −.015em `text-wrap: balance`; H2 Fraunces 300 `--step-4` lh 1.0; H3 Fraunces 500 opsz 72 `--step-2`; italic emphasis Fraunces italic 300, single words only; eyebrows Geist Mono 500 `--step--2` uppercase tracking .14em `--copper`; body Geist 400 `--step-0` lh 1.55; lead `--step-1` lh 1.35; captions `--step--1` `--ink-soft`; every changing or aligned number (meters, wallets, clocks, dates, ledger cells, versions, package IDs, code) in Geist Mono; ghost numerals Fraunces 300 `--step-5`, `color: transparent; -webkit-text-stroke: 1px color-mix(in oklab, var(--copper-raw) 45%, transparent)`; code .84rem lh 1.5 `font-variant-ligatures: none`.

Scale (360 → 1440 px): `--step--2: clamp(.72rem,.70rem+.10vw,.78rem)` · `--step--1: clamp(.84rem,.80rem+.20vw,.94rem)` · `--step-0: clamp(1rem,.95rem+.25vw,1.125rem)` · `--step-1: clamp(1.2rem,1.1rem+.5vw,1.5rem)` · `--step-2: clamp(1.5rem,1.25rem+1.2vw,2.25rem)` · `--step-3: clamp(2rem,1.5rem+2.2vw,3.5rem)` · `--step-4: clamp(2.75rem,1.8rem+4.2vw,5.5rem)` · `--step-5: clamp(3.25rem,2rem+7.5vw,8.5rem)`. Layout: 12-col grid ≥ 1024 px, max-width 1280 px, gutters 16 / 32 / 64 px, section padding `clamp(6rem, 4rem + 8vw, 12rem)`, measure ≤ 62ch, body ≥ 16 px on phones. Headings split by word only (`aria-label` on the heading, `aria-hidden` spans).

## 4. Hero scene — "The Movement" (R3F)

### 4.1 Canvas (one WebGL context)

```tsx
<Canvas frameloop="demand" dpr={tier === 3 ? [1, 2] : [1, 1.5]}
  gl={{ antialias: tier === 3, alpha: true, stencil: false, powerPreference: 'high-performance' }}
  eventSource={rootRef} eventPrefix="client" resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
  style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} fallback={null}>
  <View.Port />
</Canvas>
```

The hero and §7 are drei `<View>`s inline in the DOM (`frames={inView ? undefined : 1}`), never more than two live; View's per-frame rect read is tolerated only under `frameloop="demand"` — no other per-frame DOM reads, no transforms on View ancestors. The Canvas is `React.lazy`-loaded after the preloader (`<Preload all />` + `gl.compileAsync` run during it); `shadows` off.

### 4.2 Objects (procedural; no GLB/Draco/KTX2)

1. **Phone** — `<RoundedBox args={[0.72, 1.5, 0.08]} radius={0.09} smoothness={8} bevelSegments={4} creaseAngle={0.4}>` titanium; glass back inset .004; camera island and buttons merged; **screen** `planeGeometry [0.64, 1.40]` at z +.0405, `meshBasicMaterial toneMapped={false} map={screenTexture}` — a `CanvasTexture` from `three/screenPainter.ts` (2D canvas at device DPR, 768 × 1664 on T3, else 512 × 1112, `SRGBColorSpace`) drawn from CSS tokens: "Astro Vaibhav · consultation" header, three bubbles, chronograph arc, rate, wallet. ≈ 2.4 k tris, 4 draw calls.
2. **Plates** — four `<RoundedBox args={[1.9, 1.15, 0.02]} radius={0.05}>` in a `stack` group at z = −.55·(i+1); `stack.scale.z = lerp(.03, 1, e)`; copper bridge frames = instanced thin boxes (1 draw call). Labels: one 2048 × 256 `CanvasTexture` atlas (repainted on theme change only) on 1.7 × .11 planes at each plate's top-left, `--ink-soft`, cap height .045 u: `CLIENTS — React · React Native`, `API — Node.js · REST · WebSockets`, `DATA — MongoDB · PostgreSQL · Redis`, `INTEGRATIONS — Razorpay · AI (Node + Python)`. Materials: T3 front plate `<MeshTransmissionMaterial samples={6} resolution={512} thickness={.15} roughness={.12} chromaticAberration={.02} anisotropicBlur={.08} transmissionSampler background={ground} />`, rear plates `meshPhysicalMaterial transmission={.9} thickness={.3} roughness={.2} ior={1.45}`; T2 all physical transmission (one shared pass); T1 frosted `meshStandardMaterial transparent opacity .55 roughness .6`.
3. **Traces** — ten `TubeGeometry(CatmullRomCurve3, 32, .008, 6)` from the phone's back through plates 1 → 2 → 3 → bearings, built in stack space (they stretch with the group), merged with `mergeGeometries` (1 draw call).
4. **Packets** — `<Instances limit={48}>` (16 on phones; ≤ 5 per visible trace), icosahedron r .014, `{ curve, t, speed ∈ [.18, .30]/s }` advanced by delta time; a packet reaching the API plate calls `screenPainter.tick()` so a bubble arrives as it lands.
5. **Bearings** — three recessed cylinders r .03 × .01 flush with the INTEGRATIONS plate, copper, merged; no floating jewels. **Shadow catcher** — plane 4 × 4 at y −.95, `meshBasicMaterial transparent` with a canvas radial `alphaMap`, `scale.x = lerp(1, 1.6, e)`.
6. **Environment** — `<Environment resolution={256} frames={envFrames}>` with both rigs (§2.5); the copper `form="ring" scale={3} position={[0, 1.2, -4]}` inside `<Float speed={1} floatIntensity={.6} enabled={!reduced} autoInvalidate>`; `envFrames = 1` at rest. **Camera** `fov 32`, position `[0, .15, 4.6]`, lookAt `[0, −.05, −.6]`.

Budget: ≤ 45 k tris, ≤ 24 draw calls, one transmission pass max, screen repaint ≤ 2 Hz, 3D chunk ≤ 350 KB gz (`manualChunks: { three: ['three'] }`), 60 fps on a 2021 mid-range Android (frosted) under 4× CPU throttle.

### 4.3 Behaviour

- **Pointer** (fine pointers, no React state): `easing.damp3(camera.position, [-pointer.x*.35, .15 + pointer.y*.22, camZ], .35, dt)`; `lookAt`; `explodeBoost = hypot(pointer.x, pointer.y) * .08`; `invalidate()` while damping is unsettled.
- **Scroll** (wrapper 160 svh, sticky 100 svh stage; `useScroll({ target: wrapper, offset: ['start start', 'end start'] })` → `useMotionValueEvent` → ref + `invalidate()`): `e = 1 − smoothstep(.5, .95, p)` + boost — the labelled plates stay open until p .5, then the case closes; `stack.rotation.y = lerp(−.42, .08, p)`; `camZ = lerp(4.6, 3.8, smoothstep(.5, 1, p))`; DOM copy `y = −60px·p`, `opacity = 1 − smoothstep(.35, .75, p)`; the hint hairline `scaleX = 1 − p`; at p > .95 the View drops to `frames={1}` and packets stop.
- **Running screen**: in view, the painter repaints ≤ 2 Hz — the arc sweeps once per 6 s, the wallet rolls one step per sweep, a bubble arrives per packet landing; frozen off-screen, on tab hide and under reduced motion. **Idle**: packets; `<Float speed={1.4} rotationIntensity={.12} floatIntensity={.35} autoInvalidate>` on the phone; plates drift ±.01.
- **Entrance** (on preloader `onExitComplete`): plates at e = 0, phone from y −.3 / opacity 0 over 1.1 s (damp .35); at 200 ms the case opens e 0 → 1 over 1.6 s (damp .5); packets at 900 ms; DOM kicker prints at 100 ms, H1 words rise at 250 ms (y 110 % → 0, 900 ms, `--ease-word`, stagger 75 ms), sub-line 500, lead 650, CTAs 750, stamps 900; repeat visits at .7×.
- **Theme swap**: one `useFrame` damps colours, emissive, `envMapIntensity`, plate `background`, packet and shadow colours (smoothTime .2, ≈ 600 ms) with `envFrames = Infinity` for that window on T3/T2; T1 crossfades two pre-baked PMREM maps at 50 % of the wipe. The View keeps rendering through the 700 ms View Transition so the circle reveals the new-theme device.

### 4.4 Tiers, mobile, failure

Tier = `useDetectGPU({ benchmarksURL: '/gpu/' })` + `deviceMemory` / `hardwareConcurrency` + `pointer: coarse`, refined by `<PerformanceMonitor ms={250} iterations={8} flipflops={3} onDecline onFallback>`.

- **T3** desktop: full rig, MTM front plate, dpr ≤ 2. **T2**: physical transmission, dpr ≤ 1.5. **T1** (phone default): frosted plates, env `resolution={128}`, 6 traces, 16 packets, no Float, phone scaled .78, dpr ≤ 1.25.
- **CSS tier** (no WebGL, `onFallback`, context lost): four DOM plates with mono labels under one `perspective: 1400px`, a CSS phone frame, close-on-scroll via `useTransform` — same choreography.
- **Poster tier** (reduced motion, no JS): `<picture>` posters `hero-{dark,light}-{wide,tall}.webp` (1600 × 1000 and 900 × 1200, ≤ 120 KB each) captured at e = .9 by `scripts/posters.mjs`, labels legible at 360 and 1600 px; reduced motion adds a "Render the movement" button that mounts one static frame. The poster sits beneath the Canvas in **every** tier from first paint and crossfades out (300 ms) on the first rendered frame; an error boundary swaps back on `webglcontextlost`.
- **Mobile**: single column — kicker, H1 (two lines), sub-line, lead, two 48 px CTAs side by side, stage `min(46svh, 360px)`, stamps; the hero may exceed 100 svh on short viewports, nothing is shrunk or dropped; the stage is not sticky, closing maps to its passage (`offset: ['start 80%', 'end 20%']`); parallax from touch-drag and Android `deviceorientation`. Canvas `aria-hidden`; an `sr-only` list mirrors the plates.

## 5. Sections

Conventions: stroke-only ghost numeral, mono eyebrow, H2 words rising from masks (900 ms, stagger 75 ms, `--ease-word`), opener hairline (`scaleX` 0 → 1, 800 ms). Default reveal = **settle** (opacity 0 → 1, y 24 → 0, scale .985 → 1, 700 ms, `--ease-out-expo`), once at `amount: .3`. Scene engine (§7.4): `pin` = tall wrapper + sticky stage; `flow` = scrubbed by the section's passage (`offset: ['start 70%', 'end 70%']`); `timed` = `animate(progress, 1, { duration })` on in-view (phones, Replay). Every pin carries a mono step index, "Next: … ↓" and a focus-visible "Skip this scene" anchor. Hover is fine-pointer only; touch gets `:active { scale: .97 }`. Reduced motion everywhere: `progress = 1`, final state, Replay/⏸ visible — sections note only deviations.

### §1 Hero — `#hero` · `HeroSection.tsx`

Copy: kicker `SOFTWARE ENGINEER · FULL-STACK & MOBILE · MOHALI, PUNJAB, IN`; H1 "Rahul Rajput"; sub-line (Fraunces 300, `--step-3`) "Systems, shown *running*." (italic, solid `--copper`); lead "Three-plus years shipping React, React Native and Node.js products that are live today — temple bookings, astrologer consultations, childcare operations. Most recently Software Engineer (Technical Lead) at Vedic Vaibhav Dot Com Pvt Ltd, 2024–2026."; CTAs **See the work** (#work) · **Get in touch** (#contact) · text link **Résumé (PDF)** (`download`); stamps `Mohali · 14:32 IST` (mount-only clock) and the "Scroll to close the case" hairline. Desktop: 12-col, copy cols 1–6 centred, stage cols 6–13. Mobile and motion: §4.3–4.4.

### §2 In service — `#in-service` · `InServiceStrip.tsx`

Static public facts: vedicvaibhav.com · astrovaibhav.com · vedicshop.store · panditjiatrequest.com (links with a `--live` dot + "LIVE") · "Google Play — 6 apps" · "App Store — 3 apps" (developer pages, counts derived, derivation tooltips with `<details>` for AT) · github.com/RahulRajput025 · "Checked Oct 2026" (`asOf`). Desktop: a 56 px full-bleed row between hairlines; mobile: 48 px row, native `overflow-x: auto; scroll-snap-type: x mandatory`, no duplicates. Entrance: the row prints (`clip-path: inset(0 100% 0 0) → inset(0)`, 900 ms, `--ease-mask`) as the hero closes; LIVE dots pulse once (ring 1 → 1.5, 600 ms). Hover/focus: underline draws 200 ms, halo widens.

### §3 What I ship — `#ship` · `FourLines.tsx`

**01 Web** — "React and TypeScript fronts on Node.js REST APIs." chips vedicvaibhav.com · astrovaibhav.com · panditjiatrequest.com · **02 Mobile** — "React Native apps, published and maintained on Google Play and the App Store." chips 6 Play · 3 App Store (#apps) · **03 Real-time & payments** — "WebSocket chat and voice, per-minute billing, wallets, Razorpay." chips Node.js · WebSockets · Redis Pub/Sub · Razorpay · **04 Lead & operate** — "Architecture, code reviews, releases; proposals, pricing and go-to-market with founders." chips Technical Lead · Vedic Vaibhav 2024–26. Desktop: four full-width rows (index | H3 | sentence | chips | LIVE dot) on hairlines; mobile: index + title on one row, the rest wraps. Scroll-linked per row (`offset: ['start 85%', 'start 55%']`, springed): the hairline draws left → right; at completion one pulse runs it (900 ms) and the dot goes copper (200 ms); text settles. Hover/focus: hairline to full copper, index swaps to → (260 ms).

### §4 Selected work — `#work` · `WorkIndex.tsx`

Index rows (No. | Product | What | W·A·iOS glyphs | Years | Role | ↗): 01 Vedic Vaibhav — puja, chadhava, prasad booking — W A iOS — 2024–26 — Technical Lead — vedicvaibhav.com · 02 Astro Vaibhav — astrologer chat & call, Kundali, horoscope — W A — astrovaibhav.com · 03 Vedic Shop — spiritual products e-commerce — W A iOS — vedicshop.store · 04 Pandit Ji At Request — on-demand pandit booking — W A iOS — panditjiatrequest.com · 05 ChildcarePro — childcare management platform, Australia — W — "private B2B, no link" · 06 Service Points — Netherlands drop-shipping platform (client, via Mind2Web) — W — 2023–24 — Associate Software Developer — servicepoints.nl. Ownership matrix beneath: rows Architecture · Web (React/TS) · Mobile (React Native, Play + App Store) · APIs (Node REST, WebSockets) · Data (MongoDB/PostgreSQL/MySQL) · Releases & code reviews · Business & sales ops × columns Vedic Vaibhav platforms · ChildcarePro · Service Points; ✓ only where the résumé states it (Vedic Vaibhav: all seven; ChildcarePro: Architecture, Web, APIs, Data, Releases & reviews; Service Points: Web, APIs, Data). Desktop: 72 px rows, Geist tabular, ruled 7 × 3 matrix. Mobile: 2-line cards with a real `<button aria-expanded aria-controls>` expanding years + role (`0fr → 1fr`, 300 ms); matrix as per-row chip lists. Entrance: rows print (420 ms `--ease-mask`, stagger 40 ms); surface glyphs seat in sequence (scale .6 → 1, 60 ms apart). Scroll-linked: each ✓ stamps as its row crosses 60 % viewport (scale 1.18 → 1, rotate −4° → 0, 280 ms `--ease-stamp`, stagger 50 ms). Hover/focus: row `--panel` 150 ms, product hairline seats copper; ✓ tooltips quote the résumé line.

### §5 Case 01 — Vedic Vaibhav · Booking — `#case-vedic-vaibhav` · `CaseBooking.tsx` (flow)

Eyebrow `CASE 01 — VEDIC VAIBHAV · BOOKING`. Copy: "Online puja, chadhava and prasad booking from temples across India." Role Software Engineer (Technical Lead) · Aug 2024 – Sep 2026; stack React/TypeScript web · React Native (Google Play + App Store) · Node.js REST · MongoDB/PostgreSQL · Razorpay; links vedicvaibhav.com · Play `com.rahulrajput025.client` · App Store id6765667844; sister chips vedicshop.store · panditjiatrequest.com · partner.vedicvaibhav.in (only if the link check passes). Desktop (≈ 120 svh): copy cols 1–5 with a role/stack ledger; cols 6–12 a device pair — a 16:10 browser pane and a CSS phone (`--r-device`, conic bezel) overlapping its lower right in one `perspective: 1200px`. Mobile: the phone is `position: sticky; top: max(16px, env(safe-area-inset-top))` in a four-step wrapper; four 70 svh step cards scroll past and drive beats via `useInView` (timed, 1.2 s each). Beats: **choose** [0–.25] temple/offering cards slide in (x 40 → 0, 500 ms, stagger 60 ms); **select** [.25–.5] a card lifts, its check draws (`pathLength` 300 ms), the date rolls, the offering chip travels pane → phone (`layoutId`, trigger at t .5, 600 ms); **pay** [.5–.75] trigger: sheet rises (spring 200/30), "Pay with Razorpay" presses (.97), `--live` "Paid" seal stamps (260 ms); **confirm** [.75–1] a booking row prints into the pane's ledger (600 ms) and the phone ticket **tears** along a perforation (`clip-path` polygon, 450 ms `--ease-fold`), leaving a stub carrying the store links. Hover: pair tilts ±6° (`tilt`) with specular.

### §6 Case 02 — Astro Vaibhav · Consultation, metering & Kundali — `#case-astro-vaibhav` · `CaseConsultation.tsx` (pin, 280 svh)

Eyebrow `CASE 02 — ASTRO VAIBHAV · CONSULTATION & METERING`. Copy: real-time chat + voice consultation (Node.js, WebSockets) with per-minute billing, wallet flows and Razorpay; AI astrology chat and automated Kundali report generation (Node.js + Python); Web + Android (`com.rahulrajput025.astro`; no iOS); link astrovaibhav.com; rate "₹10/min — illustrative". Desktop: copy cols 1–4 (step index `02 / 06`, Next, Skip); CSS phone 300 × 620 cols 5–8 running the thread; **instrument panel** cols 9–12: a 320 px brushed-grain copper dial (6 px arc completing once per simulated minute, a minute hand), wallet odometer `--step-4` Geist Mono, rate chip, and a seven-row event ledger (`session.open`, `minute.tick`, `minute.tick`, `wallet.low`, `razorpay.paid`, `session.close`, `settled`) with mono timestamps. Mobile: not pinned; meter in the phone's top bar; ledger in `<details>`; timed 9 s with ⏸/↺. Beats: **connect** [0–.1] `ws · open` prints, status dot goes `--live`, the arc arms; **chat** [.1–.36] eight messages alternate — typing dots (1.2 s loop) then bubble pop (scale .96 → 1, y 8 → 0, 220 ms); each message prints a ledger row and a packet runs an SVG copper trace from bubble to row (400 ms); the arc sweeps with t and each completed minute debits the wallet; **call** [.36–.5] trigger: the avatar travels to centre (`layoutId`, 450 ms), a 12-bar waveform runs on the frame bus, the meter keeps ticking; **top-up** [.5–.62] trigger: the wallet crosses its threshold → `--warn`, `wallet.low` prints, a Razorpay-style sheet springs up, "Paid" stamps, the balance rolls up; **close** [.62–.72] the receipt prints (600 ms), `settled` stamps; **kundali** [.72–1] birth details print into a form, a packet leaves Node → Python worker (progress bar 1.1 s) → "PDF ready" chip; a 14-line report streams (shimmer → text, 320 ms each) while a North-Indian chart draws (`pathLength`, 1.2 s) and one AI-chat Q/A pair arrives. Wallet, bubble count and ledger are pure functions of t, so scrolling back rewinds the billing. Hover/focus: a ledger row draws a copper connector to its bubble.

### §7 On the stores — `#apps` · `AppsShelf.tsx` (pin, 240 svh)

Content (`content.ts`, `asOf: '2026-10'`): 1 Vedic Vaibhav — Android `com.rahulrajput025.client` + iOS id6765667844 (bundle `com.rahulrajput025.pujaprasad`) · 2 Astro Vaibhav: Vedic Astrology — Android only `com.rahulrajput025.astro` · 3 Vedic Shop — Android `com.nirmanyu.NewVedicShop` + iOS id6766175387 · 4 Pandit Ji At Request — Android `com.panditJiAtReqapp` + iOS id6762001802 · 5 Astro Pandit — astrologer-side, Android `com.rahulrajput025.myexpoapp` · 6 PJAR for Pandit Ji — pandit-side, Android `com.pjarpanditji`; links to each listing and both developer pages; caption "Published by Vedic Vaibhav Dot Com Pvt Ltd; engineering led by Rahul (résumé)". Install tiers, ratings and versions render only under `showStoreFigures` with `asOf` + `source`, "Checked Oct 2026" adjacent. Desktop: six cards cols 1–5 (middle-of-viewport activation); a `<View>` cols 6–12 with three procedural phones (§4.2) at x −1.15 / 0 / 1.15 on a copper shelf trace; two `CanvasTexture`s per phone (mono lock clock; app composition built from tokens, never fake screenshots) crossfaded. Mobile: a snap rail of six CSS phones (220 × 460, conic bezel) holding DOM miniatures, readout `02 / 06` + copper bar, `animation-timeline: view(inline)` behind `@supports`. Scroll-linked: `active = floor(p·6)`; the active phone comes forward (`damp3` z +.35, .3) while neighbours turn toward it (`dampE`); the arc rotates `lerp(−.35, .35, p)`; on change the outgoing screen sleeps to the lock clock and the incoming **wakes** (opacity damp .3 s), a packet hops the shelf trace to the active phone (600 ms), the DOM card gets its bridge and its badges deploy (y 6 → 0, 180 ms, stagger 40 ms). Entrance: phones rise from y −.4 (1.0 s). Idle: `<Float speed={1.2} rotationIntensity={.15} floatIntensity={.3} autoInvalidate>`; `frames={1}` off-screen. Hover/focus on a card tilts its phone (±.12 rad). Degrades: T1 frosted + two phones; CSS tier/reduced → the rail at every width.

### §8 Case 03 — ChildcarePro · Operations — `#case-childcarepro` · `CaseChildcare.tsx` (flow)

Text only — no link, logo or customer names. Eyebrow `CASE 03 — CHILDCAREPRO · OPERATIONS`. Copy (résumé): "Australia-based childcare management platform for Long Day Care, OSHC and Family Day Care: enrolments, attendance & sign-in, bookings, educator/staff management, parent communication, billing, CCS compliance reporting." Role: led engineering (Technical Lead); stack React/TypeScript web, Node.js REST, PostgreSQL/MongoDB; children are initials marked "sample data". Desktop (≈ 120 svh): a segmented control (Long Day Care · OSHC · Family Day Care, `layoutId` indicator 300 ms); a ledger pane (rows = children, columns 7:00–18:00), a sidebar (Educators on floor, Bookings), a CCS report outline with "Compile"; module chips (Enrolments · Bookings · Educators · Parent comms · Billing). Mobile: three stacked cards, timed. Beats: **sign-in** [0–.35] a vertical **now-line** sweeps the time axis (x = f(t), springed); as it passes each row's start a copper dot drops (y −6 → 0, `seat`) and the attendance bar extends with it; "Signed in 14 / 18" rolls; **bookings** [.35–.55] an OSHC chip slides into an afternoon slot (x 24 → 0, 300 ms), "Ratio check" seats a `--live` tick; **switch** [.55–.7] trigger: the indicator slides to OSHC and rows re-sort with `layout` (400 ms); **compile** [.7–1] report placeholders resolve (shimmer → text), "Compiling report…" ticks, a `--live` seal "Ready for submission" stamps (260 ms), module chips light in sequence (60 ms). Hover/focus: a module chip dims unrelated regions and outlines what it owns.

### §9 Case 04 — Service Points · Migration — `#case-migration` · `CaseMigration.tsx` (pin, 260 svh)

Eyebrow `CASE 04 — SERVICE POINTS · MIGRATION`. Copy: Mind2Web LLP, Mohali · Associate Software Developer · Aug 2023 – May 2024; "Features for Service Points, a large Netherlands drop-shipping platform (CodeIgniter/PHP, React, Node). Migrated the backend from PHP to Node.js and MySQL to MongoDB. Built a scalable real-time chat application (Node, Redis Pub/Sub). AI chatbot response optimisation."; links mind2web.io and servicepoints.nl labelled "client platform (Netherlands)" — no public credit implied. Desktop: copy cols 1–4 (index `03 / 03`, Next, Skip, **View as text** toggle exposing both snippets as `<pre>`); board cols 5–12 with three panes — Code, Data, Fan-out — inactive at .45. Mobile: three stacked cards; the Code card carries a **Migrate** range slider (auto-plays once in view, then hands control) whose value drives the scrubbable parts (token dissolve, tab swap, brace drawing) while the morph itself triggers at 50 % with hysteresis. Beats: **code** [0–.38] a CodeIgniter controller (`public function order($id) { $order = $this->Order_model->get($id); … json_encode($order) }`) becomes an Express handler (`router.get('/orders/:id', async (req, res) => { const order = await Order.findById(req.params.id); res.json(order) })`): shared tokens (`order`, `id`, `get`, `json`) carry `layoutId`s in a `<LayoutGroup>` and slide to their new positions (900 ms `--ease-out-expo`, trigger enter .5 / exit .4, `AnimatePresence initial={false}`), removed tokens dissolve (300 ms, scrub), new tokens print (40 ms stagger); **data** [.38–.68] trigger: MySQL cells lift (scale .9, 300 ms) then travel (`layoutId`) into a nested document `{ _id, customer: {…}, items: […], total, status }` whose braces draw; **fan-out** [.68–1] scrub: `PUBLISH chat:room` emits packets along four SVG paths (`offset-path`, 900 ms, 80 ms stagger) to four subscriber rings, then to client chips that pop a bubble (220 ms); loops 3× while active. Hover/focus: a JS token highlights its PHP origin. Reduced: static before/after panes with a segmented control; fan-out drawn complete.

### §10 Six layers, one owner — `#stack` · `StackMap.tsx`

The only skills list. Lead: "Every case on this page runs through the same six layers. Hover a technology to see where it was used." Layers (résumé): **Web clients** React.js, TypeScript, JavaScript (ES6+), Redux, Angular, HTML5, CSS3, Responsive UI, Bootstrap, Figma · **Mobile** React Native, Google Play Console, App Store Connect · **API** Node.js, Express, REST, Microservices, Django, CodeIgniter, PHP, Python · **Real-time** WebSockets, Redis Pub/Sub · **Data** MongoDB, PostgreSQL, MySQL, SQL, Redis, Firebase · **AI & infra** AI chatbot/LLM integration, AI workflows, ML deployment (scikit-learn, joblib), AWS, cPanel, Git/GitHub, Postman, Razorpay. Desktop: H2 + lead left; six plates right, stacked with `rotateX` and `translateZ` under one `perspective: 1400px`; mobile: six cards. Scroll-linked (`offset: ['start end', 'center center']`): plates flatten (`rotateX` 58° → 0, `z` 36·i → 0) into a list; once flat (p ≥ .9, once) a request round-trip plays — an 8 px packet travels down the six rows (1.6 s), lighting each bridge (160 ms), returns, and `200 OK` pops (220 ms); repeats every 9 s in view. Hover/focus: a chip lights every chip with the same `data-tech` across the page and a tooltip reads "used in: Case 02, Case 04 …" from `content.ts`. Reduced: flat list, no packet.

### §11 Earlier work — `#earlier-work` · `EarlierWork.tsx`

Content: Impavid Technologies, Bangalore · Web Developer Intern · Feb – Jun 2023 — Atria University (atriauniversity.edu.in; "client site, rebuilt since 2023"), RLJIT (rljit.in; its footer credits Impavid Technologies), Ghousia Group of Technologies (no link), Magsol Industry (magsol.co.in + repo `Php_Magsol_Industry_Website`) — HTML/CSS/Bootstrap/JS/PHP/MySQL; Angular + Firebase blog (`Angular-Blog-Website`); Angular + Node + MongoDB CRUD (`Angular_Crud_App_small`). Lab: Heart Disease Predictor — Python ML, scikit-learn models saved with joblib, served via Django (`Heart-disease-predictor`; no accuracy figures); E-Commerce Web App — payment gateway, cart, wishlist, profiles, orders, email notifications; PHP/MySQL/JS/Bootstrap (`ecommerce_updated-2k24-`). Desktop: a 4 + 2 grid of 3:2 blueprint cards, then two lab cards; mobile: 2-col cards, lab cards stacked. Entrance (once): each blueprint draws (SVG layout rectangles, `pathLength` 800 ms, 120 ms stagger per card), grid blocks fill (300 ms), title and chips rise (500 ms). Heart card: six feature fields roll to sample values (60 ms stagger), a packet travels form → `model.joblib` → Django endpoint (900 ms), the model chip cycles KNN → LR → RF; caption "sample inference — illustrative, not medical advice"; no probability shown; "Run another sample" re-rolls. Shop card: a five-step order timeline lights along a drawn copper line (800 ms); the last node opens an envelope (flap `rotateX` 0 → −160°, 400 ms) "Order confirmation sent". Hover: card lifts 6 px.

### §12 Releases & operations — `#releases` · `ReleaseBoard.tsx`

Copy (résumé): "Owned architecture end to end: React/TS web, React Native apps on Google Play and the App Store, Node REST APIs, MongoDB/PostgreSQL; code reviews; releases." · "Handled business & sales ops with founders and customers: requirements, proposals and pricing, partner coordination, go-to-market." Desktop: two lanes — Engineering (PR → review ✓ → build → Play Console / App Store Connect → Live) and Business (requirements → proposal & pricing → partner coordination → go-to-market); version chips (VedicVaibhav 1.3.0 · Vedic Shop 1.3.4 · Pandit Ji At Request 1.0.0, from `content.ts` with `asOf`, only under `showStoreFigures`) ride the engineering lane. Mobile: two vertical rails. Scroll-linked (`offset: ['start end', 'end center']`): lane lines draw with `pathLength`; chips advance station by station (x spring 200/30) as thresholds pass, each station lighting its ring (160 ms), the review station drawing a check (300 ms); the Business lane runs 10 % behind; "Live" lights the store badge. Hover/focus: a station shows a mono note from `content.ts`. Reduced: chips at Live, lanes drawn.

### §13 Journey — `#journey` · `Journey.tsx`

Content: Impavid Technologies — Web Developer Intern, Bangalore · Feb – Jun 2023 · Mind2Web LLP — Associate Software Developer, Mohali · Aug 2023 – May 2024 · Vedic Vaibhav Dot Com Pvt Ltd — Software Engineer (Technical Lead), Full-Stack, Mobile & Business Operations · Aug 2024 – Sep 2026; origin tick B.Tech CSE 2019–2023; gap months are unlit rail. Desktop: left 4 cols sticky (a sidebar, not a pin) with a **date window** (Geist Mono "FEB 2023", rolling) and the vertical copper rail with a glowing head; right 8 cols: three employer cards with product chips. Mobile: rail in the gutter, date window as a sticky pill. Scroll-linked (`useScroll({ target: list, offset: ['start center', 'end center'] })`): rail fill `scaleY` (spring 110/28), head `y` (transform, never `top`); the date window maps progress to the 44 months and rolls month/year digits (300 ms); each card lights when the head enters its span (`useInView`, `margin: '-45% 0px -45% 0px'`): bridge draws (600 ms), chips deploy (scale .9 → 1, y 6 → 0, 180 ms, stagger 40 ms). Keyboard: ←/→ on the focused rail jump between entries. Reduced: rail full, cards lit, final month shown.

### §14 About — `#about` · `About.tsx`

Content: Mohali, Punjab, India; B.Tech CSE, I.K. Gujral Punjab Technical University, Mohali Campus-1, 2019 – 2023, CGPA 8.03; "Alongside engineering I run the business side of a product: requirements, proposals and pricing, partner coordination and go-to-market with founders and customers; technical leadership, code reviews, releases."; optional Rahul-supplied portrait — absent, a Fraunces italic pull line is the designed state, never a placeholder. Desktop: bio + facts ledger (Location · Education · Most recent role · What I also do) left; portrait card 16:10 or pull line right; mobile: portrait first, bio, facts. Scroll-linked: bio words ink from `--ink-mute` to `--ink` across the paragraph's slice (per-word opacity, `aria-label` on the paragraph); facts print; the portrait un-clips (`inset(0 50% 0 50%) → inset(0)`, 900 ms `--ease-mask`) with inner scale 1.12 → 1; CGPA counts 0 → 8.03 (1.0 s, announced once via `aria-live="polite"`). Hover: portrait tilt ±4°.

### §15 Backstage — "Caseback" — `#backstage` · `Backstage.tsx`

Content: the stack (Vite 7 · React 19 · TypeScript · Tailwind v4 · motion v12 · R3F 9 + drei 10 · @fontsource); the budget table (section 8); motion, accessibility and content policies in plain words; live readouts rendered after mount only — GPU tier, DPR, FPS (4 Hz), draw calls and triangles (`gl.info.render`) — "—" when unavailable. Switches (real `<button role="switch" aria-checked>`, knob spring 400/32): **Caseback** — §7 phones and the hero (if mounted) switch to a pre-created wireframe copper material set and the counts print; **Rig** — the §7 View pulls its camera back and shows emissive quads at the Lightformer positions with mono labels (`KEY · ring · #D08A5B`, `RIM · #7FA3D6`, `CEILING`); **Shadows** — toggles the shadow catcher; **Reduced motion** — site-level override persisted as `localStorage['oc-motion']` → `html[data-motion="reduced"]`; **Theme** + "System" reset. Desktop: panel + switches left, tables right; mobile: stacked. No WebGL → poster tier and "—".

### §16 Begin a build — contact + footer — `#contact` · `Contact.tsx` + `Footer.tsx`

Content: "Begin a build." · rahulrajput02525@gmail.com (copy + mailto) · +91-9915084857 (`tel:` + WhatsApp `wa.me/919915084857`) · github.com/RahulRajput025 · **Résumé (PDF)** · Mohali, Punjab, India · IST clock (mount-only); LinkedIn omitted until supplied. Form (name, email, message, honeypot) rendered only when `VITE_FORM_ENDPOINT` is set — otherwise no dead form. Footer: outlined echo "In working order." (copper ramp, one sheen on entry), columns Sitemap (Work · Apps · Stack · Journey · Backstage · Contact) · Products (four domains) · Stores (developer pages) · Contact; colophon "Fraunces · Geist · Geist Mono — Vite · React · Motion · React Three Fiber — no testimonials, no invented numbers; store figures as of Oct 2026"; reduced-motion switch; © year computed at build. Desktop: heading spans 8 cols, contact ledger beneath, four footer columns, the spine ending in the echo. Mobile: single column, 56 px rows; the dock hides here. Entrance: heading rises (900 ms), its underline draws (700 ms); rows print as a ledger (500 ms, stagger 80 ms). Form: focus draws the field rule copper (320 ms) and floats the label (150 ms); submit → "Sending…" (mask swap) → a packet runs the form's bottom hairline (900 ms) → "Delivered" with a drawn check (`aria-live="polite"`); errors in `--err` with the field outlined `--rule-strong`. Hover/focus: rows slide 8 px; copy-email shows "Copied" with a drawn check (300 ms), announced.

## 6. Global chrome

**z-index**: 0 canvas (fixed, `pointer-events: none`) · 1 `<main>` · 30 pinned-stage internals · 40 spine · 60 dock · 70 header · 100 preloader; the Contents `<dialog>` uses the top layer.

**Preloader — "Winding"**: fixed curtain in `--ground` (`html[data-boot="winding"]` paints a static curtain with the name from first paint, so the prerendered page never flashes). Centre: a 96 px SVG ring (`--copper-raw` 1.5 px, `pathLength` = MotionValue `wound`), a mono counter `00 → 100`, "Winding" in Fraunces italic. Real progress: `document.fonts.ready` +25, poster `decode()` +15, 3D chunk +30, `useProgress` + `gl.compileAsync` +30, each `animate(wound, target, { duration: .4 })`; failsafe `Promise.race([all, timeout(3000)])`; boot `try/catch` removes the curtain and sets `html.no-motion`. Exit: the ring — a **sibling** of the clipped curtain, header already mounted — travels to the header's power-reserve slot via `layoutId="reserve"` (700 ms) while the curtain lifts (`clip-path: inset(0) → inset(0 0 100% 0)`, 800 ms `--ease-fold`); hero choreography starts on `onExitComplete`. Once per session (`sessionStorage['oc-wound']`), skipped under reduced motion; scroll locked with `overflow: hidden` + `scrollbar-gutter: stable`.

**Header**: 64 px, `z 70`; transparent over the hero, after 80 px a floating pill (`max-width 1200px`, `--raise` 82 % + blur 12 px, 1 px `--rule`, 400 ms). Left: monogram "RR" in a 28 px copper hairline circle + the **section indicator** `06 / 16 — Astro Vaibhav` (mono, mask-swapped; a button that opens Contents). Centre (≥ 1061 px): **Work · Apps · Stack · Journey · Contact** (scrollspy IntersectionObserver `rootMargin: '-48% 0px -48% 0px'`, `layoutId` copper underline). Right: the **power-reserve ring** (18 px, copper arc = `scrollYProgress` on `pathLength`, tooltip "Power reserve · 42 % read"), theme toggle, **Résumé (PDF)** hairline button (`download`), **Get in touch** primary. Phones: hides on scroll-down after 240 px, returns on scroll-up (300 ms), never while the menu is open.

**Contents menu**: a native `<dialog>` via `showModal()` (focus trap, Escape, top layer, `inert` background) — a bottom sheet on phones (`max-height: 88svh`, 360 ms `--ease-swift`), a centred panel on desktop: all 16 sections with a one-line descriptor and dates, a `layoutId` copper tab on the current section; footer row Résumé (PDF), email, WhatsApp, theme toggle, reduced-motion switch. Links rise from masks (550 ms, stagger 40 ms).

**Theme toggle — moon phase**: 20 px disc with a copper half-disc that rotates 180°. `if (!document.startViewTransition || reduced) return setTheme(next)` — the CSS fallback is an instant swap under `html[data-theme-switching] * { transition: none !important }`. Otherwise `document.startViewTransition(() => flushSync(() => setTheme(next)))`; on `ready`, animate `::view-transition-new(root)` `clipPath: circle(0 at x y) → circle(r at x y)`, `r = hypot(max(x, innerWidth−x), max(y, innerHeight−y))`, **700 ms** `--ease-in-out-smooth`; CSS `::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal }`, new above old; `<meta name="theme-color">`, `localStorage['oc-theme']` and the zustand store update in the same callback; DOM loops pause for the snapshot while the Views keep rendering (§4.3). "System" in Contents removes the key.

**Cursor policy**: native cursor only, never augmented or replaced.

**Progress**: the power-reserve ring at every width; at ≥ 1280 px the **spine** — a 2 px `--rule` track in the left gutter with a copper fill (`scaleY`, spring 110/28), a glowing head (`drop-shadow(0 0 12px var(--copper-raw))`) and 16 pads (copper once passed) as a `<nav aria-label="Sections">` of anchors with mono labels on hover/focus; it ends in the footer echo.

**Mobile dock** (≤ 1060 px): bottom pill (`--raise` 84 % + hairline, `env(safe-area-inset-bottom)`), four 44 px actions Work · Apps · Email · WhatsApp; enters `translate(-50%, 150%) → 0` (500 ms) after 60 vh, hides near `#contact` and the footer; `<main>` reserves `padding-bottom: 88px` there.

**404**: static `404.html` — the hero poster with one plate missing, Fraunces "This page doesn't exist.", the numeral 404 in the copper ramp, mono "Nothing is wired to this address.", link "Back to the start →"; no Canvas, no preloader.

**Chrome accessibility**: skip link first; `:focus-visible` rings everywhere; every hover paired with focus/blur; icon buttons carry `aria-label`; `scroll-padding-top: 80px`; `prefers-reduced-transparency` removes the header blur; `forced-colors: active` restores system colours.

## 7. Motion system

### 7.1 Curves and durations

| token | value | use |
|---|---|---|
| `--ease-out-expo` | cubic-bezier(.16, 1, .3, 1) | reveals, settles, beats |
| `--ease-out-quart` | cubic-bezier(.25, 1, .5, 1) | UI feedback < 300 ms |
| `--ease-in-out-smooth` | cubic-bezier(.65, 0, .35, 1) | wipes, draws, packets |
| `--ease-mask` | cubic-bezier(.77, 0, .175, 1) | clip-path prints |
| `--ease-word` | cubic-bezier(.33, 1, .68, 1) | word-mask rises |
| `--ease-stamp` | cubic-bezier(.34, 1.56, .64, 1) | the only overshoot: seals, ticks |
| `--ease-fold` | cubic-bezier(.76, 0, .24, 1) | tear, menus, curtain |
| `--ease-swift` | cubic-bezier(.32, .72, 0, 1) | sheets |

Durations: press 120 ms (`scale(.97)`), hover colour 200 ms, label mask swap 350 ms (−110 % / +110 %), reveals 600–900 ms, word masks 900 ms stagger 75 ms, prints 320–600 ms, stage beats 600–1600 ms, bubble pop 220 ms, odometer 300–420 ms, path draws 600–1200 ms, theme wipe 700 ms, idle loops 2.2–4.6 s. Keyboard-initiated actions animate only their state (≤ 150 ms); nothing scales from 0; no `ease-in`.

### 7.2 Springs

`scrollSpring` { stiffness 100, damping 30, restDelta .001, skipInitialAnimation } on every scroll-derived value (the page itself scrolls natively) · `seat` 260/24/.8 (≈ 380 ms, 4 % overshoot — every "connection settles" beat) · `tap` 500/30/.6 · `rail` 110/28/.4 · `odometer` 300/30 · `sheet` 200/30 · `tilt` 150/15 · `knob` 400/32 · WebGL via `maath/easing.damp*` with R3F `delta`.

### 7.3 Vocabulary (`src/components/motion/*`)

**draw** (`scaleX/scaleY` or `pathLength`) · **goLive** (`--rule` → `--copper`, 200 ms) · **pulse** (48 px highlight travels a line, 900 ms) · **seat** · **print** (`clip-path: inset(0 100% 0 0) → 0`, 320–600 ms; replaces all per-character typing) · **rise** (word masks) · **wake / sleep** (screens, 240 ms crossfade) · **roll** (mono odometer) · **swap** (masked label) · **stamp** (`--ease-stamp` + drop-shadow impression) · **packet** (`offset-path`, else frame-bus sampling of an SVG path) · **tear** · **unDraw**. Banned: magnetic buttons, curved footers, spotlight sidebars, particle/fluid wallpapers, custom cursors, letter splits, marquees, autoplay video, scroll hijacking. Stagger: parent-owned (`when: 'beforeChildren'`, `delayChildren: stagger(…)`); lists 30–60 ms, words 75 ms, cards 120 ms; max 8–10 staggered then together; exits `stagger(.02, { from: 'last' })`; `AnimatePresence` always keyed; `layoutId`s scoped in `<LayoutGroup id>`.

### 7.4 Scene engine contract (`src/lib/scene/`)

```tsx
const p = useSceneProgress(ref, { mode: 'pin' | 'flow' | 'timed', duration?: 7000 })
<Scene progress={p} beats={{ connect: [0, .1], chat: [.1, .36], call: [.36, .5] }}>
  <Beat id="chat" mode="scrub">{(t) => <Thread t={t} />}</Beat>
  <Beat id="call" mode="trigger" enter={0.5} exit={0.4}>{(on) => <AnimatePresence initial={false}>…</AnimatePresence>}</Beat>
</Scene>
```

`scrub` beats are pure functions of the clamped local `t` (scrolling back rewinds); `trigger` beats are threshold states with hysteresis (enter > .5, exit < .4) and interruptible layout animations — used for every `layoutId` morph, re-sort and sheet; time-based micro-motion (typing dots, waveforms) runs on the frame bus only while its beat is active and in view; on phones and for Replay the same `<Scene>` runs on `animate(progress, 1, { duration })` with ⏸/↺; under reduced motion `progress = 1`. Pinned markup: `<section style="height: Nsvh"><div class="pin" style="position: sticky; top: 0; height: 100svh">` with the **section** as the `useScroll` target; no `overflow` other than `visible/clip` and no transforms/filters on ancestors; `main { overflow-x: clip }`; `align-self: start` on sticky children.

### 7.5 One frame bus and ownership

DOM motion runs on Motion's `frame` loop and `useAnimationFrame((t, delta))` (clock, waveform, DOM packets, now-line); WebGL on R3F's loop with `frameloop="demand"` + `invalidate()`. Measure once (`ResizeObserver`, `fonts.ready`); per-frame work is arithmetic on refs/MotionValues, never React state. One transform writer per element (outer wrapper = reveal/scroll, inner = hover/tilt); `perspective` once per section container; `preserve-3d` containers never carry `overflow`, `opacity < 1` or `filter`; `will-change` toggled from script only.

### 7.6 Reduced motion (a designed state, same DOM)

Sources: `prefers-reduced-motion` or `html[data-motion="reduced"]`. `<MotionConfig reducedMotion="user">` plus `useReducedMotion()` for custom values (parallax → 0; tilt, specular, sheen, idle, packets and timers off; scenes at completed state + Replay; WebGL poster). CSS belt-and-braces: `@media (prefers-reduced-motion: reduce), html[data-motion="reduced"] { .reveal, .mask > *, .print { opacity: 1 !important; transform: none !important; clip-path: none !important } ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important } html { scroll-behavior: auto } }`. Scroll-linked **state** (spine fill, date window, step index) still follows scroll.

## 8. Performance and accessibility rules

1. Animate only `transform`, `opacity`, `clip-path`, `filter`; `drop-shadow()` not `box-shadow`; never animate borders, width, height, padding or radius.
2. Four pins (≤ 10 pinned viewports); `100svh` for pins, never `dvh`; `scrollbar-gutter: stable`; reserved `min-height` for mask swaps.
3. Visibility gating everywhere (`useInView`, `document.visibilityState`, `frames={1}` on off-screen Views); `content-visibility: auto` on §11, §12, §14 and the footer only; no fixed full-viewport grain/orb/blur layers; `backdrop-filter` only on the header pill.
4. Budgets: initial JS ≤ 200 KB gz, 3D chunk ≤ 350 KB gz lazy after the preloader, fonts ≤ 180 KB, posters ≤ 120 KB each, page ≤ 3 MB; LCP < 1.5 s on prerendered hero text; CLS < .05; INP < 100 ms; 60 fps DOM scenes on a mid-range Android under 4× CPU throttle, ≥ 45 fps hero at T1 — enforced by `size-limit` and Lighthouse at 360/390/430/1024/1440, both themes.
5. **Prerender**: `scripts/prerender.mjs` renders the SPA with Playwright (`?prerender=1`: preloader off, scenes complete) into static `index.html`/`404.html`, so HTML reads without JS, `mailto:`/`tel:` work and LCP is the headline; time-dependent text renders only after mount with zero hydration warnings.
6. CSS scroll-driven animations only inside `@supports (animation-timeline: view())`, finished state as default, Motion primary; three in its own chunk, `React.lazy` for the Canvas and heavy sections; self-hosted `/gpu/` benchmarks; no CDN presets or screenshot services.
7. Accessibility: keyboard paths for every hover (scene index as `role="tablist"`, rail ←/→, phones via their cards), focus-trapped `<dialog>` with return focus, word-level splits, counters announced once, `sr-only` mirrors for every miniature and the 3D stack, 44 px targets, "Skip this scene" on every pin, "View as text" on code, pause on every loop, NVDA + VoiceOver pass.
8. Stylelint fails on `overflow-x: hidden` or transforms on stage ancestors; `scripts/lint-claims.mjs` fails on any `%`, `★`, "installs" or version string outside `asOf`-stamped store data; `scripts/verify-links.mjs` fails on any non-200 URL; ChildcarePro and Ghousia are typed without a `url` field.

## 9. Content map (fact → section)

Name, role, Mohali, contacts → §1, §16, header, dock · 3+ years and the core stack → §1, §3, §10 · Vedic Vaibhav Dot Com Pvt Ltd, Technical Lead, Aug 2024 – Sep 2026 → §1, §4, §5–§8, §12, §13 · vedicvaibhav.com → §2, §4, §5; vedicshop.store, panditjiatrequest.com → §2, §4, §7 · astrovaibhav.com chat & call, Kundali, WebSockets, per-minute billing, wallet, Razorpay, AI automation → §3, §4, §6 · six Play apps, three App Store apps, package/bundle IDs, versions (store listings, Oct 2026) → §2, §7, §12 · ChildcarePro (résumé only) → §4, §8 · architecture end to end, code reviews, releases, business & sales ops → §3, §4 matrix, §12, §14 · Mind2Web LLP, Service Points, PHP→Node, MySQL→MongoDB, Redis Pub/Sub chat, chatbot optimisation → §4, §9, §13 · Impavid internship, four sites, Angular apps; Heart Disease Predictor, E-Commerce Web App → §11, §13 · skills → §10 only · B.Tech CSE, IKGPTU Mohali Campus-1, 2019–2023, CGPA 8.03 → §13, §14. Never stated: ChildcarePro link/customers, a CIN, a founding year, Astro Vaibhav on iOS, model accuracies, raw install counts, testimonials, LinkedIn (until supplied).

## 10. File and component architecture

```
D:\Rahul-Portfolio
├─ index.html            pre-paint theme/boot script, font preloads, meta color-scheme / theme-color
├─ public/               fonts/ · posters/ · gpu/benchmarks.json · Rahul-Rajput-Resume.pdf · 404.html
├─ scripts/              prerender.mjs · posters.mjs · verify-links.mjs · lint-claims.mjs
├─ tests/                pins · scrub-back · themes · reduced-motion · a11y (Playwright + axe)
└─ src/
   ├─ main.tsx · App.tsx (section order, MotionConfig, LayoutGroup, lazy CanvasRoot)
   ├─ styles/            tokens.css · theme.css · type.css · motion.css · base.css
   ├─ data/              content.ts (facts with source, asOf, flags) · content.types.ts · derived.ts (counts, "used in" index)
   ├─ lib/               theme.ts · motionPrefs.ts · tier.ts · frameBus.ts · scene/ (useSceneProgress, Scene, Beat) · scrollspy.ts
   ├─ components/chrome/ Preloader · Header · SectionIndicator · ContentsDialog · ThemeToggle · PowerReserve · Spine · Dock · Footer · SkipLink · MotionSwitch
   ├─ components/motion/ Rise · Print · Draw · Pulse · Seat · Roll · Swap · Stamp · Packet · Tear · Settle · WakeScreen
   ├─ components/ui/     Button · Chip · Ledger · PhoneFrame · BrowserPane · Tooltip · Details · SegmentedControl · StepIndex
   ├─ components/scenes/ BookingBoard · ConsultationThread · InstrumentPanel · KundaliStream · ChildcareLedger · CodeMorph · DataLiquefy · FanOut · InferenceRun · OrderTimeline · Blueprint
   ├─ components/sections/ 01-HeroSection … 16-Contact
   └─ three/             CanvasRoot · HeroMovement · Phone · Plates · Traces · Packets · Bearings · ShadowCatcher · StudioRig · DevicesShelf · screenPainter.ts · labelAtlas.ts · materials.ts · tiers.ts · CssStack · HeroPoster
```

Config: `vite.config.ts` with `manualChunks: { three: ['three'] }`, Pages base path, `@tailwindcss/vite`; `size-limit` (initial 200 KB, three 350 KB); env `VITE_FORM_ENDPOINT`. Dependencies: three 0.182.0, @react-three/fiber 9.8.2, @react-three/drei 10.7.9, maath 0.10.8, motion ^12, zustand, the three @fontsource packages; no GSAP, Lenis, postprocessing or troika.

## 11. Acceptance checklist

- [ ] No Lenis; `main { overflow-x: clip }`; four pins (160/280/240/260 svh) verified at 1280/1440/1600 with step index, Next ↓ and Skip-scene; phones un-pin (Case 01 sticky phone excepted).
- [ ] Hero: "Rahul Rajput" is the display line; plate labels legible in the still frame and all four posters at 360 and 1600 px; plates open until p .5; poster beneath the Canvas in every tier, crossfaded on first frame, restored on context loss; the mobile hero never shrinks the stage or drops the lead.
- [ ] Scrub beats rewind on scroll-back; trigger beats have hysteresis and leave no half-flown element; both themes keep text pairs ≥ 4.5:1, ground-on-accent buttons and theme-constant devices, with a 700 ms wipe (rig damping underneath), an instant CSS fallback and a `meta theme-color` update.
- [ ] Reduced motion (OS or site switch): final states everywhere, Replay/⏸ present, no loops, poster hero with "Render the movement".
- [ ] No custom cursor, marquee, skew or magnetic buttons; metallic text only on the footer echo and 404 numeral; watch vocabulary only in Winding / power-reserve tooltip / Caseback / "In working order."; skills once.
- [ ] `content.ts` is the only source of claims, every fact with `source`; store figures only with `asOf` + `showStoreFigures`; claims lint and link check pass; Résumé PDF linked from header, Contents and contact; ChildcarePro/Ghousia unlinked; no Astro Vaibhav iOS; no LinkedIn until supplied; "Simulated — illustrative values" on every demo.
- [ ] Prerendered HTML holds all copy in final state with zero hydration warnings; LCP < 1.5 s, CLS < .05, INP < 100 ms at 360/390/430/1024/1440 × both themes; initial JS ≤ 200 KB gz, three chunk ≤ 350 KB gz; 60 fps DOM scenes under 4× CPU throttle on a mid-range Android.
- [ ] axe clean; keyboard reaches every control; focus returns after the dialog; word-level splits only; loops > 5 s pausable; NVDA and VoiceOver pass; preloader hands off via `layoutId` as a curtain sibling and the hero starts on `onExitComplete`.