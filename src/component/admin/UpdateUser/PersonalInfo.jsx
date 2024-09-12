/* eslint-disable react/prop-types */
// PersonalInfo.jsx

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
      <div className="container_button">
        <button onClick={() => setOpenModalPersonalInfo(true)}>
          Modifier vos informations
        </button>
        {role === "admin" && (
          <button onClick={openChangePasswordModal}>
            Modifier le mot de passe
          </button>
        )}
        {role === "personal" && (
          <button onClick={openChangePasswordModal}>
            Changer le mot de passe
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
