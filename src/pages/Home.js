import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import Modal from '../components/Modal';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    toggleModal();
  };

  const handleOptionSelect = (option) => {
    toggleModal();
    navigate(`/listings/${option}?city=${selectedCity}`);
  };

  return (
    <div className="bg-gray-100 py-10">
      {/* Hero Section */}
      <section className="text-center bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white shadow-lg">
        {/* Logo Integration */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/Keys.png"
            alt="DarCharfa Logo"
            className="w-24 md:w-32 h-auto hover:opacity-80 transition-opacity duration-300"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold">
          Welcome to <span className="text-yellow-300">RbatiRooms</span>
        </h1>
        <p className="mt-4 text-base md:text-lg max-w-xl mx-auto">
          Your platform to find and propose shared accommodations in Morocco. Click below to explore or create a listing.
        </p>
        <div className="mt-8 flex justify-center space-x-2 md:space-x-4">
          <Link
            to="/listings"
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg shadow-md transition duration-300"
          >
            Explore Listings
          </Link>
          <button
            onClick={toggleModal}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg shadow-md transition duration-300"
          >
            Create a Listing
          </button>
        </div>
      </section>

      {/* Modal for selecting listing type */}
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="modal-content bg-white p-6 rounded-lg shadow-xl w-11/12 sm:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Select an Option</h3>
            <div className="flex justify-around mb-4 space-x-4">
              <Link to="/create-listing/offres">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300" onClick={toggleModal}>Offres</button>
              </Link>
              <Link to="/create-listing/demandes">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300" onClick={toggleModal}>Demandes</button>
              </Link>
            </div>
            <button className="text-red-500 hover:text-red-700 transition duration-300" onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}

      {/* Image Slider Section */}
      <section className="mt-10 container mx-auto px-4 md:px-0">
        <ImageSlider onCityClick={handleCityClick} />
      </section>

      {/* Info Section */}
      <section className="text-center mt-12 px-4">
        <p className="text-base md:text-xl font-medium max-w-3xl mx-auto">
          We are committed to connecting people looking for shared accommodations in Morocco. Whether you are a student or someone seeking to share a living space, our platform helps you find the right match.
        </p>
        <p className="mt-6 text-lg font-bold text-gray-700">Thank you for choosing DarCharfa!</p>
      </section>
    </div>
  );
}

export default Home;
