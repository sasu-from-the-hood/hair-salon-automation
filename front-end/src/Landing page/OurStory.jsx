import React from "react";
import first from "../../public/footer-image/first-2.jfif";
import second from "../../public/footer-image/second-1.jfif";
import last from "../../public/footer-image/last-3.jfif";

export default function OurStory() {
  return (
    <div>
      <div className="main-footer container mx-auto px-4">
        <div className="upper grid grid-cols-1">
          {/* Story Section */}
          <div className="Our-story">
            <div className="flex text-4xl justify-center">
              <p className="text-orange-400 text-center px-1 pb-4 font-semibold">
                our
              </p>
              <p className="text-center">story</p>
            </div>
            <p
              className="text-center md:text-base text-sm pb-3"
              style={{ fontFamily: '"Noto Serif", serif' }}
            >
              At Gech Hair Salon, we are passionate about celebrating and
              enhancing your natural beauty through tailored hair care and
              innovative styling.
              <br />
              Our team of skilled professionals is dedicated to creating looks
              that reflect your personal style, whether you’re seeking a trendy
              cut, vibrant color,
              <br />
              or a custom design crafted just for you. We take the time to
              understand your needs and vision, ensuring that every service is a
              collaboration aimed
              <br />
              at making you look and feel your best.
            </p>
            <p
              className="text-center md:text-base text-sm pb-3"
              style={{ fontFamily: '"Noto Serif", serif' }}
            >
              Our salon is not just a place for hair care; it’s a space where
              you can relax and rejuvenate. With a welcoming atmosphere and a
              focus on delivering
              <br />
              high-quality services, we aim to make each visit an experience of
              indulgence and satisfaction. From the moment you walk through our
              doors to the final <br /> reveal of your look, we strive to
              provide a level of care that ensures your hair remains healthy,
              vibrant, and styled to perfection.
            </p>
          </div>

          {/* Image Section */}
          <div className="image-section justify-center mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 md:px-40">
            <img className="w-full mb-3" src={first} alt="first" />
            <img className="w-full mb-3" src={second} alt="second" />
            <img className="w-full mb-3" src={last} alt="last" />
          </div>
        </div>
      </div>
    </div>
  );
}



