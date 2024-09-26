/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ModalDeleteOrder = ({ open, onClose, onSubmit, order }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Supprimer la commande</DialogTitle>
      <DialogContent>
        <p>
          Voulez vous vraiment supprimer le produit &quot;{order.product.name}
          &quot; ?
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>OUI</Button>
        <Button onClick={onClose}>NON</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDeleteOrder;
