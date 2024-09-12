/* eslint-disable react/prop-types */
import { useState } from "react";
import FormProduct from "./formProduct";
import UpdateProduct from "./updateProduct";
import OrderDisplay from "../waiter/waiter";
import CreateUser from "./createUser";
import UpdateUser from "./UpdateUser/UpdateUser";
import NavAdmin from "./navAdmin/navAdmin";
import TablesWithProducts from "./tableWithProduct";
import UpdateTable from "./Tables/updateTable";
import AdminTable from "./Tables";

const MenuPage = ({ user, openForm, handleForm }) => {
  const [showMenuAdmin, setShowMenuAdmin] = useState(false); // Pour afficher/masquer "Administrer la carte"

  return (
    <section className="admin">
      {openForm.initMenu && (
        <div className="menu_dash">
          {/* Affichage des boutons d'action pour les utilisateurs admin */}
          {user.right === "admin" && (
            <>
              {/* Bouton pour administrer la carte */}
              {!showMenuAdmin && <button onClick={() => setShowMenuAdmin(!showMenuAdmin)}>
                Administrer la carte
              </button>}
              {showMenuAdmin && (
                <>
                  <button onClick={() => handleForm("createProduct")}>
                    Ajouter un produit à la carte
                  </button>
                  <button onClick={() => handleForm("updateProduct")}>
                    Modifier la carte
                  </button>
                  <button onClick={() => setShowMenuAdmin(!showMenuAdmin)}>
                    Retour
                  </button>
                </>
              )}

              {/* Bouton pour administrer les tables */}
              {!showMenuAdmin && <button onClick={() => handleForm("createTable")}>
                Administrer les tables
              </button>}
            </>
          )}
        </div>
      )}

      {/* Affichage des formulaires et des données en fonction de l'état */}
      <div className="form">
        {openForm.createProduct && <FormProduct company_id={user.company_id} />}
        {openForm.updateProduct && (
          <UpdateProduct company_id={user.company_id} />
        )}
        {openForm.createTable && <AdminTable company_id={user.company_id} />}
        {openForm.updateTable && <UpdateTable company_id={user.company_id} />}
        {openForm.tableOrder && <TablesWithProducts company_id={user.company_id} />}
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
