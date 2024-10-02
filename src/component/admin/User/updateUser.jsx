/* eslint-disable react/prop-types */
import "./updateUser.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalPersonalInfo from "./modalPersonalInfo";
import PersonalInfo from "./PersonalInfo";
import ChangePasswordDialog from "./ModalPersonalPwd";
import ModalDeleteUser from "./modalDelete";
import ModalUpdateOther from "./modalUpdateOther";
import { Button } from "@mui/material";
const apiUrl = import.meta.env.VITE_API_URL;

const UpdateUser = ({ company_id, user_id, username, role }) => {
  // *************************************************
  //************** UseState Data *********************/
  //**************************************************

  const [formData, setFormData] = useState({
    username: username,
    role: role,
    company_id: company_id,
    password: "",
    confirmedPassword: "",
  });

  const [selectedUser, setSelectedUser] = useState({
    username: "",
    role: "",
    user_id: null,
    password: "",
    confirmedPassword: "",
  });

  // *********************************************************
  //************** UseState Loading Data *********************/
  //***********************************************************

  const [UsersExcludingYou, setUsersExcludingYou] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(true);

  // *************************************************
  //************** UseState Modal *********************/
  //**************************************************

  const [openModalPersonalInfo, setOpenModalPersonalInfo] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openEditOtherProfilModal, setOpenEditOtherProfilModal] =
    useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // *************************************************
  //************** HandleChange Function *************/
  //**************************************************
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeOtherProfil = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // *************************************************
  //************** Handle Submit Function ************/
  //**************************************************
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.password !== formData.confirmedPassword) {
        toast.error("Vous n'avez pas entré les mêmes mot de passe");
        return;
      }
      const response = await axios.put(
        `${apiUrl}/api/auth/update/${user_id}`,
        formData
      );
      toast.success(response.data.message);
      setOpenModalPersonalInfo(false);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", err);
    }
  };

  const handleSubmitEditOtherUser = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser.password !== selectedUser.confirmedPassword) {
        toast.error("Vous n'avez pas entré les mêmes mot de passe");
        return;
      }
      const response = await axios.put(
        `${apiUrl}/api/auth/update/${selectedUser.id}`,
        selectedUser
      );
      toast.success(response.data.message);
      setReload(!reload);
      setOpenEditOtherProfilModal(false);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", err);
    }
  };

  // *************************************************
  //***********  Delete Function *********************/
  //**************************************************

  const deleteUser = async (data) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/auth/delete/${data.id}`
      );
      toast.success(response.data.message);
      setReload(!reload);
      setOpenDeleteModal(false);
    } catch (err) {
      console.error("Erreur lors de la suppression de l'utilisateur", err);
      toast.error(
        "Erreur lors de la suppression de l'utilisateur",
        err.message
      );
      setOpenDeleteModal(false);
    }
  };

  // *************************************************
  //************** Loading Function ******************/
  //**************************************************

  const loadAllUsersExcludingYou = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/auth/getAllUsers`, {
        company_id,
        user_id,
      });
      if (response.data) {
        setUsersExcludingYou(response.data);
      }
    } catch (err) {
      toast.error(
        "Nous n'avons pas pu charger les profils de votre entreprise"
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllUsersExcludingYou();
  }, [reload]);

  // *************************************************
  //************** OpenModal Function ****************/
  //**************************************************

  const openChangePasswordModalFunction = () => {
    setOpenChangePasswordModal(true);
  };

  const openEditOtherProfilModalFunction = (user) => {
    setOpenEditOtherProfilModal(true);
    setSelectedUser({
      username: user.username,
      role: user.role,
      id: user.id,
      company_id: user.company_id,
    });
  };

  const openDeleteModalFunction = (user) => {
    setOpenDeleteModal(true);
    setSelectedUser({
      username: user.username,
      role: user.role,
      id: user.id,
      company_id: user.company_id,
    });
  };

  return (
    <div className="container_updateUser">
      <div className="container_personal_info">
        <PersonalInfo
          username={username}
          role={role}
          setOpenModalPersonalInfo={setOpenModalPersonalInfo}
          openChangePasswordModal={openChangePasswordModalFunction}
        />

        <ModalPersonalInfo
          open={openModalPersonalInfo}
          onClose={() => setOpenModalPersonalInfo(false)}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <ChangePasswordDialog
          open={openChangePasswordModal}
          onClose={() => setOpenChangePasswordModal(false)}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
        />
      </div>

      <ModalDeleteUser
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        deleteUser={() => deleteUser(selectedUser)}
        user={selectedUser}
      />

      <ModalUpdateOther
        open={openEditOtherProfilModal}
        onClose={() => {
          setOpenEditOtherProfilModal(false);
        }}
        user={selectedUser}
        handleSubmit={handleSubmitEditOtherUser}
        handleChange={handleChangeOtherProfil}
      />

      {role === "admin" && !loading && (
        <div className="container_other_info">
          <h2>Autres profils</h2>
          {UsersExcludingYou.map((user) => (
            <div className="container_one_profil" key={user.id}>
              <span>{user.username}</span>
              <Button onClick={() => openEditOtherProfilModalFunction(user)}>
                Modifier
              </Button>
              <Button
                onClick={() => {
                  openDeleteModalFunction(user);
                }}
              >
                Supprimer
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
