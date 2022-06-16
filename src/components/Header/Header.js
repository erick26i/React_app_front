import { NavLink } from "react-router-dom"
import { useModal } from "../../Context/ModalContext"
import { useToken } from "../../Context/TokenContext"
import Login from '../Login/Login'
import profileImg from '../../img/user.png'
import ProfileHeader from "../Profile/ProfileHeader"
import './Header.css'

function Header() {
    const [token] = useToken()
    const [, setModal] = useModal()

  return (
    <header id="top-bar" onSubmit={e => e.preventDefault()}>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/service/list">Services List</NavLink>
        {token && <NavLink to="/service/add">Create Service</NavLink>}
      </div>
        {!token && <img className="profileImg" src={profileImg} alt='profile' onClick={() => setModal(<Login/>)}/>}
        {token && <ProfileHeader/>}
    </header>
  )
}
export default Header