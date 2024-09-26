/* eslint-disable react/prop-types */
import axios from "axios";
import FormTable from "./formTable";
import UpdateTable from "./updateTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./table.scss";
const apiUrl = import.meta.env.VITE_API_URL;

const AdminTable = ({ company_id }) => {
  // ***************************************************
  //************** UseState Loading Data *************/
  //**************************************************

  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // *************************************************
  //************** UseState Update *******************/
  //**************************************************

  const [editingTableId, setEditingTableId] = useState(null);
  const [update, setUpdate] = useState("");
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  // *************************************************
  //************** UseState Delete *******************/
  //**************************************************

  const [openModalDelete, setOpenModalDelete] = useState(false);

  // *************************************************
  //************** UseState Create *******************/
  //**************************************************

  const [tableNumber, setTableNumber] = useState("");

  // *************************************************
  //************** Loading Data Function *************/
  //**************************************************

  useEffect(() => {
    // Fonction pour récupérer les données
    const fetchTables = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/table/${company_id}`
        );
        setTables(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors du chargement des données", error);
        setLoading(false);
      }
    };
    fetchTables();
  }, [company_id, tables]);

  // *************************************************
  //************** Delete Function *******************/
  //**************************************************

  const deleteTable = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${apiUrl}/api/table/delete/${id}`
      );
      if (response.data) {
        toast.success("La table a bien été supprimé");
      }
      setLoading(false);
      setOpenModalDelete(false);
      setTables(tables.filter((table) => table.id !== id));
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const startDeleting = (id, currentTableNumber) => {
    setEditingTableId(id);
    setUpdate(currentTableNumber);
    setOpenModalDelete(true);
  };

  // *************************************************
  //************** Update Function *******************/
  //**************************************************

  const updateTable = async (id) => {
    try {
      // Effectuer la requête de mise à jour
      const response = await axios.put(
        `${apiUrl}/api/table/update/${id}`,
        {
          table_number: update,
          company_id,
        }
      );
      if (response.data) {
        toast.success("La table a bien été supprimé");
      }

      setTables(
        tables.map((table) =>
          table.id === id ? { ...table, table_number: update } : table
        )
      );

      setEditingTableId(null);
      setOpenModalUpdate(false);
      setUpdate("");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const startEditing = (id, currentTableNumber) => {
    setEditingTableId(id);
    setUpdate(currentTableNumber);
    setOpenModalUpdate(true);
  };

  // *************************************************
  //************** Create Function *******************/
  //**************************************************

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tableData = {
      table_number: tableNumber,
      company_id: company_id,
    };

    try {
      console.log(tableData);
      const response = await axios.post(
        `${apiUrl}/api/table/create`,
        tableData
      );
      if (response.data) {
        toast.success("La table a été créé avec succès");
      }

      setTableNumber("");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  // *************************************************
  //********************* HTML ***********************/
  //**************************************************

  return (
    <section>
      <FormTable
        company_id={company_id}
        handleSubmit={handleSubmit}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
      />
      <UpdateTable
        company_id={company_id}
        tables={tables}
        loading={loading}
        error={error}
        deleteTable={deleteTable}
        updateTable={updateTable}
        startEditing={startEditing}
        editingTableId={editingTableId}
        setUpdate={setUpdate}
        update={update}
        setEditingTableId={setEditingTableId}
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        onDelete={startDeleting}
      />
    </section>
  );
};

export default AdminTable;
