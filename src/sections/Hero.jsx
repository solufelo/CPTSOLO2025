import React, { useRef } from 'react'
import AnimatedHeaderSection from '../components/AnimatedHeaderSection'

function Hero() {
  const contextRef = useRef(null)
  const headerRef=useRef(null)
  const keywordsText = `Full-Stack Developer • Creative Technologist`
  const aboutText = `I help growing brands gain an unfair advantage through premium web development and video production.`
  const locationText = `Brampton, ON • Serving GTA • 1,400+ Projects`
  
  return (
    <section id='home' className='flex flex-col justify-end min-h-screen'>
      <AnimatedHeaderSection
        subTitle={keywordsText}
        title="Solomon Olufelo"
        text={aboutText}
        textColor="text-black"
      />
    </section>
  )
}

export default Hero