import { createContext, useContext, useState } from 'react'

export const UserContext = createContext(null)

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const betterSetUser = (newValue) => {
    localStorage.setItem('user', JSON.stringify(newValue))
    setUser(newValue)
  }

  return (
    <UserContext.Provider value={[user, betterSetUser]}>
      {children}
    </UserContext.Provider>
  )
}