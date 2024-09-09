/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "./admin.scss";
import axios from "axios";
import ConnectionPage from "./ConnectionPage";
import MenuPage from "./MenuPage";
import HeaderAdmin from "./headerAdmin/headerAdmin";

const Admin = () => {
  // État pour gérer la visibilité des différents formulaires et sections
  const [openForm, setOpenForm] = useState({
    initMenu: true,
    createProduct: false,
    updateProduct: false,
    getOrders: false,
    updateUser: false,
  });

  // État pour stocker les informations de l'utilisateur connecté
  const [user, setUser] = useState({
    username: null,
    right: null,
    company_id: null,
  });

  // État pour gérer les entrées du formulaire d'authentification
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });

  // Fonction pour changer l'état des formulaires affichés
  const handleForm = (form) => {
    setOpenForm({
      initMenu: form === "initMenu",
      createProduct: form === "createProduct",
      updateProduct: form === "updateProduct",
      getOrders: form === "getOrders",
      createUser: form === "createUser",
      updateUser: form === "updateUser",
      tableOrder: form === "tableOrder"
    });
  };

  // Fonction pour déconnecter l'utilisateur
  const deconnexion = () => {
    setUser({
      username: null,
      right: null,
      company_id: null,
    });
    console.log("Vous êtes déconnecté");
  };

  // Fonction pour gérer la soumission du formulaire d'authentification
  const handleFormAuthentification = async (e) => {
    e.preventDefault();

    try {
      // Envoyer une requête POST à l'API d'authentification
      const response = await axios.post(
        "http://localhost:4000/api/auth",
        formInput
      );

      // Récupérer les données de la réponse
      const data = response.data;

      // Afficher les données dans la console (ou gérer les données comme nécessaire)
      console.log(data);

      // Mettre à jour l'état utilisateur avec les données reçues
      setUser({
        username: data.username,
        right: data.user_right,
        company_id: data.company_id,
      });
    } catch (err) {
      console.log("Une erreur est survenue lors de la récupération", err);
    }
  };

  // Fonction pour gérer les changements dans les entrées du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="admin-page">
      <HeaderAdmin
        user={user}
        OnClickDeconnection={deconnexion}
        openForm={openForm}
        onHomeClick={() => handleForm("initMenu")}
        onClickUpdateInfo={() => handleForm("updateUser")}
        onClickAddUser={() => handleForm("createUser")}

      />
      {/* Affichage de la page de connexion si aucune société n'est connectée */}
      {!user.company_id && (
        <ConnectionPage
          formInput={formInput}
          handleChange={handleChange}
          handleFormAuthentification={handleFormAuthentification}
        />
      )}

      {/* Affichage des options de navigation si l'utilisateur est admin ou personal */}
      {(user.right === "admin" || user.right === "personal") && (
        <MenuPage user={user} openForm={openForm} handleForm={handleForm} />
      )}
    </div>
  );
};

export default Admin;
