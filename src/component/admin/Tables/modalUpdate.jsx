/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const ModalUpdateTable = ({ open, onClose, onChange, update, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Changer le N°</DialogTitle>
      <DialogContent>
        <TextField
          onChange={onChange}
          value={update}
          name="tableNumber"
          id="tableNumber"
          type="text"
        />

        <DialogActions>
          <Button onClick={onSubmit}>Valider</Button>
          <Button onClick={onClose}>Annuler</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateTable;
