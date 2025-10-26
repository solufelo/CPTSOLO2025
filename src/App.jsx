import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Contact from './sections/Contact'
import ServiceSummary from './sections/ServiceSummary'
function App() {
  return (  
    <>
      <Navbar/>
      <Hero/>
      <ServiceSummary/>
      <About/>
      <Work/>
      <Contact/>  
    </>
  )
}

export default App