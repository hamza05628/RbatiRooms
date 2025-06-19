import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const CreateOffre = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ville, setVille] = useState("");
  const [quartier, setQuartier] = useState("");
  const [duree, setDuree] = useState("");
  const [placesDisponibles, setPlacesDisponibles] = useState("");
  const [budget, setBudget] = useState("");
  const [disponibilite, setDisponibilite] = useState("");
  const [typeLogement, setTypeLogement] = useState("");
  const [numero, setNumero] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    // Convert FileList to an array
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ville", ville);
    formData.append("quartier", quartier);
    formData.append("duree", duree);
    formData.append("placesDisponibles", placesDisponibles);
    formData.append("budget", budget);
    formData.append("disponibilite", disponibilite);
    formData.append("typeLogement", typeLogement);
    formData.append("numero", numero);

    // Append each image file to the formData
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await api.post("/offres", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Offre created successfully!");
      navigate(`/listings/offres/${res.data._id}`);
    } catch (error) {
      console.error("Error creating offre:", error.response ? error.response.data : error);
      alert("Error creating offre. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create Offre</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-4 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 mb-4 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ville"
        className="w-full p-2 mb-4 border rounded"
        value={ville}
        onChange={(e) => setVille(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Quartier"
        className="w-full p-2 mb-4 border rounded"
        value={quartier}
        onChange={(e) => setQuartier(e.target.value)}
      />
      <input
        type="text"
        placeholder="Durée"
        className="w-full p-2 mb-4 border rounded"
        value={duree}
        onChange={(e) => setDuree(e.target.value)}
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
        placeholder="Type de Logement"
        className="w-full p-2 mb-4 border rounded"
        value={typeLogement}
        onChange={(e) => setTypeLogement(e.target.value)}
      />
      <input
        type="text"
        placeholder="WhatsApp"
        className="w-full p-2 mb-4 border rounded"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={handleImageChange}
        multiple
        required
      />
      <div className="mb-4">
        {images.length > 0 && (
          <h3 className="text-lg font-semibold mb-2">Selected Images:</h3>
        )}
        <div className="flex flex-wrap">
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              className="w-24 h-24 object-cover m-1 border rounded"
            />
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Create Offre
      </button>
    </form>
  );
};

export default CreateOffre;
