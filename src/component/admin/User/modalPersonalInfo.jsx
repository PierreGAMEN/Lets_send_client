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
// import "./modalPersonalInfo.scss";

const ModalPersonalInfo = ({
  open,
  onClose,
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Modifier vos informations</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            id="username"
            name="username"
            label="Identifiant"
            type="text"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            required
          />

          <FormControl margin="dense" fullWidth>
            <InputLabel id="role">Rôle</InputLabel>
            <Select
              labelId="role"
              name="role"
              id="role"
              value={formData.role}
              label="role"
              onChange={handleChange}
            >
              <MenuItem value="personal">Personnel</MenuItem>
              <MenuItem value="admin">Administrateur</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSubmit} type="submit" color="primary">
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPersonalInfo;
