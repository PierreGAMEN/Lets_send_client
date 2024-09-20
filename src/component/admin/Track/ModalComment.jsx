/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ModalCommentTrack = ({ open, onClose, selectedOrder }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Commentaire</DialogTitle>
      <DialogContent>
        <h4>{selectedOrder.product.name}</h4>
        <p>{selectedOrder.comment}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCommentTrack;
