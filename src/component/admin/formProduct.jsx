/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import './formProduct.scss'

const FormProduct = ({company_id}) => {
  // Définir l'état pour chaque champ du formulaire
  const [nomPlat, setNomPlat] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [sousCategorie, setSousCategorie] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = {
      name: nomPlat,
      description: description,
      category: categorie,
      sub_category: sousCategorie,
      price: price,
      company_id: company_id,
    };

    try {
      const response = await axios.post('http://localhost:4000/api/menu', productData);
      console.log('Produit créé:', response.data);
      setSuccess(true);
      // Réinitialisez le formulaire après le succès
      setNomPlat('');
      setDescription('');
      setCategorie('');
      setSousCategorie('');
      setPrice('');
    } catch (err) {
      console.error('Erreur lors de la création du produit:', err);
      setError('Erreur lors de la création du produit');
    }
  };

  return (
    <form  className='formProduct' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nomPlat">Nom du plat :</label>
        <input
          type="text"
          id="nomPlat"
          value={nomPlat}
          onChange={(e) => setNomPlat(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description :</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='(optionnel)'
    
        />
      </div>
      <div>
        <label htmlFor="categorie">Catégorie :</label>
        <input
          type="text"
          id="categorie"
          list="categories"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          required
        />
        <datalist id="categories">
          <option value="Boisson" />
          <option value="Entrée" />
          <option value="Plat Principal" />
          <option value="Dessert" />
        </datalist>
      </div>
      <div>
        <label htmlFor="sousCategorie">Sous-catégorie :</label>
        <input
          type="text"
          id="sousCategorie"
          list="sousCategories"
          value={sousCategorie}
          onChange={(e) => setSousCategorie(e.target.value)}
          required
        />
        <datalist id="sousCategories">
          <option value="Salade" />
          <option value="Soupe" />
          <option value="Grillades" />
          <option value="Pâtes" />
        </datalist>
      </div>
      <div>
        <label htmlFor="Price">Prix du produit :</label>
        <input
          type="number"
          id="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Soumettre</button>
      
      {/* Afficher le message de succès ou d'erreur */}
      {success && <p>Produit créé avec succès!</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default FormProduct;
