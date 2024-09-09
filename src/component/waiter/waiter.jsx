/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import "./orderDisplay.scss";

const OrderDisplay = ({ company_id }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ws, setWs] = useState(null);

  const [filter, setFilter] = useState("all");
  const [activeButton, setActiveButton] = useState("all");
  const [step, setStep] = useState("menu"); // Étape : "menu", "tableList", ou "orderList"
  const [selectedTable, setSelectedTable] = useState(null); // Table sélectionnée
  const [availableTables, setAvailableTables] = useState([]); // Liste des tables disponibles

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/order/all`, {
        params: { company_id },
      });
      setOrders(response.data);

      // Récupérer la liste unique des tables à partir des commandes
      const tables = Array.from(
        new Set(response.data.map((order) => order.table_id))
      );
      setAvailableTables(tables); // Mise à jour des tables disponibles
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [company_id]);

  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:4000");

    newWs.onopen = () => {
      console.log("WebSocket connecté");
      setWs(newWs);
    };

    newWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === "orderStatus") {
        fetchOrders();
      }
    };

    newWs.onclose = () => {
      console.log("WebSocket déconnecté");
    };

    return () => {
      newWs.close();
    };
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/api/order/${orderId}/status`, {
        status: newStatus,
      });
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({ action: "orderUpdated", orderId, status: newStatus })
        );
      }
      fetchOrders();
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut.", err);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (selectedTable) return order.table_id === selectedTable;
    if (filter === "kitchen")
      return (
        order.product.category !== "Boisson" && order.status === "preparation"
      );
    if (filter === "ready") return order.status === "ready";
    if (filter === "drinks")
      return (
        order.product.category === "Boisson" && order.status === "preparation"
      );
    if (filter === "finish") return order.status === "finish";
    return true;
  });

  const resetFilters = () => {
    setSelectedTable(null); // Réinitialiser la table sélectionnée
    setFilter("all"); // Réinitialiser le filtre
    setActiveButton("all"); // Réinitialiser le bouton actif
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="orderDisplay">
      <h2>Suivi des commandes</h2>

      {/* Étape 1 : Menu Intermédiaire */}
      {step === "menu" && (
        <div className="menu">
          <button
            onClick={() => {
              resetFilters(); // Réinitialiser les filtres avant de voir toutes les commandes
              setStep("orderList");
            }}
          >
            Voir toutes les commandes
          </button>
          <button onClick={() => setStep("tableList")}>Suivre par table</button>
        </div>
      )}

      {/* Étape 2 : Liste des tables */}
      {step === "tableList" && (
        <div className="tableList">
          <h3>Choisissez une table</h3>
          <ul>
            {availableTables.map((table) => (
              <li key={table}>
                <button
                  onClick={() => {
                    setSelectedTable(table); // Sélectionner la table
                    setStep("orderList"); // Passer à l'étape d'affichage des commandes
                  }}
                >
                  Table {table}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              resetFilters(); // Réinitialiser les filtres lors du retour au menu
              setStep("menu");
            }}
          >
            Retour
          </button>
        </div>
      )}

      {/* Étape 3 : Affichage des commandes */}
      {step === "orderList" && (
        <>
          <div className="filter_container">
            <button
              className={activeButton === "all" ? "active" : ""}
              onClick={() => {
                setFilter("all");
                setActiveButton("all");
              }}
            >
              Tout
            </button>
            <button
              className={activeButton === "kitchen" ? "active" : ""}
              onClick={() => {
                setFilter("kitchen");
                setActiveButton("kitchen");
              }}
            >
              Cuisine
            </button>
            <button
              className={activeButton === "drinks" ? "active" : ""}
              onClick={() => {
                setFilter("drinks");
                setActiveButton("drinks");
              }}
            >
              Bar
            </button>
            <button
              className={activeButton === "ready" ? "active" : ""}
              onClick={() => {
                setFilter("ready");
                setActiveButton("ready");
              }}
            >
              Service
            </button>
            <button
              className={activeButton === "finish" ? "active" : ""}
              onClick={() => {
                setFilter("finish");
                setActiveButton("finish");
              }}
            >
              Terminé
            </button>
          </div>

          {selectedTable && <h3>Commandes pour la table {selectedTable}</h3>}
          {filteredOrders.length === 0 ? (
            <p>Aucune commande trouvée</p>
          ) : (
            <ul>
              {filteredOrders.map((order) => (
                <li key={order.id}>
                  <p className="product">
                    Table {order.table_id} - {order.product.name}
                  </p>
                  <div className="status">
                    <p>Statut:</p>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <option value="preparation">Préparation</option>
                      <option value="ready">À Servir</option>
                      <option value="finish">Terminé</option>
                    </select>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => {
              resetFilters(); // Réinitialiser les filtres lors du retour au menu
              setStep("menu");
            }}
          >
            Retour au menu
          </button>
        </>
      )}
    </div>
  );
};

export default OrderDisplay;
