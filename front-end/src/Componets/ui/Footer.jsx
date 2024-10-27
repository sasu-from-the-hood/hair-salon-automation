import React from "react";
import icon from "/footer-image/Vector.png";

export default function Footer() {
  return (
    <>
      <div className="last footer bg-orange-200 h-75 pt-10 mt-10 text-center">
        <div className="flex justify-center mb-4">
          <img src={icon} alt="icon" />
        </div>
        <div
          className="flex justify-center text-bold text-4xl md:text-5xl"
          style={{ fontFamily: '"Dancing Script", cursive' }}
        >
          <p className=" titel noto-serif px-1 font-bold">Gech</p>
          <p className="text-xl noto-serif titel text-orange-400 md:text-2xl pt-3 font-bold">
            Beauty Salon
          </p>
        </div>
        <p
          className="md:text-base text-sm pt-5 pb-3 font-bold"
          style={{ fontFamily: '"Noto Serif", serif' }}
        >
          at Gech Hair Salon, your hair's health and beauty are our top
          priorities. <br />
          Whether you’re after a fresh new style or maintaining your current
          look, we are committed to <br />
          giving you a personalized and enjoyable salon experience that leaves
          you feeling confident and refreshed.
        </p>
      </div>
    </>
  );
}
