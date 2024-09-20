/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const ModalComment = ({ open, onClose, comment, setComment, addToCart }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Espace commentaire</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          type="text"
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          label="Commentaire"
          required
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={addToCart}>Ajouter au panier</Button>
        <Button onClick={onClose}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalComment;
