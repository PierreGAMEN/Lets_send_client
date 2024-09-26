/* eslint-disable react/prop-types */
// import "./Payment.scss";

import { useEffect, useState } from "react";
import HelperDivider from "./Helper";
import HelperDragAndDrop from "./HelperDragAndDrop";
import "./payment.scss";
import { Button, ButtonGroup } from "@mui/material";

const Payment = ({
  order,
  handleDeleteOrder,
  handlePaymentStatusChange,
  handleCreateTransaction,
  company_id,
}) => {
  const [openHelperDivider, setOpenHelperDivider] = useState(false);
  const [openHelperDragAndDrop, setOpenHelperDragAndDrop] = useState(false);
  const [total, setTotal] = useState(null);

  const totalOrder = order.reduce(
    (acc, item) => acc + parseFloat(item.product.price),
    0
  );

  useEffect(() => {
    setTotal(totalOrder);
  }, [order]);

  return (
    <section className="payment">
      <div>
        <h4>Reste à payer</h4>
        {order.map((item) =>
          !item.payment ? (
            <li key={item.id}>
              {item.product.name} - {item.product.price}€
            </li>
          ) : null
        )}
      </div>
      {total && <h4>Total à payer : {total.toFixed(2)}€</h4>}
      <ButtonGroup variant="contained">
        <Button onClick={() => setOpenHelperDivider(true)}>On divise</Button>
        <Button onClick={() => setOpenHelperDragAndDrop(true)}>
          Chacun paye sa part
        </Button>
      </ButtonGroup>
      {openHelperDivider && (
        <HelperDivider
          open={openHelperDivider}
          onClose={() => {
            setOpenHelperDivider(false);
          }}
          total={total}
          setTotal={setTotal}
          order={order}
          handleDeleteOrder={handleDeleteOrder}
          handlePaymentStatusChange={handlePaymentStatusChange}
          handleCreateTransaction={handleCreateTransaction}
          company_id={company_id}
        />
      )}
      {openHelperDragAndDrop && (
        <HelperDragAndDrop
          open={openHelperDragAndDrop}
          onClose={() => {
            setOpenHelperDragAndDrop(false);
          }}
          order={order}
          total={total}
          setTotal={setTotal}
          handleDeleteOrder={handleDeleteOrder}
          handlePaymentStatusChange={handlePaymentStatusChange}
          handleCreateTransaction={handleCreateTransaction}
          company_id={company_id}
        />
      )}
    </section>
  );
};

export default Payment;
