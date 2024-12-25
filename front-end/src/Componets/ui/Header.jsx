import React, { useState } from "react";
import { Link } from "react-router-dom";
import vector from "../../Assets/images/icon/vector.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-3 sm:p-4 lg:p-6">
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            <img
              src={vector}
              alt="Company Logo"
              className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
            />
            <p
              className="text-lg sm:text-xl lg:text-2xl font-bold"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              Gech
            </p>
            <p
              className="text-xs sm:text-sm lg:text-base text-orange-500 font-bold"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              BEAUTYSALON
            </p>
          </div>

          {/* Hamburger menu for mobile */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-black focus:outline-none"
          >
            ☰
          </button>

          {/* Navigation links for larger screens */}
          <nav className="hidden lg:flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
            <Link
              to="/"
              className="text-sm lg:text-base xl:text-lg text-orange-500 hover:text-gray-500 font-bold"
            >
              Home
            </Link>
            <Link
              to="/service"
              className="text-sm lg:text-base xl:text-lg text-black hover:text-gray-500 font-bold"
            >
              Service
            </Link>
            <Link
              to="/about-us"
              className="text-sm lg:text-base xl:text-lg text-black hover:text-gray-500 font-bold"
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="text-sm lg:text-base xl:text-lg text-black hover:text-gray-500 font-bold"
            >
              Contact Us
            </Link>
          </nav>

          {/* Login and Sign-up buttons for larger screens */}
          <div className="hidden lg:flex flex-row lg:space-x-3 xl:space-x-4">
            <Link
              to="/login"
              className="w-[100px] h-[40px] sm:w-[120px] lg:w-[140px] xl:w-[160px] bg-black text-white rounded-tl-[2px] border border-black hover:bg-gray-500 flex items-center justify-center"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="w-[100px] h-[40px] sm:w-[120px] lg:w-[140px] xl:w-[160px] bg-black text-white rounded-tl-[2px] border border-black hover:bg-gray-500 flex items-center justify-center"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <nav className="flex flex-col space-y-2 p-4 bg-white shadow-md absolute right-0 w-3/4 sm:w-2/3 md:w-1/2">
            <Link
              to="/"
              className="text-sm text-orange-500 hover:text-gray-500 font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/service"
              className="text-sm text-black hover:text-gray-500 font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Service
            </Link>
            <Link
              to="/about-us"
              className="text-sm text-black hover:text-gray-500 font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="text-sm text-black hover:text-gray-500 font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/login"
              className="px-2 py-1 bg-black text-white rounded hover:bg-gray-500 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-2 py-1 bg-black text-white rounded hover:bg-gray-500 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
