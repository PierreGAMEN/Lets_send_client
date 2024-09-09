/* eslint-disable react/prop-types */
import FormProduct from "./formProduct";
import UpdateProduct from "./updateProduct";
import OrderDisplay from "../waiter/waiter";
import CreateUser from "./createUser";
import UpdateUser from "./updateUser";
import NavAdmin from "./navAdmin/navAdmin";
import TablesWithProducts from "./tableWithProduct";

const MenuPage = ({ user, openForm, handleForm }) => {
  return (
    <section className="admin">
      {openForm.initMenu && (
        <div className="menu_dash">
          {/* Affichage des boutons d'action pour les utilisateurs admin */}
          {user.right === "admin" && (
            <>
              <button onClick={() => handleForm("createProduct")}>
                Ajouter un produit à la carte
              </button>
              <button onClick={() => handleForm("updateProduct")}>
                Modifier la carte
              </button>
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
        {openForm.getOrders && <OrderDisplay company_id={user.company_id} />}
        {openForm.tableOrder && <TablesWithProducts company_id={user.company_id} />}
        {openForm.createUser && <CreateUser company_id={user.company_id} />}
        {openForm.updateUser && (
          <UpdateUser
            company_id={user.company_id}
            user_id={user.id}
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
