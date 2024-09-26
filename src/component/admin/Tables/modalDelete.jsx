/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const ModalDeleteTable = ({ open, onClose, onSubmit, update }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Êtes-vous certain(e) de vouloir supprimer la table N° {update}
      </DialogTitle>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onSubmit}>
          OUI
        </Button>
        <Button onClick={onClose}>NON</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDeleteTable;
