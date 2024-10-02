/* eslint-disable react/prop-types */
import OrderDisplay from "./Track/TrackingOrder";
import CreateUser from "./User/createUser";
import NavAdmin from "./BottomNav/navAdmin";
import TablesWithProducts from "./Order/tableWithProduct";
import AdminTable from "./Tables";
import ProductMenu from "./Product";
import { Button } from "@mui/material";
import UpdateUser from "./User/UpdateUsers";

const MenuPage = ({ user, openForm, handleForm }) => {
  return (
    <section className="admin">
      {openForm.initMenu && (
        <div className="menu_dash">
          {/* Affichage des boutons d'action pour les utilisateurs admin */}
          {user.right === "admin" && (
            <>
              {/* Bouton pour administrer la carte */}

              <Button onClick={() => handleForm("createProduct")}>
                Administrer la carte
              </Button>

              <Button onClick={() => handleForm("createTable")}>
                Administrer les tables
              </Button>
            </>
          )}
        </div>
      )}

      {/* Affichage des formulaires et des données en fonction de l'état */}
      <div className="form">
        {openForm.createProduct && <ProductMenu company_id={user.company_id} />}
        {openForm.createTable && <AdminTable company_id={user.company_id} />}
        {openForm.tableOrder && (
          <TablesWithProducts company_id={user.company_id} />
        )}
        {openForm.getOrders && <OrderDisplay company_id={user.company_id} />}
        {openForm.createUser && <CreateUser company_id={user.company_id} />}
        {openForm.updateUser && (
          <UpdateUser
            company_id={user.company_id}
            user_id={user.user_id}
            username={user.username}
            role={user.right}
          />
        )}
      </div>
      <NavAdmin
        onHomeClick={() => handleForm("initMenu")}
        onFollowOrder={() => handleForm("getOrders")}
        onTableOrder={() => handleForm("tableOrder")}
      />
    </section>
  );
};

export default MenuPage;
