import React from 'react';
import './ListingsModal.css'; // Import CSS for modal styling

const ListingsModal = ({ onClose, onSelect }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Discover Opportunities</h2>
        <p>
          Explore the various options available. Would you like to browse the roommate listings or view roommate requests?
        </p>
        <div className="modal-buttons">
          <button 
            className="modal-button" 
            onClick={() => { 
              onSelect('offres'); 
              onClose(); 
            }}
          >
            View Listings
          </button>
          <button 
            className="modal-button" 
            onClick={() => { 
              onSelect('demandes'); 
              onClose(); 
            }}
          >
            View Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingsModal;
