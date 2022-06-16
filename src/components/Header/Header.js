import { NavLink } from 'react-router-dom';
import { useModal } from '../../Context/ModalContext';
import { useToken } from '../../Context/TokenContext';
import Login from '../Login/Login';
import logo from '../../img/logo_hab.jpg';
import avatar from '../../img/avatar.svg';
import ProfileHeader from '../Profile/ProfileHeader';
import './Header.css';

function Header() {
  const [token] = useToken();
  const [, setModal] = useModal();

  return (
    <header id='top-bar' onSubmit={(e) => e.preventDefault()}>
      <div>
        <span>
          <img className='logo' src={logo} alt='logo' />
        </span>
        <NavLink className='nav-link' to='/'>
          Home
        </NavLink>
        <NavLink className='nav-link' to='/service/list'>
          Services List
        </NavLink>
        {token && (
          <NavLink className='nav-link' to='/service/add'>
            Create Service
          </NavLink>
        )}
      </div>
      {!token && (
        <img
          className='profileImg'
          src={avatar}
          alt='profile'
          onClick={() => setModal(<Login />)}
        />
      )}
      {token && <ProfileHeader />}
    </header>
  );
}
export default Header;
