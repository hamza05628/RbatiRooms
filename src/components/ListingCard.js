import React from 'react';
import { Link } from 'react-router-dom';

function ListingCard({ listing }) {
  const { _id, title, location, budget, imageUrl } = listing;

  return (
    <div className="listing-card">
      <Link to={`/listings/${_id}`}>
        {/* Display the image */}
        {imageUrl && (
          <img
            src={`http://localhost:5000${imageUrl}`} 
            alt={title}
            className="listing-card-img"  // Add this class for small image
          />
        )}
        <div className="listing-card-info">
          {/* Title, City, and Budget */}
          <h2>{title}</h2>
          <p><strong>City:</strong> {location.city}</p>
          <p><strong>Budget:</strong> {budget} MAD</p>
        </div>
      </Link>
    </div>
  );
}

export default ListingCard;
