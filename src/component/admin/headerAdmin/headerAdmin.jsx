/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";
import "./headerAdmin.scss";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from '@mui/icons-material/Close';

const HeaderAdmin = ({
  user,
  OnClickDeconnection,
  openForm,
  onHomeClick,
  onClickUpdateInfo,
  onClickAddUser,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header>
      {!user.company_id && <h2>Let&apos;s send</h2>}
      {/* Bouton pour se déconnecter si une société est connectée */}
      {user.company_id && (
        <div className="header_connected">
          <div className="avatar">
            <Avatar
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
              src="/broken-image.jpg"
            />
            <p>{user.username}</p>
          </div>
          {openForm.initMenu !== true && (
            <ArrowBackIosIcon onClick={onHomeClick} />
          )}
        </div>
      )}

      {openMenu && (
        <div className="menu">
          <div>
            <LogoutIcon />
            <button
              onClick={() => {
                OnClickDeconnection();
                setOpenMenu(false);
              }}
            >
              Se déconnecter
            </button>
          </div>
          <div>
            <PersonIcon />
            <button
              onClick={() => {
                onClickUpdateInfo();
                setOpenMenu(false);
              }}
            >
              Modifier information profil
            </button>
          </div>
          {user.right === "admin" && <div>
            <PersonAddIcon />
            <button
              onClick={() => {
                onClickAddUser();
                setOpenMenu(false);
              }}
            >
              Créer un nouveau profil
            </button>
          </div>}
              <CloseIcon onClick={() => setOpenMenu(false)} className="close"/>
        </div>
      )}
    </header>
  );
};

export default HeaderAdmin;
