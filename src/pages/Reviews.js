import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function Reviews({ userId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/${userId}`);
      setReviews(res.data);
    } catch (error) {
      console.error('Error fetching reviews', error);
    }
  };

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <p><strong>{review.reviewer.username}:</strong> {review.comment}</p>
              <p>Rating: {review.rating}/5</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}

export default Reviews;
