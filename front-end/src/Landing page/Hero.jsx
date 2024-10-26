import React, { useState } from 'react';
import rectangle from "../images/services/rectangle.png";
import wash from "../images/services/wash.jpg";
import brush from "../images/services/images.png";
import download from "../images/services/download.png";

function Hero() {
  const slides = [
    { url: rectangle },
    { url: wash },
    { url: brush },
    { url: download }
  ];

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <>
      {/* Hero Text Section */}
      <div className="flex flex-col justify-center items-center w-full max-w-4xl h-auto mx-auto text-center p-4 md:p-6 lg:p-8">
        <p className="font-bold text-2xl md:text-4xl lg:text-6xl">
          We show your <span className="text-orange-500">skin, hair</span> and<br />
          <span className="text-orange-500">body</span> the care and attention<br />
        </p>
        <p className="text-orange-500 font-bold text-2xl md:text-4xl lg:text-6xl">they deserve</p>
        <button className="mt-6 md:mt-8 lg:mt-10 px-6 py-2 md:px-8 md:py-3 bg-black text-white font-bold rounded-full">
          Book now
        </button>
      </div>

      {/* Carousel Section */}
      <div className="relative w-full max-w-screen-lg h-60 md:h-96 lg:h-[666px] mx-auto overflow-hidden rounded-lg">
        <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full" onClick={prevSlide}>❮</button>
        <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full" onClick={nextSlide}>❯</button>

        {/* Slide Images */}
        {slides.map((slide, index) => (
          <div className={index === current ? 'block' : 'hidden'} key={index}>
            <img src={slide.url} alt="slide image" className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Carousel Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === current ? 'bg-black' : 'bg-gray-400'}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero;
