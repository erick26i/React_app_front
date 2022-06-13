import { createContext, useContext, useState } from 'react'

export const TokenContext = createContext(null)

export const useToken = () => {
  return useContext(TokenContext)
}

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const betterSetToken = (newValue) => {
    localStorage.setItem('token', newValue)
    setToken(newValue)
  }

  return (
    <TokenContext.Provider value={[token, betterSetToken]}>
      {children}
    </TokenContext.Provider>
  )
}