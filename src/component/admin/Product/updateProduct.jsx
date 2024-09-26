/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./updateProduct.scss";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateProductModal from "./updateFormModal";
import ModalDeleteProduct from "./modalDeleteProduct";
import { Button } from "@mui/material";

const UpdateProduct = ({ company_id }) => {
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState(null); // État pour le produit à modifier
  const [showEditModal, setShowEditModal] = useState(false); // État pour afficher/masquer la modale
  const [isFocus, setIsFocus] = useState(false);
  const id_company = 1;
  const [productToDelete, setProductToDelete] = useState({
    id: null,
    name: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await axios.get(
          `${apiUrl}/api/menu/${company_id}`
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

  const openModalDeleteProductFunction = (product) => {
    setProductToDelete({
      id: product.id,
      name: product.name,
    });
    setShowDeleteModal(true);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${apiUrl}/api/menu/product/${productId}`);
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
        `${apiUrl}/api/menu/product/update/${editProduct.id}`,
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
                      <div className="container_Button">
                        <Button
                          onClick={() => openModalDeleteProductFunction(item)}
                        >
                          Supprimer
                        </Button>
                        <Button onClick={() => handleEdit(item)}>
                          Modifier
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}

      {showEditModal && (
        <UpdateProductModal
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateProduct();
          }}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          onClose={() => setShowEditModal(false)}
          open={showEditModal}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
        />
      )}
      {showDeleteModal && (
        <ModalDeleteProduct
          open={showDeleteModal}
          product={productToDelete}
          onClose={() => {
            setShowDeleteModal(false);
          }}
          onSubmit={() => {
            handleDelete(productToDelete.id);
          }}
        />
      )}
    </section>
  );
};

export default UpdateProduct;
