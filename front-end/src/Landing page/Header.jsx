import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import vector from '../images/icon/vector.png';
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src={vector} alt="Company Logo" className="h-8 w-8 md:h-10 md:w-10" />
          <div className="flex flex-col leading-tight">
            <p className="text-2xl md:text-3xl font-bold" style={{ fontFamily: '"Dancing Script", cursive' }}>Gech</p>
            <p className="text-sm md:text-base text-orange-500 font-bold" style={{ fontFamily: '"Dancing Script", cursive' }}>Beauty Salon</p>
          </div>
        </div>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-base text-orange-500 hover:text-gray-500 font-bold">Home</Link>
          <Link to="/service" className="text-base text-black hover:text-gray-500 font-bold">Service</Link>
          <Link to="/about-us" className="text-base text-black hover:text-gray-500 font-bold">About Us</Link>
          <Link to="/contact-us" className="text-base text-black hover:text-gray-500 font-bold">Contact Us</Link>
        </nav>
        
        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-500">Login</Link>
          <Link to="/signup" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-500">Sign Up</Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full right-0 w-full p-4 space-y-4">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-base text-orange-500 hover:text-gray-500 font-bold" onClick={toggleMenu}>Home</Link>
            <Link to="/service" className="text-base text-black hover:text-gray-500 font-bold" onClick={toggleMenu}>Service</Link>
            <Link to="/about-us" className="text-base text-black hover:text-gray-500 font-bold" onClick={toggleMenu}>About Us</Link>
            <Link to="/contact-us" className="text-base text-black hover:text-gray-500 font-bold" onClick={toggleMenu}>Contact Us</Link>
            <Link to="/login" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-500" onClick={toggleMenu}>Login</Link>
            <Link to="/signup" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-500" onClick={toggleMenu}>Sign Up</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
