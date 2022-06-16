import { Link } from 'react-router-dom'
import { useDarkMode } from '../../Context/DarkModeContext'
import { useToken } from '../../Context/TokenContext'
import profileImg from '../../img/user.png'

function ProfileHeader() {
  const [, setToken] = useToken()
  const [darkMode, setDarkMode] = useDarkMode(false)
  const user = JSON.parse(localStorage.getItem('user'))
  
  const clearStorage = async e =>{
    e.preventDefault()
    localStorage.clear()
    setToken('')
  }
  
  return(
    <div>
        <span>{'Hello, ' + user}</span>
        <div id="profile">
          <img className="profileLoged" src={profileImg} alt='profile-loged'/>
          <div className="menu">
            <li className="li-menu"><Link id="link" to="/service/user/profile">Profile</Link></li>
            <li className="li-menu" onClick={()=>setDarkMode(!darkMode)}>Darkmode</li>
            <li className="li-menu" onClick={clearStorage}>Logout</li>
          </div>
      </div>
    </div>
  )
}

export default ProfileHeader
