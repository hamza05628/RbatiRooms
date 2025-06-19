import React, { useState } from 'react';
import api from '../utils/api';

function ReviewForm({ userId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reviews', { reviewed: userId, rating, comment });
      alert('Review submitted successfully');
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review', error);
      alert('Failed to submit review');
    }
  };

  return (
    <form onSubmit={submitReview}>
      <h3>Leave a Review</h3>
      <div>
        <label>Rating (1-5):</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />
      </div>
      <div>
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
