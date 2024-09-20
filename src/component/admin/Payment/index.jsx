/* eslint-disable react/prop-types */
// import "./Payment.scss";

import { useEffect, useState } from "react";
import HelperDivider from "./Helper";
import HelperDragAndDrop from "./HelperDragAndDrop";

const Payment = ({ order }) => {
  const [openHelperDivider, setOpenHelperDivider] = useState(false);
  const [openHelperDragAndDrop, setOpenHelperDragAndDrop] = useState(false);
  const [total, setTotal] = useState(null);

  const totalOrder = order.reduce(
    (acc, item) => acc + parseFloat(item.product.price),
    0
  );

  useEffect(() => {
    setTotal(totalOrder);
  }, []);


  return (
    <section>
      <h3>Commandes à payer</h3>
      {order.map((item) => (
        <li key={item.id}>
          {item.product.name} - {item.product.price}€
        </li>
      ))}
      {total && <h4>Total à payer : {total.toFixed(2)}€</h4>}
      <button onClick={() => setOpenHelperDivider(true)}>On divise</button>
      <button onClick={() => setOpenHelperDragAndDrop(true)}>
        Chacun paye sa part
      </button>
      {openHelperDivider && (
        <HelperDivider
          open={openHelperDivider}
          onClose={() => {
            setOpenHelperDivider(false);
          }}
          total={total}
          setTotal={setTotal}
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
        />
      )}
    </section>
  );
};

export default Payment;
