/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";

const FormTable = ({ handleSubmit, tableNumber, setTableNumber }) => {
  return (
    <form className="formProduct" onSubmit={handleSubmit}>
      <h2>Création des tables</h2>
      <TextField
        margin="dense"
        id="tableNumber"
        name="tableNumber"
        label="N° de la table"
        type="number"
        fullWidth
        required
        onChange={(e) => setTableNumber(e.target.value)}
        value={tableNumber}
      />
      <button type="submit">Créer la table</button>
    </form>
  );
};

export default FormTable;
