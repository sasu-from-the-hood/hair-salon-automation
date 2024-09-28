import React from 'react'

function Hero() {
  return (
    <div className="flex flex-col justify-center items-center w-full md:w-[979px] h-[378px] mx-auto text-center p-2 md:p-4">
        <p className='font-bold text-3xl md:text-6xl'>We show your <span className="text-orange-500">skin, hair</span> and<br /><span className="text-orange-500">body</span> the care and attention<br /></p>
        <p className="text-orange-500 font-bold text-3xl md:text-6xl">they deserve</p>
      </div>
  )
}

export default Hero