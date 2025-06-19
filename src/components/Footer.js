import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-gray-800 to-blue-800 p-6.75 shadow-lg">
      <div className="container mx-auto px-16">
        <div className="flex justify-between items-center flex-col md:flex-row">
          {/* Logo and Site Links */}
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/images/Keys.png" 
              alt="DarCharfa Logo" 
              className="w-20 h-auto mr-4"
            />
            <p className="text-white font-semibold">&copy; 2024 DarCharfa</p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4 text-lg">
            <Link to="/about" className="hover:text-white font-bold text-1xl transition duration-300">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-white font-bold text-1xl transition duration-300 ">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
