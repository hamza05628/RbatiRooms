import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const EditOffre = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ville, setVille] = useState('');
  const [quartier, setQuartier] = useState('');
  const [duree, setDuree] = useState('');
  const [placesDisponibles, setPlacesDisponibles] = useState('');
  const [budget, setBudget] = useState('');
  const [disponibilite, setDisponibilite] = useState('');
  const [typeLogement, setTypeLogement] = useState('');
  const [numero, setNumero] = useState('');
  const [existingImages, setExistingImages] = useState([]); // For existing images
  const [newImages, setNewImages] = useState([]); // For new images

  useEffect(() => {
    fetchOffreDetails(); // Fetch listing details when component loads
  }, [id]);

  // Fetch the existing offre details
  const fetchOffreDetails = async () => {
    try {
      const res = await api.get(`/offres/${id}`);
      const offre = res.data;

      setTitle(offre.title);
      setDescription(offre.description);
      setVille(offre.location.city);
      setQuartier(offre.location.address);
      setDuree(offre.duree);
      setPlacesDisponibles(offre.placesDisponibles);
      setBudget(offre.budget);
      setDisponibilite(offre.disponibilite);
      setTypeLogement(offre.typeLogement);
      setNumero(offre.whatsapp);
      setExistingImages(offre.images); // Store existing images
    } catch (error) {
      console.error('Error fetching offre:', error);
    }
  };

  // Handle new image uploads
  const handleImageChange = (e) => {
    setNewImages([...e.target.files]); // Handle multiple file uploads
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('ville', ville);
    formData.append('quartier', quartier);
    formData.append('duree', duree);
    formData.append('placesDisponibles', placesDisponibles);
    formData.append('budget', budget);
    formData.append('disponibilite', disponibilite);
    formData.append('typeLogement', typeLogement);
    formData.append('numero', numero);

    // Append each image file to FormData
    newImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await api.put(`/offres/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/listings/offres/${id}`);
    } catch (error) {
      console.error('Error updating offre:', error);
      alert('Error updating offre. Please try again.');
    }
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Offre</h2>

      {/* Form inputs */}
      <input type="text" placeholder="Title" className="w-full p-2 mb-4 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" className="w-full p-2 mb-4 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input
        type="text"
        placeholder="Durée"
        className="w-full p-2 mb-4 border rounded"
        value={duree}
        onChange={(e) => setDuree(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type de Logement"
        className="w-full p-2 mb-4 border rounded"
        value={typeLogement}
        onChange={(e) => setTypeLogement(e.target.value)}
      />
      <input
        type="number"
        placeholder="Places Disponibles"
        className="w-full p-2 mb-4 border rounded"
        value={placesDisponibles}
        onChange={(e) => setPlacesDisponibles(e.target.value)}
      />
      <input
        type="number"
        placeholder="Budget"
        className="w-full p-2 mb-4 border rounded"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Disponibilité"
        className="w-full p-2 mb-4 border rounded"
        value={disponibilite}
        onChange={(e) => setDisponibilite(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="WhatsApp"
        className="w-full p-2 mb-4 border rounded"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />

      {/* Display existing images */}
      {existingImages.length > 0 && (
        <div className="mb-4">
          <h3>Current Images:</h3>
          <div className="flex space-x-2">
            {existingImages.map((img, index) => (
              <img key={index} src={`http://localhost:5000${img}`} alt="Existing" className="w-20 h-20 object-cover" />
            ))}
          </div>
        </div>
      )}

      {/* New image input */}
      <input type="file" accept="image/*" onChange={handleImageChange} multiple />

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update Offre</button>
    </form>
  );
};

export default EditOffre;
