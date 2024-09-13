/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./updateProduct.scss";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProduct = ({company_id}) => {
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState(null); // État pour le produit à modifier
  const [showEditModal, setShowEditModal] = useState(false); // État pour afficher/masquer la modale

  const id_company = 1;

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/menu/${company_id}`
        );
        const data = response.data;

        // Organiser les données par catégorie et sous-catégorie
        const organizedMenu = {};

        data.forEach((item) => {
          const { category, sub_category } = item;

          if (!organizedMenu[category]) {
            organizedMenu[category] = {};
          }

          if (!organizedMenu[category][sub_category]) {
            organizedMenu[category][sub_category] = [];
          }

          organizedMenu[category][sub_category].push(item);
        });

        setMenu(organizedMenu);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, [id_company]);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/api/menu/product/${productId}`);
      toast.success("Le produit a été supprimé avec succès");
      setMenu((prevMenu) => {
        const newMenu = { ...prevMenu };
        for (let category in newMenu) {
          for (let subCategory in newMenu[category]) {
            newMenu[category][subCategory] = newMenu[category][
              subCategory
            ].filter((item) => item.id !== productId);
          }
        }
        return newMenu;
      });
    } catch (err) {
      toast.error("Le produit n'a pas pu être supprimé");
      setError("Erreur lors de la suppression du produit", err);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/menu/product/update/${editProduct.id}`,
        editProduct
      );
      toast.success("Le produit a été mis à jour avec succès");
      setMenu((prevMenu) => {
        const newMenu = { ...prevMenu };
        for (let category in newMenu) {
          for (let subCategory in newMenu[category]) {
            newMenu[category][subCategory] = newMenu[category][subCategory].map(
              (item) => (item.id === editProduct.id ? editProduct : item)
            );
          }
        }
        return newMenu;
      });
      setShowEditModal(false);
    } catch (err) {
      toast.error("Le produit n'a pas pu être mis à jour");
      setError("Erreur lors de la mise à jour du produit", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="updateProduct">
      {!showEditModal &&
        Object.keys(menu).map((category) => (
          <section key={category}>
            <h2>{category}</h2>
            {Object.keys(menu[category]).map((subCategory) => (
              <div key={subCategory}>
                <h3>{subCategory}</h3>
                <ul>
                  {menu[category][subCategory].map((item) => (
                    <li key={item.id}>
                      <p>{item.name}</p>
                      <div className="container_button">
                        <button onClick={() => handleDelete(item.id)}>
                          Supprimer
                        </button>
                        <button onClick={() => handleEdit(item)}>
                          Modifier
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}

      {showEditModal && (
        <div className="modal">
          <h2>Modifier le Produit</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateProduct();
            }}
          >
            <div>
              <label>Nom du produit:</label>
              <input
                type="text"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label>Prix:</label>
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <div>
              <label>Catégorie:</label>
              <input
                type="text"
                value={editProduct.category}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, category: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Sous-catégorie:</label>
              <input
                type="text"
                value={editProduct.sub_category}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    sub_category: e.target.value,
                  })
                }
                required
              />
            </div>
            <button type="submit">Sauvegarder</button>
            <button type="button" onClick={() => setShowEditModal(false)}>
              Annuler
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default UpdateProduct;
