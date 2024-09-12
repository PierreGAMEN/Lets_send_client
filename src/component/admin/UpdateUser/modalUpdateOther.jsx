/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const ModalUpdateOther = ({
  open,
  onClose,
  user,
  handleSubmit,
  handleChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Vous modifiez les information de &quot;{user.username}&quot;
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            id="username"
            name="username"
            label="Identifiant"
            type="text"
            fullWidth
            value={user.username}
            onChange={handleChange}
            required
          />

          <FormControl margin="dense" fullWidth>
            <InputLabel id="role">Rôle</InputLabel>
            <Select
              labelId="role"
              name="role"
              id="role"
              value={user.role}
              label="role"
              onChange={handleChange}
            >
              <MenuItem value="personal">Personnel</MenuItem>
              <MenuItem value="admin">Administrateur</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="currentPassword"
            name="password"
            label="Nouveau mot de passe"
            type="password"
            fullWidth
            value={user.password}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="confirmedPassword"
            name="confirmedPassword"
            label="Confirmation du mot de passe"
            type="password"
            fullWidth
            value={user.confirmedPassword}
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Valider</Button>
        <Button onClick={onClose}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUpdateOther;
