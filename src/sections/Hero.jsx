import React, { useRef } from 'react'

function Hero() {
  const contextRef = useRef(null)
  return (
        <section id='home' className='flex flex-col justify-end min-h-screen'>
        <div ref={contextRef} className='w-full'>
            <div className='w-full'>
                <div className='flex flex-col justify-center gap-8 pt-16 pb-20 sm:gap-12'>
                    <div className='flex flex-col justify-end min-h-screen gap-6'>
                        {/* Tagline */}
                        <p className='text-sm font-light tracking-[0.5rem] uppercase px-10 text-black'>
                            404 No Bugs Found
                        </p>
                        
                        {/* Hero text container */}
                        <div className='px-10 flex flex-col gap-4'>
                            {/* Name - Large title */}
                            <h1 className='text-[68px] sm:text-[100px] md:text-[120px] lg:text-[152px] 
                            leading-[0.9] font-bold uppercase text-black tracking-tight'>
                                Solomon<br />Olufelo
                            </h1>
                            
                            {/* Description */}
                            <p className='text-lg md:text-xl lg:text-2xl text-black/70 max-w-2xl mt-4'>
                                I'm a full-stack developer and videographer based in Waterloo, ON.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero