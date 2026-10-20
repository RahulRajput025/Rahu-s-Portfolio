import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import { initTheme } from './lib/theme'
import { initMotionPrefs } from './lib/motionPrefs'
import App from './App'

initTheme()
initMotionPrefs()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
