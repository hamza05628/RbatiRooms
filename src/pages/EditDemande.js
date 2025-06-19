import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const EditDemande = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [demande, setDemande] = useState({
    title: '',
    description: '',
    ville: '',
    budget: '',
    disponibilite: '',
    apropos: '',
    interets: '',
    langues: '',
    whatsapp: '',
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    fetchDemande();
  }, [id]);

  const fetchDemande = async () => {
    try {
      const res = await api.get(`/demandes/${id}`);
      const fetchedDemande = res.data;
      setDemande({
        title: fetchedDemande.title,
        description: fetchedDemande.description,
        ville: fetchedDemande.location.city,
        budget: fetchedDemande.budget,
        disponibilite: fetchedDemande.disponibilite,
        apropos: fetchedDemande.apropos,
        interets: fetchedDemande.interets,
        langues: fetchedDemande.langues,
        whatsapp: fetchedDemande.whatsapp,
      });
      setExistingImages(fetchedDemande.images || []);
    } catch (error) {
      console.error('Error fetching demande:', error);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(demande).forEach((key) => {
      formData.append(key, demande[key]);
    });

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await api.put(`/demandes/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/listings/demandes/${id}`);
    } catch (error) {
      console.error('Error updating demande:', error);
      alert('Error updating demande. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Demande</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-4 border rounded"
        value={demande.title}
        onChange={(e) => setDemande({ ...demande, title: e.target.value })}
        required
      />
      {/* Other input fields similar to above for description, ville, etc. */}
      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={handleImageChange}
        multiple
      />
      {existingImages.length > 0 && (
        <div className="mb-4">
          <h3>Existing Images:</h3>
          {existingImages.map((img, index) => (
            <img key={index} src={`http://localhost:5000${img}`} alt="Existing" className="w-24 h-24 object-cover" />
          ))}
        </div>
      )}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Update Demande
      </button>
    </form>
  );
};

export default EditDemande;
