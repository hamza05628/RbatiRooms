// src/components/Filter.js

import React from 'react';

const Filter = ({ cityFilter, setCityFilter, budgetFilter, setBudgetFilter, sortByBudget, setSortByBudget }) => {
  return (
    <div className="filter-section">
      <div className="filter-group">
        <label>Filtrer par ville:</label>
        <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
          <option value="">Toutes les villes</option>
          <option value="Marrakech">Marrakech</option>
          <option value="Casablanca">Casablanca</option>
          <option value="Agadir">Agadir</option>
          {/* Add more cities as options */}
        </select>
      </div>

      <div className="filter-group">
        <label>Budget minimum:</label>
        <input
          type="number"
          placeholder="Entrez un budget minimum"
          value={budgetFilter}
          onChange={(e) => setBudgetFilter(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Trier par budget:</label>
        <input
          type="checkbox"
          checked={sortByBudget}
          onChange={(e) => setSortByBudget(e.target.checked)}
        /> 
        Sort by budget
      </div>

      <button onClick={() => { setCityFilter(''); setBudgetFilter(''); setSortByBudget(false); }}>
        Réinitialiser le filtre
      </button>
    </div>
  );
};

export default Filter;
