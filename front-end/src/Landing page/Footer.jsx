import React from "react";
import first from "../../public/footer-image/first-2.jfif";
import second from "../../public/footer-image/second-1.jfif";
import last from "../../public/footer-image/last-3.jfif";

export default function Footer() {
  return (
    <>
      <div className="main-footer container mx-auto px-4">
        <div className="upper grid grid-cols-1">
          {/* Story Section */}
          <div className="Our-story">
            <div className="flex text-4xl justify-center">
              <p className="text-orange-400 text-center  px-1 pb-4 font-semibold">
                our
              </p>
              <p className="text-center ">story</p>
            </div>
            <p
              className="text-center md:text-base text-sm  pb-3"
              style={{ fontFamily: '"Noto Serif", serif' }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              quas totam vel ipsum et! <br /> Deserunt magni odit omnis, sequi
              dolore natus tempora, architecto repellendus totam voluptatibus
              fugiat distinctio? Unde, velit.
            </p>
            <p
              className="text-center md:text-base text-sm  pb-3"
              style={{ fontFamily: '"Noto Serif", serif' }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam
              delectus fuga perferendis impedit pariatur quod adipisci sed
              ducimus fugiat corporis! Maxime voluptatem doloribus nesciunt enim
              neque tempore, architecto quae quod!
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

      {/* Footer Section */}
      <div className="last footer bg-orange-200 h-75 pt-10 mt-10 text-center">
        <div
          className="flex justify-center text-bold text-4xl md:text-5xl"
          style={{ fontFamily: '"Dancing Script", cursive' }}
        >
          <p className="text-orange-400 titel noto-serif px-1 font-bold">
            Gech
          </p>
          <p className="text-xl noto-serif titel md:text-2xl pt-3 font-bold">
            Beauty Salon
          </p>
        </div>
        <p
          className="md:text-base text-sm pt-5 pb-3 font-bold"
          style={{ fontFamily: '"Noto Serif", serif' }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quod
          <br />
          unde tenetur cupiditate sapiente.
        </p>
      </div>
    </>
  );
}
