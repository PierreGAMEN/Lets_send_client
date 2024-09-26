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

const HelperDivider = ({
  open,
  onClose,
  total,
  setTotal,
  order,
  handlePaymentStatusChange,
  handleDeleteOrder,
  handleCreateTransaction,
  company_id,
}) => {
  const [peopleNumber, setPeopleNumber] = useState(0); // Initialiser à 0
  const [totalsPerPerson, setTotalsPerPerson] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [amountToPay, setAmountToPay] = useState(total)

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
    setTotal(total - totalsPerPerson);
  };

  const clotureTable = () => {
    for (const item of order) {
      handlePaymentStatusChange(item.id);
      handleDeleteOrder(item);
    }
    handleCreateTransaction(amountToPay, company_id, false)
  };

  useEffect(() => {
    if (total == 0) {
      clotureTable();
    }
  }, [total]);

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
        <DialogContentText>Montants restant {total}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelperDivider;
