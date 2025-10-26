import React from 'react'
import Navbar from './sections/Navbar'
function App() {
  return (
    <div className='relative w-full overflow-x-hidden'>
      <Navbar/>
      <main className='relative w-full overflow-x-hidden'>  
        {/* Home Section */}
        <section id='home' className='min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center'>
          <h1 className='text-6xl md:text-8xl text-white font-bold uppercase'>Home</h1>
        </section>
        
        {/* About Section */}
        <section id='about' className='min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center'>
          <h1 className='text-6xl md:text-8xl text-white font-bold uppercase'>About</h1>
        </section>
        
        {/* Services Section */}
        <section id='services' className='min-h-screen bg-gradient-to-br from-purple-900 to-purple-600 flex items-center justify-center'>
          <h1 className='text-6xl md:text-8xl text-white font-bold uppercase'>Services</h1>
        </section>
        
        {/* Work Section */}
        <section id='work' className='min-h-screen bg-gradient-to-br from-green-900 to-green-600 flex items-center justify-center'>
          <h1 className='text-6xl md:text-8xl text-white font-bold uppercase'>Work</h1>
        </section>
        
        {/* Contact Section */}
        <section id='contact' className='min-h-screen bg-gradient-to-br from-red-900 to-red-600 flex items-center justify-center'>
          <h1 className='text-6xl md:text-8xl text-white font-bold uppercase'>Contact</h1>
        </section>
      </main>
    </div>
  )
}

export default App