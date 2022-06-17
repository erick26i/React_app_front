import { useToken } from '../../Context/TokenContext';
import avatar from '../../img/avatar.svg';
import './ProfileHeader.css';

function ProfileHeader() {
  const [, setToken] = useToken();
  const user = JSON.parse(localStorage.getItem('user'));

  const clearStorage = async (e) => {
    e.preventDefault();
    localStorage.clear();
    setToken('');
  };

  return (
    <div>
      <span>{'Hello, ' + user}</span>
      <div id='profile'>
        <img className='profileLoged' src={avatar} alt='profile-loged' />
        <div className='menu'>
          <li className='li-menu' onClick={clearStorage}>
            Logout
          </li>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
