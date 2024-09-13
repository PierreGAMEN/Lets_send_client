/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/create",
        formData
      );
      if (response.data) {
        toast.success("L'utilisateur a été créé avec succès");
      }
      // Réinitialisez le formulaire après le succès
      setFormData({
        username: "",
        role: "personal",
        password: "",
        company_id: company_id,
      });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Champ pour entrer le nom d'utilisateur */}

      <h2>Création de profil</h2>
      <TextField
        autoFocus
        margin="dense"
        id="username"
        name="username"
        label="Nom d'utilisateur"
        type="text"
        fullWidth
        required
        onChange={handleChange}
        value={formData.username}
      />

      <TextField
        autoFocus
        margin="dense"
        id="password"
        name="password"
        label="Mot de passe"
        type="password"
        fullWidth
        required
        value={formData.password}
        onChange={handleChange}
      />

      <FormControl margin="dense" fullWidth>
        <InputLabel id="role">Rôle</InputLabel>
        <Select
          labelId="role"
          name="role"
          id="role"
          value={formData.role}
          label="role"
          onChange={handleChange}
        >
          <MenuItem value="personal">Personnel</MenuItem>
          <MenuItem value="admin">Administrateur</MenuItem>
        </Select>
      </FormControl>


      {/* Bouton pour soumettre le formulaire */}
      <button type="submit">Créer l&apos;utilisateur</button>
    </form>
  );
};

export default CreateUser;
