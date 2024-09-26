/* eslint-disable react/prop-types */
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import "./headerAdmin.scss";

const HeaderAdmin = ({
  user,
  OnClickDeconnection,
  openForm,
  onHomeClick,
  onClickUpdateInfo,
  onClickAddUser,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      {!user.company_id && <h2>Let&apos;s send</h2>}
      {/* Bouton pour se déconnecter si une société est connectée */}
      {user.company_id && (
        <div className="header_connected">
          <div className="avatar">
            <IconButton onClick={handleClickMenu}>
              <Avatar src="/broken-image.jpg" />
            </IconButton>
            <p>{user.username}</p>
          </div>
          {openForm.initMenu !== true && (
            <ArrowBackIosIcon onClick={onHomeClick} />
          )}
        </div>
      )}

      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
        <MenuItem
          onClick={() => {
            OnClickDeconnection();
            handleCloseMenu();
          }}
        >
          <LogoutIcon fontSize="small" />
          &nbsp; Se déconnecter
        </MenuItem>

        <MenuItem
          onClick={() => {
            onClickUpdateInfo();
            handleCloseMenu();
          }}
        >
          <PersonIcon fontSize="small" />
          &nbsp; Modifier profil
        </MenuItem>

        {user.right === "admin" && (
          <MenuItem
            onClick={() => {
              onClickAddUser();
              handleCloseMenu();
            }}
          >
            <PersonAddIcon fontSize="small" />
            &nbsp; Créer un nouveau profil
          </MenuItem>
        )}

        <MenuItem onClick={handleCloseMenu}>
          <CloseIcon fontSize="small" />
          &nbsp; Fermer
        </MenuItem>
      </Menu>
    </header>
  );
};

export default HeaderAdmin;
