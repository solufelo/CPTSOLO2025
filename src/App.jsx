import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Works from './sections/Works'
import ContactSummary from './sections/ContactSummary'
import Contact from './sections/Contact'
import ServiceSummary from './sections/ServiceSummary'

/**
 * Main App Component
 * Portfolio structure:
 * - Hero: 3D planet background with intro
 * - ServiceSummary: Animated text marquee of services
 * - Services: Full service cards with sticky scroll
 * - About: Personal bio section
 * - Works: Portfolio projects showcase
 * - ContactSummary: CTA section with brand values
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
      <Works/>
      <ContactSummary/>
      <Contact/>  
    </>
  )
}

export default App