import './Profile.css'

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))
  return(
    <div>
        <span>{'Hola, ' + user}</span>
    </div>
  )
}

export default Profile
