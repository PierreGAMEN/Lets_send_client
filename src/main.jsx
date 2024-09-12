import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Client from "./component/client";
import Admin from "./component/admin/admin";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from "./App";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { 
        index: true,
        element: <Admin />,
      },
      {
        path: "/client/:id_company/:id_table",
        element: <Client />,
      },
    ]
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
