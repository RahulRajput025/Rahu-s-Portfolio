import { MotionConfig } from 'motion/react'
import { SkipLink } from '@/components/chrome/SkipLink'
import { Header } from '@/components/chrome/SiteHeader'
import { Footer } from '@/components/chrome/SiteFooter'
import Hero from '@/components/sections/Hero'
import Work from '@/components/sections/Work'
import Expertise from '@/components/sections/Expertise'
import Contact from '@/components/sections/Contact'

/** Who → where and what was shipped (work, inside each employer) → expertise → the ask (contact). */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <Expertise />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
