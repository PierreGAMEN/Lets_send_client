/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import "./admin.scss";
import axios from "axios";
import ConnectionPage from "./ConnectionPage";
import MenuPage from "./MenuPage";
import HeaderAdmin from "./Header/headerAdmin";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const apiUrl = import.meta.env.VITE_API_URL;

const Admin = () => {
 
  const [openForm, setOpenForm] = useState({
    initMenu: true,
    createProduct: false,
    updateProduct: false,
    getOrders: false,
    updateUser: false,
  });


  const [user, setUser] = useState({
    username: null,
    right: null,
    company_id: null,
    user_id: null,
  });

  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });


  const handleForm = (form) => {
    setOpenForm({
      initMenu: form === "initMenu",
      createProduct: form === "createProduct",
      updateProduct: form === "updateProduct",
      getOrders: form === "getOrders",
      createUser: form === "createUser",
      updateUser: form === "updateUser",
      tableOrder: form === "tableOrder",
      createTable: form === "createTable",
      updateTable: form === "updateTable",
    });
  };

  // Fonction pour déconnecter l'utilisateur
  const deconnexion = () => {
    setUser({
      username: null,
      right: null,
      company_id: null,
      user_id: null
    });

    // Supprimer le token du cookie
    Cookies.remove("authToken");

  };

  // Fonction pour gérer la soumission du formulaire d'authentification
  const handleFormAuthentification = async (e) => {
    e.preventDefault();

    try {
      // Envoyer une requête POST à l'API d'authentification
      const response = await axios.post(
        `${apiUrl}/api/auth`,
        formInput,
        { withCredentials: true } // Pour s'assurer que les cookies sont envoyés avec la requête
      );

      // Récupérer les données de la réponse
      const data = response.data;

      // Vérifier si le token est reçu dans la réponse
      const token = data.token; // Assurez-vous que le backend envoie le token

      if (token) {
        // Stocker le token dans un cookie
        Cookies.set("authToken", token, { expires: 1 }); // Stockage pendant 1 jour
      }

      // Mettre à jour l'état utilisateur avec les données reçues
      setUser({
        username: data.username,
        right: data.right,
        company_id: data.company_id,
        user_id: data.id
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

  const token = Cookies.get("authToken");

  useEffect(() => {
    if (token) {
      const tokenValue = jwtDecode(token);
      setUser({
        username: tokenValue.username,
        right: tokenValue.right,
        company_id: tokenValue.company_id,
        user_id: tokenValue.id
      });
    }
    console.log(user)
  }, [token]);

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
