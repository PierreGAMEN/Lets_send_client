/* eslint-disable react/prop-types */
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import "./navAdmin.scss";

const NavAdmin = ({ onHomeClick, onFollowOrder, onTableOrder }) => {
  const [value, setValue] = useState(null);
  return (
    <BottomNavigation
      className="navAdmin"
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        onClick={onTableOrder}
        label="Commander"
        icon={<AddShoppingCartRoundedIcon />}
      ></BottomNavigationAction>

      <BottomNavigationAction
        onClick={onHomeClick}
        label="Accueil"
        icon={<HomeRoundedIcon />}
      ></BottomNavigationAction>

      <BottomNavigationAction
        onClick={onFollowOrder}
        label="Suivi"
        icon={<FormatListNumberedRoundedIcon />}
      ></BottomNavigationAction>
    </BottomNavigation>
  );
};

export default NavAdmin;
