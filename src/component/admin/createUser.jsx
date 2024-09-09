/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

const CreateUser = ({ company_id }) => {
  // État pour gérer les entrées du formulaire
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "personal",
    company_id: company_id,
  });

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/create",
        formData
      );
      console.log("Produit créé:", response.data);
      // Réinitialisez le formulaire après le succès
      setFormData({
        username: "",
        role: "personal",
        password: "",
        company_id: company_id,
      });
    } catch (err) {
      console.error("Erreur lors de la création de l'utilisateur", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Champ pour entrer le nom d'utilisateur */}
      <div>
        <label htmlFor="username">Nom d&apos;utilisateur</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      {/* Champ pour entrer le mot de passe */}
      <div>
        <label htmlFor="username">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      {/* Sélecteur pour choisir le rôle de l'utilisateur */}
      <div>
        <label htmlFor="role">Rôle</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="personal">Personnel</option>
          <option value="admin">Administrateur</option>
        </select>
      </div>

      {/* Bouton pour soumettre le formulaire */}
      <button type="submit">Créer l&apos;utilisateur</button>
    </form>
  );
};

export default CreateUser;
