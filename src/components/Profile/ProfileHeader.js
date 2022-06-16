import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useDarkMode } from '../../Context/DarkModeContext'
import { useToken } from '../../Context/TokenContext'
import profileImg from '../../img/user.png'
import Profile from './Profile'
import './Profile.css'

function ProfileHeader() {
  const [, setToken] = useToken()
  const [darkMode, setDarkMode] = useDarkMode(false)
  const user = JSON.parse(localStorage.getItem('user'))
  
  const clearStorage = async e =>{
    e.preventDefault()
    localStorage.clear()
    setToken('')
  }

  const handleClick = async (e) =>{
    e.preventDefault()
    console.log(<Navigate to="/"/>)
    return <Profile/>
    }
  
  
  return(
    <div>
        <span>{'Hello, ' + user}</span>
        <div id="profile">
          <img className="profileLoged" src={profileImg} alt='profile-loged'/>
          <div className="menu">
            <li className="li-menu" onClick={handleClick}>Profile</li>
            <li className="li-menu">Setting</li>
            <li className="li-menu" onClick={()=>setDarkMode(!darkMode)}>Darkmode</li>
            <li className="li-menu" onClick={clearStorage}>Logout</li>
          </div>
      </div>
    </div>
  )
}

export default ProfileHeader
