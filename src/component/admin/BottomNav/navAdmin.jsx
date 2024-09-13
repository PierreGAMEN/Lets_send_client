/* eslint-disable react/prop-types */
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import "./navAdmin.scss";

const NavAdmin = ({ onHomeClick, onFollowOrder, onTableOrder }) => {
  return (
    <nav className='navAdmin'>
      <div>
        <AddShoppingCartRoundedIcon onClick={onTableOrder}/>
        <p>Commander</p>
      </div>
      <div onClick={onHomeClick}>
        <HomeRoundedIcon />
        <p>Accueil</p>
      </div>
      <div>
        <FormatListNumberedRoundedIcon onClick={onFollowOrder}/>
        <p>Suivre</p>
      </div>
    </nav>
  );
};

export default NavAdmin;
