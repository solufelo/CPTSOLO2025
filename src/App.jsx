import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Pricing from './sections/Pricing'
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
 * - Pricing: Package pricing carousel with transparent rates
 * - About: Personal bio section
 * - Works: Portfolio projects showcase
 * - ContactSummary: CTA section with brand values
 * - Contact: Working contact form with EmailJS + contact info
 */
function App() {
  return (  
    <>
      <Navbar/>
      <Hero/>
      <ServiceSummary/>
      <Services/>
      <Pricing/>
      <About/>
      <Works/>
      <ContactSummary/>
      <Contact/>  
    </>
  )
}

export default App