import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import vector from '../images/icon/vector.png';

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
    <div>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-2 md:p-4">
          <div className="flex items-center space-x-1 md:space-x-2">
            <img src={vector} alt="Company Logo" className="h-6 w-6 md:h-8 md:w-8" />
            <p className="text-xl md:text-2xl font-bold" style={{ fontFamily: '"Dancing Script", cursive' }}>Gech</p>
            <p className="text-sm md:text-base text-orange-500 font-bold" style={{ fontFamily: '"Dancing Script", cursive' }}>BEAUTYSALON</p>
          </div>
          
          <input type="checkbox" id="menu-toggle" className="hidden" />
          <label htmlFor="menu-toggle" className="md:hidden text-black cursor-pointer">
            ☰
          </label>

          <nav className="hidden md:flex flex-col md:flex-row md:space-x-20">
            <Link to="/" className="text-sm md:text-base text-orange-500 hover:text-gray-500 font-bold">Home</Link>
            <Link to="/service" className="text-sm md:text-base text-black hover:text-gray-500 font-bold">Service</Link>
            <Link to="/about-us" className="text-sm md:text-base text-black hover:text-gray-500 font-bold">About Us</Link>
            <Link to="/contact-us" className="text-sm md:text-base text-black hover:text-gray-500 font-bold">Contact Us</Link>
          </nav>
          
          <div className="hidden md:flex flex-col md:flex-row md:space-x-4">
            <Link 
              to="/login" 
              className="w-[160px] h-[54px] bg-black text-white rounded-tl-[2px] border-t border-l-0 border-r-0 border-b-0 border-black opacity-100 hover:bg-gray-500 flex items-center justify-center"
              style={{ padding: '10px 20px', gap: '10px' }}
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="w-[160px] h-[54px] bg-black text-white rounded-tl-[2px] border-t border-l-0 border-r-0 border-b-0 border-black opacity-100 hover:bg-gray-500 flex items-center justify-center"
              style={{ padding: '10px 20px', gap: '10px' }}
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="md:hidden">
          <nav className="flex flex-col space-y-2 p-2 bg-white shadow-md hidden absolute right-0" id="dropdown-menu">
            <Link to="/" className="text-sm text-orange-500 hover:text-gray-500 font-bold">Home</Link>
            <Link to="/service" className="text-sm text-black hover:text-gray-500 font-bold">Service</Link>
            <Link to="/about-us" className="text-sm text-black hover:text-gray-500 font-bold">About Us</Link>
            <Link to="/contact-us" className="text-sm text-black hover:text-gray-500 font-bold">Contact Us</Link>
            <Link to="/login" className="px-2 py-1 bg-black text-white rounded hover:bg-gray-500">Login</Link>
            <Link to="/signup" className="px-2 py-1 bg-black text-white rounded hover:bg-gray-500">Sign Up</Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
