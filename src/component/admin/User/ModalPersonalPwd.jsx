/* eslint-disable react/prop-types */
// ChangePasswordDialog.jsx
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const ChangePasswordDialog = ({
  open,
  onClose,
  handleChange,
  handleSubmit,
  formData
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Changer le mot de passe</DialogTitle>
      <DialogContent>
        <form id="change-password-form" onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            id="currentPassword"
            name="password"
            label="Nouveau mot de passe"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="confirmedPassword"
            name="confirmedPassword"
            label="Confirmation du mot de passe"
            type="password"
            fullWidth
            value={formData.confirmedPassword}
            onChange={handleChange}
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button form="change-password-form" type="submit" color="primary">
          Changer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
