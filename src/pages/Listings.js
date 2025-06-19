import React, { useState } from 'react';
import api from '../utils/api';  // API utility for making requests
import ListingCard from '../components/ListingCard';  // Importing ListingCard component
import ListingsModal from '../components/ListingsModal'; // Import the modal component
import { useNavigate } from 'react-router-dom'; // For navigation

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [showModal, setShowModal] = useState(true); // State to control modal visibility
  const navigate = useNavigate(); // Use navigate for routing

  const fetchListings = async (type) => {
    try {
      const res = await api.get(`/listings/${type}`); // Fetch listings based on type (offres/demandes)
      setListings(res.data);  // Update state with fetched listings
    } catch (error) {
      console.error('Error fetching listings', error);
    }
  };

  const handleSelect = (type) => {
    fetchListings(type); // Fetch listings based on selected type
    navigate(`/listings/${type}`); // Navigate to the selected type route
  };

  return (
    <div className="listings-page">
      <h1>Available Listings</h1>
      
      {showModal && (
        <ListingsModal
          onClose={() => setShowModal(false)} // Close modal function
          onSelect={handleSelect} // Function to handle selection
        />
      )}
      
      <div className="listings-grid">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />  // Render ListingCard for each listing
        ))}
      </div>
    </div>
  );
};

export default Listings;
