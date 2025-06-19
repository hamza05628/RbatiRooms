import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ city, minPrice, maxPrice });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="City" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Min Price" 
        value={minPrice} 
        onChange={(e) => setMinPrice(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Max Price" 
        value={maxPrice} 
        onChange={(e) => setMaxPrice(e.target.value)} 
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
