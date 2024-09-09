/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

const UpdateUser = ({ company_id, user_id, username, role }) => {
  // État pour gérer les entrées du formulaire
  const [formData, setFormData] = useState({
    username: username,
    role: role,
    company_id: company_id,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordChangeForm = () => {
    setIsPasswordChangeVisible((prevVisible) => !prevVisible);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.put(
        `http://localhost:4000/api/auth/create/${user_id}`,
        formData
      );
      console.log("Utilisateur mis à jour:", response.data);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", err);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/api/auth/update-password/${user_id}`,
        passwords
      );
      console.log("Mot de passe modifié:", response.data);
      setPasswords({ currentPassword: "", newPassword: "" }); // Réinitialisez les champs après succès
    } catch (err) {
      console.error("Erreur lors de la modification du mot de passe", err);
    }
  };

  return (
    <>
      {role === "admin" && <form onSubmit={handleSubmit}>
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
        <button type="submit">Modifier l&apos;utilisateur</button>
      </form>}

      {/* Bouton pour afficher/masquer le formulaire de modification de mot de passe */}
      {role === "admin" && <button onClick={togglePasswordChangeForm}>
        {isPasswordChangeVisible ? "Annuler la modification du mot de passe" : "Modifier le mot de passe"}
      </button>}

      {/* Formulaire pour changer le mot de passe */}
      {(isPasswordChangeVisible || role === "personal") && (
        <form onSubmit={handleChangePassword}>
          <div>
            <label htmlFor="currentPassword">Nouveau mot de passe</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label htmlFor="newPassword">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Changer le mot de passe</button>
        </form>
      )}
    </>
  );
};

export default UpdateUser;
