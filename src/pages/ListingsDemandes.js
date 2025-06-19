import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

function ListingsDemandes() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cityFilter, setCityFilter] = useState(''); // City filter state
  const [sortByRecent, setSortByRecent] = useState(false); // Sorting state

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    try {
      const response = await api.get('/demandes');
      setDemandes(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching requests.');
      setLoading(false);
    }
  };

  if (loading) return <p>Loading roommate requests...</p>;
  if (error) return <p>{error}</p>;

  // Filter and sort the requests
  let filteredDemandes = demandes.filter(demande => {
    return cityFilter === '' || demande.location?.city === cityFilter;
  });

  if (sortByRecent) {
    filteredDemandes = filteredDemandes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Roommate Requests</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Are you looking to join a shared living space? Browse the requests to find a living arrangement that suits you.
      </p>

      {/* Filter Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-1/2">
          <label className="text-sm text-gray-600 mb-2 block">Filter by City</label>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full border border-gray-300 bg-white text-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Cities</option>
            {[...new Set(demandes.map(demande => demande.location?.city))].map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/2 flex items-center">
          <label className="text-sm text-gray-600 mr-3">Sort by Most Recent</label>
          <button
            onClick={() => setSortByRecent(!sortByRecent)}
            className={`transition-colors duration-200 text-sm px-4 py-2 rounded-md border ${
              sortByRecent ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {sortByRecent ? 'Most Recent' : 'Sort by Recent'}
          </button>
        </div>
      </div>

      {/* Listings Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDemandes.map((demande) => (
          <div key={demande._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {demande.imageUrl && (
              <img 
                src={`http://localhost:5000${demande.imageUrl}`}
                alt={demande.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{demande.title}</h2>
              <p className="text-gray-600 mb-1"><strong>City:</strong> {demande.location?.city || 'Unknown City'}</p>
              <p className="text-gray-600 mb-2"><strong>Budget:</strong> {demande.budget ? `${demande.budget} MAD` : 'Not available'}</p>
              <Link to={`/listings/demandes/${demande._id}`} className="text-blue-500 flex justify-center mt-4 font-semibold hover:underline">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListingsDemandes;
