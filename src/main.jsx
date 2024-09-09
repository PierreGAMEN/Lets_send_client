import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Client from "./component/client";
import Admin from "./component/admin/admin";
import OrderDisplay from "./component/waiter/waiter";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const router = createBrowserRouter([
  {
    path: "/client/:id_company/:id_table",
    element: <Client />,
  },
  {
    path: "/",
    element: <Admin />,
  },
  {
    path: "/waiter",
    element: <OrderDisplay />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
