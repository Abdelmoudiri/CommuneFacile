import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="bg-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-800 hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-blue-600 font-medium">
            About us
          </Link>
          <div className="relative group">
            <Link to="/services" className="text-gray-800 hover:text-blue-600 font-medium flex items-center">
              Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          <Link to="/testimonials" className="text-gray-800 hover:text-blue-600 font-medium">
            Testimonials
          </Link>
        </nav>
        
        <div className="flex space-x-4">
          <Link to="/register" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            Register
          </Link>
          <Link to="/signin" className="border border-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;