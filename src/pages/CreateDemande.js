import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const CreateDemande = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ville, setVille] = useState("");
  const [budget, setBudget] = useState("");
  const [disponibilite, setDisponibilite] = useState("");
  const [apropos, setApropos] = useState("");
  const [interets, setInterets] = useState("");
  const [langues, setLangues] = useState("");
  const [numero, setNumero] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Single file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ville", ville);
    formData.append("budget", budget);
    formData.append("disponibilite", disponibilite);
    formData.append("apropos", apropos);
    formData.append("interets", interets);
    formData.append("langues", langues);
    formData.append("numero", numero);
    formData.append("image", image); // Single image field

    try {
      const res = await api.post("/demandes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Demande created successfully!");
      navigate(`/listings/demandes/${res.data._id}`);
    } catch (error) {
      console.error("Error creating demande:", error);
      alert("Error creating demande. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create Demande</h2>
      {/* Form fields */}
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 mb-4 border rounded" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full p-2 mb-4 border rounded" />
      <input type="text" placeholder="Ville" value={ville} onChange={(e) => setVille(e.target.value)} required className="w-full p-2 mb-4 border rounded" />
      <input type="number" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} required className="w-full p-2 mb-4 border rounded" />
      <input type="text" placeholder="Disponibilité" value={disponibilite} onChange={(e) => setDisponibilite(e.target.value)} required className="w-full p-2 mb-4 border rounded" />
      <textarea placeholder="À propos" value={apropos} onChange={(e) => setApropos(e.target.value)} className="w-full p-2 mb-4 border rounded" />
      <textarea placeholder="Intérêts" value={interets} onChange={(e) => setInterets(e.target.value)} className="w-full p-2 mb-4 border rounded" />
      <input type="text" placeholder="Langues" value={langues} onChange={(e) => setLangues(e.target.value)} className="w-full p-2 mb-4 border rounded" />
      <input type="text" placeholder="WhatsApp" value={numero} onChange={(e) => setNumero(e.target.value)} className="w-full p-2 mb-4 border rounded" />
      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" required />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Create Demande</button>
    </form>
  );
};

export default CreateDemande;
