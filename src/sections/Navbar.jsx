import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { socials } from '../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-scroll'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { isAuthEnabled } from '../lib/featureFlags'
import ThemeSwitch from '../components/ThemeSwitch'

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
  const location = useLocation() // Get current route location
  const isVoiceTagsPage = location.pathname === '/voice-tags' // Check if on voice tags page
  const isBlogPage = location.pathname.startsWith('/blog') // Check if on blog page or blog post
  const isMainPage = location.pathname === '/' // Check if on main portfolio page
  const { user, signOut } = useAuth() // Get user authentication state  
  const { theme } = useTheme() // Get current theme
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

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close if menu is open and click is outside the nav and not on the hamburger button
      if (
        isOpen && 
        navRef.current && 
        !navRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    // Add event listener when menu is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Toggle menu function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav
      ref={navRef}
      id="primary-nav"
      aria-label="Main navigation"
      className={`fixed z-50 flex flex-col justify-between w-full
      h-full px-10 uppercase py-28 overflow-y-auto overscroll-contain
      gap-y-10 md:w-1/2 md:left-1/2
      ${theme === 'glass' 
        ? 'bg-[var(--theme-navbar-bg)] backdrop-blur-xl text-white/90' 
        : theme === 'light'
        ? 'bg-white text-gray-900 border-l border-gray-200'
        : 'bg-black text-white/80'
      }`}>
        <div className="flex-1">
          {/* Availability status — repurposed header space */}
          <div className={`mb-10 flex items-center gap-2 text-xs md:text-sm tracking-[0.25em] uppercase ${
            theme === 'light' ? 'text-gray-500' : 'text-white/50'
          }`}>
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-emerald-500 animate-ping"></span>
              <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500"></span>
            </span>
            Available for work
          </div>

          {/* Primary navigation */}
          <div className='flex flex-col text-5xl gap-y-1 md:text-6xl lg:text-7xl font-display font-bold'>
              {["home", "about", "services", "work", "contact"].map((item, index) => (
                  <div key={index} ref={el => linksRef.current[index] = el}>
                    {isMainPage ? (
                      <Link 
                        to={item}
                        spy={true}
                        smooth='easeInOutCubic'
                        offset={0}
                        duration={1000}
                        onClick={() => setIsOpen(false)}
                        className={`transition-all duration-300 cursor-pointer ${
                          theme === 'light' ? 'hover:text-blue-600' : 'hover:text-gold'
                        }`}
                      >
                        {item}
                      </Link>
                    ) : (
                      <RouterLink 
                        to={`/#${item}`}
                        onClick={() => setIsOpen(false)}
                        className={`transition-all duration-300 cursor-pointer ${
                          theme === 'light' ? 'hover:text-blue-600' : 'hover:text-gold'
                        }`}
                      >
                        {item}
                      </RouterLink>
                    )}
                  </div>
              ))}
          </div>

          {/* Secondary links — smaller, grouped to cut clutter */}
          <div
            ref={el => { linksRef.current[5] = el; }}
            className={`mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base font-display font-bold uppercase tracking-widest ${
              theme === 'light' ? 'text-gray-500' : 'text-white/50'
            }`}
          >
            <RouterLink
              to="/demo"
              onClick={() => setIsOpen(false)}
              className={`transition-colors cursor-pointer ${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-gold'}`}
            >
              demos
            </RouterLink>
            <span className="opacity-30">/</span>
            {isVoiceTagsPage ? (
              <a
                href="#voice-tags"
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false); }}
                className={`transition-colors cursor-pointer ${theme === 'light' ? 'text-blue-600' : 'text-gold'}`}
              >
                voice tags
              </a>
            ) : (
              <RouterLink
                to="/voice-tags"
                onClick={() => setIsOpen(false)}
                className={`transition-colors cursor-pointer ${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-gold'}`}
              >
                voice tags
              </RouterLink>
            )}
            <span className="opacity-30">/</span>
            <RouterLink
              to="/blog"
              onClick={() => setIsOpen(false)}
              className={`transition-colors cursor-pointer ${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-gold'}`}
            >
              blog
            </RouterLink>

            {/* Account links — hidden until Python API is live (VITE_ENABLE_AUTH=true) */}
            {isAuthEnabled && (
              <>
                <span className="opacity-30">/</span>
                {user ? (
                  <>
                    {(user.email === 'solomonolufelo@outlook.com' || user.email?.includes('admin')) && (
                      <RouterLink to="/dashboard/admin" onClick={() => setIsOpen(false)} className={`transition-colors cursor-pointer ${theme === 'light' ? 'text-blue-600' : 'text-gold'}`}>
                        admin
                      </RouterLink>
                    )}
                    <RouterLink to="/dashboard" onClick={() => setIsOpen(false)} className={`transition-colors cursor-pointer ${theme === 'light' ? 'text-blue-600' : 'text-gold'}`}>
                      dashboard
                    </RouterLink>
                    <button onClick={() => { signOut(); setIsOpen(false); }} className={`transition-colors cursor-pointer ${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-gold'}`}>
                      sign out
                    </button>
                  </>
                ) : (
                  <>
                    <RouterLink to="/login" onClick={() => setIsOpen(false)} className={`transition-colors cursor-pointer ${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-gold'}`}>
                      login
                    </RouterLink>
                    <RouterLink to="/signup" onClick={() => setIsOpen(false)} className={`transition-colors cursor-pointer ${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-gold'}`}>
                      sign up
                    </RouterLink>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Contact Information Section - Always visible at bottom */}
        <div ref={contactRef} className={`flex flex-col flex-wrap gap-4 md:flex-row md:justify-between mt-auto pt-8 border-t ${
          theme === 'light' ? 'border-gray-200' : 'border-white/20'
        }`}> 
          {/* Email */}
          <div className='font-light text-pretty'>
            <p className={`tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-white/70'}`}>E-MAIL</p>
            <a 
              className={`text-lg md:text-xl tracking-widest lowercase text-pretty transition-colors ${
                theme === 'light' 
                  ? 'text-gray-900 hover:text-blue-600' 
                  : 'text-white hover:text-gold'
              }`}
              href="mailto:work@captainsolo.ca"
            >
              work@captainsolo.ca
            </a>
          </div>

          {/* Social Media */}
          <div className='font-light'>
            <p className={`tracking-wider mb-2 ${theme === 'light' ? 'text-gray-500' : 'text-white/70'}`}>Social Media</p>
            <div className='flex flex-col gap-x-2 flex-wrap md:flex-row'>
              {socials.map((item, index) => (
                <a 
                  key={index} 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-sm leading-loose tracking-widest uppercase text-pretty transition-all duration-300 ${
                    theme === 'light'
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-white/90 hover:text-gold'
                  }`}
                >
                  {"{ "}
                  {item.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>  
        </div>
      </nav>

      {/* Theme Switch & Hamburger Menu Button */}
      <div className="fixed z-50 flex items-center gap-3 top-4 right-10">
        {/* Theme Switch */}
        <ThemeSwitch />
        
        {/* Hamburger Menu Button */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-300
          rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20
          ${theme === 'glass'
            ? 'bg-white/10 backdrop-blur-md hover:bg-white/20'
            : theme === 'light'
            ? 'bg-white border border-gray-200 hover:bg-gray-50'
            : 'bg-black hover:bg-white/10'
          }`}>
          <span aria-hidden="true" ref={topRef} className={`block w-8 h-0.5 rounded-full origin-center ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}`}></span>
          <span aria-hidden="true" ref={bottomRef} className={`block w-8 h-0.5 rounded-full origin-center ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}`}></span>
        </button>
      </div>
    </>
  );
}

export default Navbar;