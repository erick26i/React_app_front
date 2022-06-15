import { useDarkMode } from '../../Context/DarkModeContext';
import { useToken } from '../../Context/TokenContext';
import userSvg from '../../img/user.svg';
import './Profile.css';

function Profile() {
  const [, setToken] = useToken();
  const [darkMode, setDarkMode] = useDarkMode(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const clearStorage = async (e) => {
    e.preventDefault();
    localStorage.clear();
    setToken('');
  };
  return (
    <div className='container-profile'>
      <span className='user'>{'Hello, ' + user}</span>
      <div id='profile'>
        <img className='profileLoged' src={userSvg} alt='profile-loged' />
        <div className='menu'>
          <li className='li-menu'>Profile</li>
          <li className='li-menu'>Setting</li>
          <li className='li-menu' onClick={() => setDarkMode(!darkMode)}>
            Darkmode
          </li>
          <li className='li-menu' onClick={clearStorage}>
            Logout
          </li>
        </div>
      </div>
    </div>
  );
}

export default Profile;
