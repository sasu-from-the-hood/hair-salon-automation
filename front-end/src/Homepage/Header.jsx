import React, { useEffect } from 'react';
import vector from '../Homepage/image/vector.png';

function Header() {
  useEffect(() => {
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    const toggleMenu = () => {
      if (dropdownMenu.classList.contains('hidden')) {
        dropdownMenu.classList.remove('hidden');
      } else {
        dropdownMenu.classList.add('hidden');
      }
    };

    menuToggle.addEventListener('click', toggleMenu);


    return () => {
      menuToggle.removeEventListener('click', toggleMenu);
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-2 md:p-4">
          <div className="flex items-center space-x-1 md:space-x-2">
            <img src={vector} alt="Company Logo" className="h-6 w-6 md:h-8 md:w-8" />
            <p className="text-xl md:text-2xl font-bold">GECH</p>
            <p className="text-sm md:text-base text-orange-500">BEAUTYSALON</p>
          </div>
          
          <input type="checkbox" id="menu-toggle" className="hidden" />
          <label htmlFor="menu-toggle" className="md:hidden text-black cursor-pointer">
            ☰
          </label>

          <nav className="hidden md:flex flex-col md:flex-row md:space-x-4">
            <a href="/" className="text-sm md:text-base text-orange-500 hover:text-gray-500 font-bold">Home</a>
            <a href="/service" className="text-sm md:text-base text-black hover:text-gray-500 font-bold">Service</a>
            <a href="/about-us" className="text-sm md:text-base text-black hover:text-gray-500 font-bold">About Us</a>
            <a href="/contact-us" className="text-sm md:text-base text-black hover:text-gray-500 font-bold">Contact Us</a>
          </nav>
          
          <div className="hidden md:flex flex-col md:flex-row md:space-x-4">
            <a href="/login" className="px-2 py-1 md:px-4 md:py-2 bg-black text-white rounded hover:bg-gray-500">Login</a>
            <a href="/signup" className="px-2 py-1 md:px-4 md:py-2 bg-black text-white rounded hover:bg-gray-500">Sign Up</a>
          </div>
        </div>

        <div className="md:hidden">
          <nav className="flex flex-col space-y-2 p-2 bg-white shadow-md hidden absolute right-0" id="dropdown-menu">
            <a href="/" className="text-sm text-orange-500 hover:text-gray-500 font-bold">Home</a>
            <a href="/service" className="text-sm text-black hover:text-gray-500 font-bold">Service</a>
            <a href="/about-us" className="text-sm text-black hover:text-gray-500 font-bold">About Us</a>
            <a href="/contact-us" className="text-sm text-black hover:text-gray-500 font-bold">Contact Us</a>
            <a href="/login" className="px-2 py-1 bg-black text-white rounded hover:bg-gray-500">Login</a>
            <a href="/signup" className="px-2 py-1 bg-black text-white rounded hover:bg-gray-500">Sign Up</a>
          </nav>
        </div>
      </header>
      <div className="flex flex-col justify-center items-center w-full md:w-[979px] h-[378px] mx-auto text-center p-2 md:p-4">
        <p className='font-bold text-3xl md:text-6xl'>We show your <span className="text-orange-500">skin, hair</span> and<br /><span className="text-orange-500">body</span> the care and attention<br /></p>
        <p className="text-orange-500 font-bold text-3xl md:text-6xl">they deserve</p>
      </div>
    </>
  );
}

export default Header;