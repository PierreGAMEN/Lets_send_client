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
import './client.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

const Client = ({tableNumber, companyId, table_id}) => {
  // Récupération des paramètres depuis l'URL s'ils existent
  const { id_company: id_companyParams, id_table: id_tableParams } = useParams();

  // Utilisation des paramètres d'URL ou des props
  const id_company = id_companyParams || companyId;
  const id_table = id_tableParams || table_id;

  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [openCart, setOpenCart] = useState(false)

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/menu/${id_company}`
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

  useEffect(() => {
    // Connect to WebSocket server
    connect("ws://localhost:4000/socket");

    return () => {
      // Clean up WebSocket connection
      disconnect();
    };
  }, []);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
 
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
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
    }));

    const companyId = parseInt(id_company, 10);
    if (isNaN(companyId)) {
      console.log("ID de la société invalide.");
      return;
    }

    sendMessage({
      action: "createOrder",
      order: {
        items,
        id_table,
        company_id: companyId,
        table_number: tableNumber,
      },
    });

    toast.success("Commande envoyée au serveur!");
    setCart([]); // Vider le panier après l'envoi
  };

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

  return (
    <main className="container_client">
      {/* Affichage du menu */}
      {Object.keys(menu).map((category) => (
        <section key={category}>
          <h2>{category}</h2>
          {Object.keys(menu[category]).map((subCategory) => (
            <div key={subCategory}>
              <h3>{subCategory}</h3>
              <ul>
                {menu[category][subCategory].map((item) => (
                  <li key={item.id}>
                    <div>{item.name} - {item.price}€<p>{item.description}</p></div>
                    <button className="button_Add_cart" onClick={() => addToCart(item)}>
                      Ajouter
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      {/* Affichage du panier */}
      <section className={`panier ${!companyId ? 'panier_client' : ''}`}>
      {tableNumber ? <h2>TABLE N°{tableNumber}</h2> : <h2>TABLE N°{id_table}</h2>}
        <div>
        <ShoppingCartIcon onClick={() => {setOpenCart(!openCart)}}/>
          {cart.length > 0 && <span className="badge-info">{cart.length}</span>}
          </div>
          {openCart && <div className={` ${!companyId ? 'panier_content_client' : 'panier_content'}`}>
            {cart.length > 0 ? <button onClick={placeOrder}>Lancer la commande</button> : <div>Votre panier est vide</div>}
            {cart.map((item, index) => (
              <li key={index}>
                <p>{item.name} - {item.price}€</p>
                <span><DeleteIcon onClick={() => removeFromCart(index)}/></span>
              </li>
            ))}
            {cart.length > 0 && (
          <>
            <p>Total: {totalPrice}€</p>
            
          </>
        )}
          </div>}

        
      </section>
    </main>
  );
};

export default Client;
