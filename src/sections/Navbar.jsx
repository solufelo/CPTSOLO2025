import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { socials } from '../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-scroll'

function Navbar() {
  const navRef = useRef(null)
  const linksRef = useRef([])
  const contactRef = useRef(null)
  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const menuButtonRef = useRef(null) // Reference for the hamburger button
  const tl = useRef(null)
  const iconTl = useRef(null)
  const lastScrollY = useRef(0) // Track last scroll position
  const [isOpen, setIsOpen] = useState(false) // State to control the open/close of the navbar
  const [showButton, setShowButton] = useState(true) // State to show/hide hamburger button on scroll  
  useGSAP(() => {
    // Set initial state: navbar off-screen to the right
    gsap.set(navRef.current, { xPercent: 100 });
    
    // Set initial state: links and contact info invisible and offset
    gsap.set(linksRef.current, { autoAlpha: 0, x: -20 });
    gsap.set(contactRef.current, { autoAlpha: 0, x: -20 });

    // Create timeline animation (paused by default, will be triggered by menu button)
    tl.current = gsap.timeline({ paused: true })
    .to(navRef.current, { 
      xPercent: 0, 
      duration: 0.6, 
      ease: "power3.Out" 
    })
    .to(linksRef.current, { 
      autoAlpha: 1, 
      x: 0, 
      stagger: 0.05, // Faster stagger for quicker sequential animation
      duration: 0.3, // Faster duration
      ease: "power2.Out" 
    }, "-=0.5") // Start much earlier - text appears almost immediately with navbar
    .to(contactRef.current, { 
      autoAlpha: 1, 
      x: 0, 
      duration: 0.3, // Faster duration
      ease: "power2.Out" 
    }, "-=0.4"); // Start almost at the same time as links
    
    // Separate timeline for hamburger icon animation
    iconTl.current = gsap.timeline({ paused: true })
    .to(topRef.current, {
      rotation: 45,
      y: 3.3,
      duration: 0.3,
      ease: "power2.inOut"
    }, 0) // Start at time 0
    .to(bottomRef.current, {
      rotation: -45,
      y: -3.3,
      duration: 0.3,
      ease: "power2.inOut"
    }, 0); // Start at the same time as top 
  });
// Effect to hide/show hamburger button on scroll
useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Hide button when scrolling down, show when scrolling up
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setShowButton(false); // Hide button on scroll down
    } else if (currentScrollY < lastScrollY.current) {
      setShowButton(true); // Show button on scroll up
    }
    
    lastScrollY.current = currentScrollY; // Update last scroll position
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, [showButton]);

// Animate button visibility
useEffect(() => {
  if (menuButtonRef.current) {
    gsap.to(menuButtonRef.current, {
      opacity: showButton ? 1 : 0,
      y: showButton ? 0 : -20,
      duration: 0.3,
      ease: "power2.inOut"
    });
  }
}, [showButton])  
  useEffect(() => { // Effect to play/reverse the timeline animation based on the isOpen state
    if (isOpen) {
      tl.current.play() // Play the timeline animation
      
      // Animate hamburger to X
      iconTl.current.play()
    } else {
      tl.current.reverse() // Reverse the timeline animation
      
      // Animate X back to hamburger
      iconTl.current.reverse()
    }
  }, [tl, isOpen])

  // Toggle menu function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
                    <Link 
                      to={item}
                      spy={true}
                      smooth='easeInOutCubic'
                      offset={0}
                      duration={1000}
                      onClick={() => setIsOpen(false)}
                      className='hover:text-gold transition-all duration-300 cursor-pointer'
                    >
                      {item}
                    </Link>
                  </div>
              ))}
          </div>
        </div>

        {/* Contact Information Section */}
        <div ref={contactRef} className='flex flex-col flex-wrap gap-4 md:flex-row md:justify-between'> 
          {/* Email */}
          <div className='font-light text-pretty'>
            <p className='tracking-wider text-white/50'>E-MAIL</p>
            <a 
              className='text-lg md:text-xl tracking-widest lowercase text-pretty hover:text-gold transition-colors' 
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

      {/* Hamburger Menu Button */}
      <div 
        ref={menuButtonRef}
        onClick={toggleMenu}
        className='fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black
        rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10 hover:bg-white/10'>
        <span ref={topRef} className='block w-8 h-0.5 bg-white rounded-full origin-center'></span>
        <span ref={bottomRef} className='block w-8 h-0.5 bg-white rounded-full origin-center'></span>
      </div>
    </>
  );
}

export default Navbar;