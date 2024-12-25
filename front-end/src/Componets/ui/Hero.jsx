import React, { useState } from "react";

import rectangle from "../../Assets/images/services/rectangle.png";
import wash from "../../Assets/images/services/wash.jpg";
import brush from "../../Assets/images/services/images.png";
import download from "../../Assets/images/services/download.png";

function Hero() {
  const slides = [
    { url: rectangle },
    { url: wash },
    { url: brush },
    { url: download },
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
      <div className="flex flex-col justify-center items-center w-full max-w-[90%] md:max-w-[979px] h-auto md:h-[378px] mx-auto text-center p-4 md:p-6 lg:p-8">
        <p className="font-bold text-2xl md:text-4xl lg:text-6xl">
          We show your <span className="text-orange-500">skin, hair</span> and
          <br />
          <span className="text-orange-500">body</span> the care and attention
          <br />
        </p>
        <p className="text-orange-500 font-bold text-2xl md:text-4xl lg:text-6xl">
          they deserve
        </p>
        <button className="mt-6 md:mt-10 px-4 py-2 md:px-6 md:py-2 bg-black text-white font-bold rounded-full">
          Book now
        </button>
      </div>
      <div className="relative w-full max-w-[95%] md:max-w-[1312px] h-[50vh] md:h-[666px] mx-auto overflow-hidden rounded-[2px]">
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 md:p-3 rounded-full"
          onClick={prevSlide}
        >
          ❮
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 md:p-3 rounded-full"
          onClick={nextSlide}
        >
          ❯
        </button>
        {slides.map((slide, index) => (
          <div className={index === current ? "block" : "hidden"} key={index}>
            <img
              src={slide.url}
              alt="slide image"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                index === current ? "bg-black" : "bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero;
