import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Work from './sections/Work'
import Contact from './sections/Contact'
import ServiceSummary from './sections/ServiceSummary'

/**
 * Main App Component
 * Portfolio structure:
 * - Hero: 3D planet background with intro
 * - ServiceSummary: Animated text marquee of services
 * - Services: Full service cards with sticky scroll
 * - About: Personal bio section
 * - Work: Portfolio projects showcase
 * - Contact: Contact form and info
 */
function App() {
  return (  
    <>
      <Navbar/>
      <Hero/>
      <ServiceSummary/>
      <Services/>
      <About/>
      <Work/>
      <Contact/>  
    </>
  )
}

export default App