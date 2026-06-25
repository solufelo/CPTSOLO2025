import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scroller } from 'react-scroll'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Works from './sections/Works'
import ContactSummary from './sections/ContactSummary'
import Contact from './sections/Contact'
import LogoHeader from './components/LogoHeader'

/**
 * Main App Component
 * Portfolio structure:
 * - Hero: 3D planet background with intro
 * - Services: Capability cards with inline previews
 * - About: Personal bio section
 * - Works: Portfolio projects showcase
 * - ContactSummary: CTA section with brand values
 * - Contact: Working contact form with EmailJS + contact info
 */
function App() {
  const location = useLocation()

  // Handle hash navigation when coming from other pages (e.g., from blog pages)
  useEffect(() => {
    if (location.hash) {
      // Remove the # from the hash
      const sectionId = location.hash.substring(1)
      
      // Map common section names to their IDs
      const sectionMap = {
        'home': 'home',
        'about': 'about',
        'services': 'services',
        'work': 'work',
        'contact': 'contact',
      }
      
      const targetId = sectionMap[sectionId] || sectionId
      
      // Wait for page to render and animations to complete, then scroll to section
      const scrollTimeout = setTimeout(() => {
        const element = document.getElementById(targetId)
        if (element) {
          scroller.scrollTo(targetId, {
            smooth: true,
            duration: 1000,
            offset: 0,
            delay: 100,
          })
        }
      }, 500)
      
      return () => clearTimeout(scrollTimeout)
    }
  }, [location.hash, location.pathname])

  return (  
    <>
      <LogoHeader/>
      <Navbar/>
      <Hero/>
      <Services/>
      <About/>
      <Works/>
      <ContactSummary/>
      <Contact/>  
    </>
  )
}

export default App