import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For toggling the mobile menu

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle the mobile menu
  };

  return (
    <header className="bg-gradient-to-r from-blue-800 via-gray-800 to-blue-800 p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl sm:text-2xl flex items-center space-x-3">
          <img src="/images/Keys.png" alt="App Logo" className="h-8 sm:h-10" />
          <span>Home</span>
        </Link>

        {/* Full Menu for Medium+ Screens */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/listings" className="text-white hover:text-blue-300 transition duration-300">Listings</Link>
          {user ? (
            <>
              <button
                onClick={toggleModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Create New
              </button>
              {isModalOpen && (
                <div className="modal-overlay fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                  <div className="modal-content bg-white p-6 rounded-lg shadow-xl w-11/12 sm:w-1/2 lg:w-1/3">
                    <h3 className="text-xl font-semibold mb-4">Select an Option</h3>
                    <div className="flex justify-around mb-4 space-x-4">
                      <Link to="/create-listing/offres">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300" onClick={toggleModal}>Listings</button>
                      </Link>
                      <Link to="/create-listing/demandes">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300" onClick={toggleModal}>Requests</button>
                      </Link>
                    </div>
                    <button className="text-red-500 hover:text-red-700 transition duration-300" onClick={toggleModal}>Close</button>
                  </div>
                </div>
              )}
              <Link to="/profile" className="text-white hover:text-blue-300 transition duration-300">Profile</Link>
              <button onClick={logout} className="text-white hover:text-red-300 transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-blue-300 transition duration-300">Login</Link>
              <Link to="/register" className="text-white hover:text-blue-300 transition duration-300">Register</Link>
            </>
          )}
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 right-0 w-full bg-blue-900 text-white shadow-lg">
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link to="/listings" className="text-white hover:text-blue-300 transition duration-300" onClick={toggleMenu}>Listings</Link>
              {user ? (
                <>
                  <button
                    onClick={() => {
                      toggleModal();
                      toggleMenu();
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                  >
                    Create Listing
                  </button>
                  <Link to="/profile" className="text-white hover:text-blue-300 transition duration-300" onClick={toggleMenu}>Profile</Link>
                  <button onClick={() => {
                    logout();
                    toggleMenu();
                  }} className="text-white hover:text-red-300 transition duration-300">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:text-blue-300 transition duration-300" onClick={toggleMenu}>Login</Link>
                  <Link to="/register" className="text-white hover:text-blue-300 transition duration-300" onClick={toggleMenu}>Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
