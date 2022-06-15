import { NavLink } from 'react-router-dom';
import { useModal } from '../../Context/ModalContext';
import { useToken } from '../../Context/TokenContext';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import profileImg from '../../img/user.svg';
import avatar from '../../img/user.svg';
import logo from '../../img/logo_hab.jpg';
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
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/service/list'>Services List</NavLink>
        {token && <NavLink to='/service/add'>Create Service</NavLink>}
      </div>
      {!token && (
        <>
          <img
            className='profileImg'
            src={avatar}
            alt='profile'
            onClick={() => setModal(<Login />)}
          />
        </>
      )}
      {token && <Profile />}
    </header>
  );
}
export default Header;
