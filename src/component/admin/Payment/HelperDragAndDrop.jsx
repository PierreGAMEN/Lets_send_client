/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";
import { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Divider from "@mui/material/Divider";

const HelperDragAndDrop = ({
  open,
  onClose,
  order,
  total,
  setTotal,
  handleDeleteOrder,
  handlePaymentStatusChange,
  handleCreateTransaction,
  company_id
}) => {
  const [box1, setBox1] = useState(order);
  const [box2, setBox2] = useState([]);

  const moveToBox2 = (item) => {
    // Enlever l'item de box1
    setBox1((prevBox1) => prevBox1.filter((i) => i.id !== item.id));
    // Ajouter l'item à box2
    setBox2((prevBox2) => [...prevBox2, item]);
  };

  const calculateTotal = () => {
    return box2.reduce(
      (total, item) => total + parseInt(item.product.price),
      0
    );
  };

  const createTransaction = (itemsPayed) => {
    newTotal();
    handleCreateTransaction(calculateTotal(), company_id, false)

    for (const item of itemsPayed) {
      handlePaymentStatusChange(item.id);
      handleDeleteOrder(item);
    }
  };

  const newTotal = () => {
    setTotal(total - calculateTotal());
    setBox2([]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Chacun paye sa part <HelpOutlineIcon />
      </DialogTitle>
      <DialogContent>
        <div className="red">
          {box1.length > 1 ? (
            <h3>Produits à payer</h3>
          ) : (
            <h3>Produit à payer</h3>
          )}
          {box1.map((item) => (
            <DialogContentText
              key={item.id}
              onClick={() => moveToBox2(item)}
              style={{ cursor: "pointer", marginRight: "10px" }}
            >
              {item.product.name}
            </DialogContentText>
          ))}
        </div>
      </DialogContent>
      <Divider variant="middle" />
      <DialogContent>
        {box2.length > 1 ? (
          <h3>Produits séléctionnés</h3>
        ) : (
          <h3>Produit séléctionné</h3>
        )}
        {box2.map((item) => (
          <DialogContentText key={item.id}>
            {item.product.name}
          </DialogContentText>
        ))}
        <DialogContentText>
          <strong>Total séléctionné: {calculateTotal()} €</strong>
        </DialogContentText>
        {box2.length > 0 && (
          <Button
            variant="contained"
            onClick={() => {
              createTransaction(box2);
            }}
          >
            Payer cette partie
          </Button>
        )}
      </DialogContent>
      <Divider variant="middle" />
      <DialogContent>
        <DialogContentText>Reste à payer {total} €</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelperDragAndDrop;
