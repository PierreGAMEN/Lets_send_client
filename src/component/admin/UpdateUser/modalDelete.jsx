/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const ModalDeleteUser = ({ open, onClose, deleteUser, user }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Êtes-vous certain(e) de vouloir supprimer {user.username} ?
      </DialogTitle>
      <DialogActions>
        <Button onClick={deleteUser}>OUI</Button>
        <Button onClick={onClose}>NON</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDeleteUser;
