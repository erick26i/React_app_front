import { NavLink } from "react-router-dom"
import { useModal } from "../../Context/ModalContext"
import { useToken } from "../../Context/TokenContext"
import Login from '../Login/Login'
import Profile from "../Profile/Profile"
import './Header.css'

function Header() {
    const [token, setToken] = useToken()
    const [, setModal] = useModal()
   
    
  return (
    <header id="top-bar" onSubmit={e => e.preventDefault()}>
      <div>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/service/list">Lista de tareas</NavLink>
        {token && <NavLink to="/service/user/task">Añadir Comentario</NavLink>}
        {token && <NavLink to="/service/add">Crear Servicio</NavLink>}
      </div>
      <div id="buttons">
        {!token && <button id="login-butt" onClick={()=>setModal(<Login/>)}>Sign up </button>}
        {token && <button id="logout-butt" onClick={()=>setToken('')}>Logout </button>}
        {token && <Profile />}
      </div>
        
    </header>
  )
}
export default Header