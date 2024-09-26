/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import "./orderDisplay.scss";
import EmergencyIcon from "@mui/icons-material/Emergency";
import ModalCommentTrack from "./ModalComment";
import Payment from "../Payment";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalDeleteOrder from "./ModalDelete";
import { Button } from "@mui/material";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
const apiUrl = import.meta.env.VITE_API_URL;

const OrderDisplay = ({ company_id }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ws, setWs] = useState(null);

  const [filter, setFilter] = useState("all");
  const [activeButton, setActiveButton] = useState("all");
  const [step, setStep] = useState("menu"); // Étape : "menu", "tableList", ou "orderList"
  const [selectedTable, setSelectedTable] = useState({
    id: null,
    table_number: "",
  }); // Table sélectionnée
  const [availableTables, setAvailableTables] = useState([]); // Liste des tables disponibles
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModalComment, setOpenModalComment] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const openDelete = (order) => {
    setSelectedOrder(null);
    setSelectedOrder(order);
    setOpenDeleteModal(true);
  };

  const OnCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedOrder(null);
  };

  const openComment = (order) => {
    setSelectedOrder(order);
    setOpenModalComment(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setOpenModalComment(false);
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/order/all`, {
        params: { company_id },
      });
      setOrders(response.data);
      console.log(response);

      // Récupérer une liste unique d'objets { id: table_id, table_number: table_number }
      const tables = Array.from(
        new Map(
          response.data.map((order) => [
            order.table_id,
            { id: order.table_id, table_number: order.table_number },
          ])
        ).values()
      );

      setAvailableTables(tables); // Mise à jour des tables disponibles avec objets {id, table_number}
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
    const newWs = new WebSocket("ws://192.168.1.19:4000");

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
      await axios.put(`${apiUrl}/api/order/${orderId}/status`, {
        status: newStatus,
      });
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({ action: "orderUpdated", orderId, status: newStatus })
        );
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut.", err);
    }
  };

  const handlePaymentStatusChange = async (orderId) => {
    try {
      await axios.put(`${apiUrl}/api/order/payment/${orderId}`, {
        payment: true,
      });
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            action: "orderPaymentUpdated",
            orderId,
            payment: true,
          })
        );
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut.", err);
    }
  };

  const handleDeleteOrder = async (order) => {
    try {
      await axios.delete(`${apiUrl}/api/order/delete/${order.id}`);

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ action: "orderDeleted" }));
      }
    } catch (err) {
      setError("Erreur lors de la suppression de la commande.", err);
    }
  };

  const handleCreateTransaction = async (amount, company_id, selfPayment) => {
    try {
      const currentDate = new Date().toISOString();

      const response = await axios.post(
        `${apiUrl}/api/transaction/create`,
        {
          amount: amount,
          date: currentDate,
          self_payment: selfPayment,
          company_id: company_id,
        }
      );

      console.log("Transaction créée avec succès : ", response.data);

      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de la transaction : ", error);
      throw error;
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (selectedTable.id) return order.table_id === selectedTable.id;
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
    setSelectedTable({ id: null, table_number: "" }); // Réinitialiser la table sélectionnée
    setFilter("all"); // Réinitialiser le filtre
    setActiveButton("all"); // Réinitialiser le bouton actif
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="orderDisplay">
      <h3>Suivi des commandes</h3>

      {/* Étape 1 : Menu Intermédiaire */}
      {step === "menu" && (
        <div className="menu">
          <Button
            onClick={() => {
              resetFilters(); // Réinitialiser les filtres avant de voir toutes les commandes
              setStep("orderList");
            }}
          >
            <p>Suivi par commande</p>
            <span>
              <FormatListNumberedIcon />
            </span>
          </Button>
          <Button onClick={() => setStep("tableList")}>
            <p>Suivi par table et paiement</p>{" "}
            <span>
              <TableRestaurantIcon />
            </span>
          </Button>
        </div>
      )}

      {/* Étape 2 : Liste des tables */}
      {step === "tableList" && (
        <div className="tableList">
          <h4>Choisissez une table à suivre</h4>
          <ul>
            {availableTables.map((table) => (
              <li
                onClick={() => {
                  setSelectedTable({
                    id: table.id,
                    table_number: table.table_number,
                  }); // Sélectionner la table
                  setStep("orderList"); // Passer à l'étape d'affichage des commandes
                }}
                key={table}
              >
                <Button>Table N°{table.table_number}</Button>
                <span>Cliquez pour suivre cette table</span>
              </li>
            ))}
          </ul>
          <Button
            className="previous"
            onClick={() => {
              resetFilters(); // Réinitialiser les filtres lors du retour au menu
              setStep("menu");
            }}
          >
            Retour
          </Button>
        </div>
      )}

      {/* Étape 3 : Affichage des commandes */}
      {step === "orderList" && (
        <div>
          {!selectedTable.id && (
            <div className="filter_container">
              <Button
                className={activeButton === "all" ? "active" : ""}
                onClick={() => {
                  setFilter("all");
                  setActiveButton("all");
                }}
              >
                Tout
              </Button>
              <Button
                className={activeButton === "kitchen" ? "active" : ""}
                onClick={() => {
                  setFilter("kitchen");
                  setActiveButton("kitchen");
                }}
              >
                Cuisine
              </Button>
              <Button
                className={activeButton === "drinks" ? "active" : ""}
                onClick={() => {
                  setFilter("drinks");
                  setActiveButton("drinks");
                }}
              >
                Bar
              </Button>
              <Button
                className={activeButton === "ready" ? "active" : ""}
                onClick={() => {
                  setFilter("ready");
                  setActiveButton("ready");
                }}
              >
                Service
              </Button>
              <Button
                className={activeButton === "finish" ? "active" : ""}
                onClick={() => {
                  setFilter("finish");
                  setActiveButton("finish");
                }}
              >
                Terminé
              </Button>
            </div>
          )}

          <div className="table_order">
            {selectedTable.id && (
              <h4>Commandes pour la table {selectedTable.table_number}</h4>
            )}
            {filteredOrders.length === 0 ? (
              <p>Aucune commande trouvée</p>
            ) : (
              <ul>
                {filteredOrders.map((order) => (
                  <li key={order.id}>
                    <div className="header">
                      {order.comment ? (
                        <p
                          onClick={() => openComment(order)}
                          className="product"
                        >
                          {!selectedTable.id && `Table ${order.table_number} -`}{" "}
                          {order.product.name}
                          <span className="asterix">
                            <EmergencyIcon fontSize="" />
                          </span>
                        </p>
                      ) : (
                        <p className="product">
                          {!selectedTable.id && `Table ${order.table_number} -`}{" "}
                          Produit: {order.product.name}
                        </p>
                      )}

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
                    </div>
                    <DeleteIcon onClick={() => openDelete(order)} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          {openDeleteModal && (
            <ModalDeleteOrder
              open={openDeleteModal}
              order={selectedOrder}
              onClose={OnCloseDeleteModal}
              onSubmit={() => handleDeleteOrder(selectedOrder)}
            />
          )}
          {selectedTable.id && filteredOrders.length > 0 && (
            <Payment
              order={filteredOrders}
              handleDeleteOrder={handleDeleteOrder}
              handlePaymentStatusChange={handlePaymentStatusChange}
              handleCreateTransaction={handleCreateTransaction}
              company_id={company_id}
            />
          )}
          {openModalComment && (
            <ModalCommentTrack
              open={openModalComment}
              onClose={handleCloseModal}
              selectedOrder={selectedOrder}
            />
          )}
          <Button
            className="first_menu_button"
            onClick={() => {
              resetFilters(); // Réinitialiser les filtres lors du retour au menu
              setStep("menu");
            }}
          >
            Retour au menu
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderDisplay;
