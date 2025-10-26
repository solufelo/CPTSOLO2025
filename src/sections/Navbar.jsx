import React from 'react'
import { useRef } from 'react'
import { socials } from '../constants'

function Navbar() {
  const navRef = useRef(null)
  const linksRef = useRef([])
  const contactRef = useRef(null)
  const topRef = useRef(null)
  const bottomRef = useRef(null)


  return (
    <>
      <nav
      ref={navRef}
      className="fixed z-50 flex flex-col justify-between w-full
      h-full px-10 uppercase bg-black text-white/80 py-28
      gap-y-10 md:w-1/2 md:left-1/2">
        <div>
          {/* Navigation Links */}
          <div className='flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-8xl'>
              {["home", "about", "services", "work", "contact"].map((item, index) => (
                  <div key={index} ref={el => linksRef.current[index] = el}>
                    <a className='hover:text-gold transition-all duration-300' href={`#${item}`}>
                      {item}
                    </a>
                  </div>
              ))}
          </div>
        </div>

        {/* Contact Information Section */}
        <div className='flex flex-col flex-wrap gap-4 md:flex-row md:justify-between'> 
          {/* Email */}
          <div className='font-light text-pretty'>
            <p className='tracking-wider text-white/50'>E-MAIL</p>
            <a 
              className='text-lg md:text-xl tracking-widest lowercase text-pretty hover:text-white transition-colors' 
              href="mailto:work@captainsolo.ca"
            >
              work@captainsolo.ca
            </a>
          </div>

          {/* Social Media */}
          <div className='font-light'>
            <p className='tracking-wider text-white/50 mb-2'>Social Media</p>
            <div className='flex flex-col gap-x-2 flex-wrap md:flex-row'>
              {socials.map((item, index) => (
                <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className='hover:text-gold transition-all duration-300 text-sm leading-loose tracking-widest uppercase text-pretty'>
                  {"{ "}
                  {item.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>  
        </div>
      </nav>

      <div className='fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black
      rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10'>
        <span ref ={topRef} className='block w-8 h-0.5 bg-white rounded-full origin-center'></span>
        <span ref ={bottomRef} className='block w-8 h-0.5 bg-white rounded-full origin-center'></span>
      </div>
    </>
  );
}

export default Navbar;