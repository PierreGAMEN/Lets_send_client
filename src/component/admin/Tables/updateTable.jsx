/* eslint-disable react/prop-types */
import ModalUpdateTable from "./modalUpdate";
import ModalDeleteTable from "./modalDelete";
import { Button } from "@mui/material";

const UpdateTable = ({
  tables,
  loading,
  deleteTable,
  updateTable,
  startEditing,
  editingTableId,
  setUpdate,
  update,
  openModalUpdate,
  setOpenModalUpdate,
  openModalDelete,
  setOpenModalDelete,
  onDelete,
}) => {
  return (
    <section>
      <h2>Listes des tables</h2>
      <br />
      {!loading ? (
        tables.map((table) => {
          return (
            <div className="menu_edit_table" key={table.id}>
              <p>N° {table.table_number}</p>

              <Button
                onClick={() => startEditing(table.id, table.table_number)}
              >
                Editer
              </Button>
              <Button
                color="error"
                onClick={() => onDelete(table.id, table.table_number)}
              >
                Supprimer
              </Button>
            </div>
          );
        })
      ) : (
        <div>Chargement des tables...</div>
      )}
      <ModalUpdateTable
        open={openModalUpdate}
        onClose={() => setOpenModalUpdate(false)}
        onChange={(e) => setUpdate(e.target.value)}
        update={update}
        onSubmit={() => updateTable(editingTableId)}
      />
      <ModalDeleteTable
        open={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        onSubmit={() => deleteTable(editingTableId)}
        update={update}
      />
    </section>
  );
};

export default UpdateTable;
