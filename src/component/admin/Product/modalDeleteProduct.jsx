/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ModalDeleteProduct = ({open, onClose, onSubmit, product}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Supprimer le produit</DialogTitle>
      <DialogContent>
        <p>Voulez vous vraiment supprimer &quot;{product.name}&quot; ?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>OUI</Button>
        <Button onClick={onClose}>NON</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDeleteProduct;
