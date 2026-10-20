import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Split only what is actually imported: three.js (+ R3F/drei) in its own
        // lazily-loaded chunk, motion in another, React in the vendor chunk.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/node_modules\/(three|@react-three|three-stdlib|maath|camera-controls|stats-gl|zustand|suspend-react|its-fine)[/\\]/.test(id)) return 'three'
          if (/node_modules\/(motion|framer-motion|motion-dom|motion-utils)[/\\]/.test(id)) return 'motion'
          if (/node_modules\/(react|react-dom|scheduler)[/\\]/.test(id)) return 'react'
          return undefined
        },
      },
    },
  },
})
