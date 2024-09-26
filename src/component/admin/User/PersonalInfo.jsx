/* eslint-disable react/prop-types */
// PersonalInfo.jsx

import { Button } from "@mui/material";

const PersonalInfo = ({
  username,
  role,
  setOpenModalPersonalInfo,
  openChangePasswordModal,
}) => {
  return (
    <div className="container_personal_info">
      <h2>Vos informations</h2>
      <div className="container_info">
        <p>
          Identifiant : <span>{username}</span>
        </p>
        <p>
          Rôle : <span>{role}</span>
        </p>
      </div>
      <div className="container_Button">
        <Button onClick={() => setOpenModalPersonalInfo(true)}>
          Modifier vos informations
        </Button>
        {role === "admin" && (
          <Button onClick={openChangePasswordModal}>
            Modifier le mot de passe
          </Button>
        )}
        {role === "personal" && (
          <Button onClick={openChangePasswordModal}>
            Changer le mot de passe
          </Button>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
