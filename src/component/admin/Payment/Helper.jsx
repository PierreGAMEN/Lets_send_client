/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const HelperDivider = ({ open, onClose, total, setTotal }) => {
  const [peopleNumber, setPeopleNumber] = useState(0); // Initialiser à 0
  const [totalsPerPerson, setTotalsPerPerson] = useState([]);

  const DeletePerson = () => {
    setPeopleNumber(peopleNumber - 1);
  };

  const dispatchAmount = () => {
    setTotalsPerPerson(total / peopleNumber);
  };

  const payFunction = () => {
    addPayment();
    DeletePerson();
  };

  const addPayment = () => {
    setTotal(total - totalsPerPerson)
  }

  useEffect(() => {
    dispatchAmount();
  }, [peopleNumber, total]);

  return (
    <Dialog open={open}>
      <DialogTitle>Aide aux calculs</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          type="number"
          id="people_number"
          name="people_number"
          label="Nombre de personnes"
          fullWidth
          onChange={(e) => setPeopleNumber(parseInt(e.target.value, 10))}
          value={peopleNumber || ""}
        />

        {peopleNumber > 0 && (
          <>
            <DialogContentText>
              Montants ajustables pour chaque personne :
            </DialogContentText>
            {Array.from({ length: peopleNumber }).map((_, index) => (
              <div key={index}>
                <TextField
                  margin="dense"
                  type="number"
                  label={`Personne ${index + 1}`}
                  value={totalsPerPerson}
                  fullWidth
                />
                <Button onClick={payFunction}>Payer</Button>
              </div>
            ))}
          </>
        )}
        <DialogContentText>
              Montants restant {total}
            </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelperDivider;
