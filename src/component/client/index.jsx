/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  connect,
  sendMessage,
  disconnect,
} from "../../services/websocketService";
import "./client.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import ModalComment from "./modalComment";
import { Button } from "@mui/material";
const apiUrl = import.meta.env.VITE_API_URL;

const Client = ({ tableNumber, companyId, table_id }) => {
  // *************************************************
  //****************** UseParams *********************/
  //**************************************************

  const { id_company: id_companyParams, id_table: id_tableParams } =
    useParams();

  // *************************************************
  //************** UseState Order ******************/
  //**************************************************
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [tableId, setTableId] = useState("");
  const [tableNumberLoaded, setTableNumberLoaded] = useState(null);
  const [wrongTable, setWrongTable] = useState(false);

  const id_company = id_companyParams || companyId;
  const id_table = tableId || table_id;
  const table_number = tableNumberLoaded || tableNumber;

  // *************************************************
  //************** UseState TotalPrice ***************/
  //**************************************************

  const [totalPrice, setTotalPrice] = useState(0);

  // *************************************************
  //************** UseState comment ******************/
  //**************************************************
  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    company_id: id_company,
    name: "",
    description: "",
    comment: "",
    price: null,
    sub_category: "",
    category: "",
  });

  const [openModalComment, setOpenModalComment] = useState(false);
  const [comment, setComment] = useState("");

  // *************************************************
  //************** UseState loading Data *************/
  //**************************************************

  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // *************************************************
  //****************** Loading Function **************/
  //**************************************************

  useEffect(() => {
    async function loadTable() {
      if (id_tableParams) {
        try {
          const response = await axios.get(
            `${apiUrl}/api/table/${id_company}/${id_tableParams}`
          );
          if (!response.data) {
            setWrongTable(true);
          }
          setTableId(response.data.id);
          setTableNumberLoaded(response.data.table_number);
        } catch (err) {
          toast.error("Erreur lors de la selection de la table", err);
        }
      }
    }

    loadTable();
  }, [id_tableParams]);

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await axios.get(
          `${apiUrl}/api/menu/${id_company}`
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

  // *************************************************
  //****************** Comment Function **************/
  //**************************************************

  const handleSelectedProduct = (item) => {
    setSelectedProduct({
      id: item.id,
      company_id: id_company,
      name: item.name,
      description: item.description,
      comment: "",
      price: item.price,
      sub_category: item.sub_category,
      category: item.category,
    });
    setOpenModalComment(true);
    setComment("");
  };

  const handleCloseModalComment = () => {
    setOpenModalComment(false);
    setComment("");
  };

  // *************************************************
  //************** Create Order Function *************/
  //**************************************************

  const addToCart = (product) => {
    const productWithComment = { ...product, comment: comment };

    setCart((prevCart) => [...prevCart, productWithComment]);

    setComment("");
    setOpenModalComment(false);
  };

  const placeOrder = () => {
    if (!id_company || !id_table) {
      toast.error("Des informations sont manquantes pour passer la commande.");
      return;
    }

    const items = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      comment: item.comment,
    }));

    const companyId = parseInt(id_company, 10);
    if (isNaN(companyId)) {
      console.log("ID de la société invalide.");
      return;
    }

    // Construire l'objet à envoyer
    const messageData = {
      action: "createOrder",
      order: {
        items,
        id_table: tableId || table_id,
        company_id: companyId,
        table_number: id_tableParams || tableNumber,
      },
    };

    // Loguer les données avant l'envoi
    console.log("Sending message:", messageData);

    // Envoyer le message via WebSocket
    sendMessage(messageData);
    toast.success("Commande envoyée au serveur!");
    setCart([]); // Vider le panier après l'envoi
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // *************************************************
  //****************** WebSocket Function **************/
  //**************************************************

  useEffect(() => {
    // Connect to WebSocket server
    connect("ws://192.168.1.19:4000/socket");

    return () => {
      // Clean up WebSocket connection
      disconnect();
    };
  }, []);

  // *************************************************
  //************* Total Price Function ***************/
  //**************************************************

  const totalCart = () => {
    const totalPrice = cart.reduce(
      (accumulator, currentItem) => accumulator + parseInt(currentItem.price),
      0
    );
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    totalCart();
  }, [cart]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // *************************************************
  //******************** HTML ************************/
  //**************************************************

  return (
    <main className="container_client">
      {/* Affichage du menu */}
      {!wrongTable ? (
        Object.keys(menu).map((category) => (
          <section key={category}>
            <h2>{category}</h2>
            {Object.keys(menu[category]).map((subCategory) => (
              <div key={subCategory}>
                <h3>{subCategory}</h3>
                <ul>
                  {menu[category][subCategory].map((item) => (
                    <li key={item.id}>
                      <div>
                        {item.name} - {item.price}€<p>{item.description}</p>
                      </div>
                      <CommentIcon
                        onClick={() => handleSelectedProduct(item)}
                      />
                      <Button
                        className="Button_Add_cart"
                        onClick={() => addToCart(item)}
                      >
                        Ajouter
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))
      ) : (
        <div>
          La table que vous avez selectionnée ne correspond a aucune de nos
          tables. Merci de prendre contact avec le serveur.
        </div>
      )}
      <ModalComment
        open={openModalComment}
        onClose={handleCloseModalComment}
        comment={comment}
        setComment={setComment}
        addToCart={() => addToCart(selectedProduct)}
      />

      {/* Affichage du panier */}
      <section className={`panier ${!companyId ? "panier_client" : ""}`}>
        {tableNumber ? (
          <h2>TABLE N°{table_number}</h2>
        ) : (
          <h2>TABLE N°{table_number}</h2>
        )}
        <div>
          <ShoppingCartIcon
            onClick={() => {
              setOpenCart(!openCart);
            }}
          />
          {cart.length > 0 && <span className="badge-info">{cart.length}</span>}
        </div>
        {openCart && (
          <div
            className={` ${
              !companyId ? "panier_content_client" : "panier_content"
            }`}
          >
            {cart.length > 0 ? (
              <Button onClick={placeOrder}>Lancer la commande</Button>
            ) : (
              <div>Votre panier est vide</div>
            )}
            {cart.map((item, index) => (
              <li key={index}>
                <p>
                  {item.name} - {item.price}€
                </p>
                <span>
                  <DeleteIcon onClick={() => removeFromCart(index)} />
                </span>
              </li>
            ))}
            {cart.length > 0 && (
              <>
                <p>Total: {totalPrice}€</p>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Client;
