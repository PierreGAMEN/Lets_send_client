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

const HelperDragAndDrop = ({ open, onClose, order, total, setTotal }) => {
  const [box1, setBox1] = useState(order);
  const [box2, setBox2] = useState([]);

  const moveToBox2 = (item) => {
    // Enlever l'item de box1
    setBox1((prevBox1) => prevBox1.filter((i) => i.id !== item.id));
    // Ajouter l'item à box2
    setBox2((prevBox2) => [...prevBox2, item]);
  };

  const calculateTotal = () => {
    return box2.reduce((total, item) => total + parseInt(item.product.price), 0);
  };

  const newTotal = () => {
    setTotal(total - calculateTotal())
    setBox2([])
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chacun paye sa part</DialogTitle>
      <DialogContent>
        <div>
          <h3>Box 1</h3>
          {box1.map((item) => (
            <span
              key={item.id}
              onClick={() => moveToBox2(item)}
              style={{ cursor: "pointer", marginRight: "10px" }}
            >
              {item.product.name}
            </span>
          ))}
        </div>
        <div>
          <h3>Box 2</h3>
          {box2.map((item) => (
            <span key={item.id} style={{ marginRight: "10px" }}>
              {item.product.name}
            </span>
          ))}
        </div>
        <Button onClick={newTotal}>Payer cette partie</Button>
        <DialogContentText>Total: {calculateTotal()} €</DialogContentText>
        <DialogContentText>Reste à payer {total} €</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelperDragAndDrop;
