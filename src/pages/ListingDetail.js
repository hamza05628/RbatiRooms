import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import WhatsAppModal from '../components/WhatsAppModal';
import { AuthContext } from '../context/AuthContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import '../pages/Zoom.css'; // Custom zoom CSS for image

function ListingDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id, location.pathname]);

  const fetchListing = async () => {
    try {
      const apiEndpoint = location.pathname.includes('demandes')
        ? `/demandes/${id}`
        : `/offres/${id}`;
      const res = await api.get(apiEndpoint);
      setListing(res.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching listing details.');
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      const apiEndpoint = location.pathname.includes('demandes')
        ? `/demandes/${id}`
        : `/offres/${id}`;
      await api.delete(apiEndpoint);
      alert('Listing deleted successfully');
      navigate('/listings');
    } catch (error) {
      alert('Error deleting listing');
    }
  };

  if (loading)
    return (
      <div className="loading-container flex justify-center items-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="loader border-t-blue-600 border-4 border-gray-300 rounded-full w-16 h-16 animate-spin mb-4"></div>
          <div className="loading-text flex space-x-2 text-2xl font-semibold text-gray-600 animate-bounce">
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div>
        </div>
      </div>
    );

  if (error) return <p>{error}</p>;
  if (!listing) return <p>No listing found.</p>;

  const isOwner = user && user._id === listing.owner._id;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{listing.title}</h1>
      
      {/* Flex/Grid Container for Image and Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Image Section */}
        <div className="w-full">
          {listing.images && listing.images.length > 0 && (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              spaceBetween={30}
              centeredSlides={true}
              slidesPerView={1}
              className="rounded-lg shadow-lg"
            >
              {listing.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Zoom>
                    <img
                      src={`http://localhost:5000${image}`}
                      alt={`${listing.title} - Image ${index + 1}`}
                      className="w-full h-auto max-h-[500px] object-contain mt-4 rounded"
                    />
                  </Zoom>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <p className="text-lg font-semibold"><strong>Description:</strong> {listing.description}</p>
          <p className="text-lg"><strong>Ville:</strong> {listing.location.city}</p>

          {location.pathname.includes('demandes') ? (
            <>
              <p className="text-lg"><strong>Budget:</strong> {listing.budget ? `${listing.budget} MAD` : 'Budget not available'}</p>
              <p className="text-lg"><strong>Disponibilité:</strong> {listing.disponibilite}</p>
              <p className="text-lg"><strong>À propos:</strong> {listing.apropos || 'N/A'}</p>
              <p className="text-lg"><strong>Intérêts:</strong> {Array.isArray(listing.interets) ? listing.interets.join(', ') : 'N/A'}</p>
              <p className="text-lg"><strong>Langues:</strong> {listing.langues || 'N/A'}</p>
            </>
          ) : (
            <>
              <p className="text-lg"><strong>Quartier:</strong> {listing.location.address}</p>
              <p className="text-lg"><strong>Durée:</strong> {listing.duree}</p>
              <p className="text-lg"><strong>Places Disponibles:</strong> {listing.placesDisponibles}</p>
              <p className="text-lg"><strong>Disponibilité:</strong> {listing.disponibilite}</p>
              <p className="text-lg"><strong>Type de Logement:</strong> {listing.typeLogement}</p>
              <p className="text-lg"><strong>Budget:</strong> {listing.budget ? `${listing.budget} MAD` : 'Budget not available'}</p>
            </>
          )}

          {/* Action Buttons */}
          {isOwner && (
            <div className="mt-6 flex space-x-4">
              <Link
                to={`/edit-listing/${location.pathname.includes('offres') ? 'offres' : 'demandes'}/${listing._id}`}
                className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}

          {/* WhatsApp Button */}
          <div className="flex justify-start mt-6">
            <button
              onClick={toggleModal}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-blue-600"
            >
              Show WhatsApp Number
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        phoneNumber={listing.whatsapp}
      />
    </div>
  );
}

export default ListingDetail;
