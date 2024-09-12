/* eslint-disable react/prop-types */

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModalUpdateTable from "./modalUpdate";
import ModalDeleteTable from "./modalDelete";

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
            <div key={table.id}>
              <p>Numéro de table : {table.table_number}</p>

              <DeleteIcon
                onClick={() => onDelete(table.id, table.table_number)}
              />
              <EditIcon
                onClick={() => startEditing(table.id, table.table_number)}
              />
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
