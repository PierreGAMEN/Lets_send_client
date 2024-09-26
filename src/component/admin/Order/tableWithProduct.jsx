/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import "./tableWithProduct.scss";
import Client from "../../client";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const TablesWithProducts = ({ company_id }) => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDetails, setOpenDetails] = useState({}); // État pour gérer l'ouverture des détails
  const [selectedTable, setSelectedTable] = useState(null); // État pour gérer la table sélectionnée
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fonction pour récupérer les données
    const fetchTables = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/table/${company_id}`
        );
        console.log(response);
        setTables(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors du chargement des données", error);
        setLoading(false);
      }
    };

    fetchTables();
  }, [company_id]);

  // Fonction pour gérer l'affichage/masquage des détails
  const toggleDetails = (tableId) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [tableId]: !prevState[tableId], // Inverser l'état pour cette table
    }));
  };

  // Fonction pour sélectionner une table et afficher le composant Client
  const handleSelectTable = (table) => {
    setSelectedTable(table);
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Si une table est sélectionnée, afficher le composant Client
  if (selectedTable) {
    return (
      <Client
        tableNumber={selectedTable.table_number}
        companyId={company_id}
        table_id={selectedTable.id}
      />
    );
  }

  return (
    <div className="container_tablePage">
      <h3>Listes des tables de l&apos;établissement</h3>
      {tables.map((table) => (
        <div className="table" key={table.id}>
          <div className="table_header">
            <h4>Table N°{table.table_number}</h4>
            <button onClick={() => toggleDetails(table.id)}>
              {openDetails[table.id]
                ? "Masquer les détails"
                : "Afficher les détails"}
            </button>
            {openDetails[table.id] && (
            <>
              {table.Orders && table.Orders.length > 0 ? (
                <ul>
                  {table.Orders.map((order) => (
                    <li key={order.id}>
                    <span>{order.product.name}</span> {order.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucune commande en cours pour cette table.</p>
              )}
            </>
          )}
          </div>
          {/* Bouton pour afficher ou masquer les détails */}

          <AddShoppingCartIcon onClick={() => handleSelectTable(table)} />

          {/* Afficher les détails seulement si le bouton est cliqué */}
          
        </div>
      ))}
    </div>
  );
};

export default TablesWithProducts;
