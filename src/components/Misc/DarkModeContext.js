import { createContext, useContext, useState } from 'react'

export const DarkModeContext = createContext(null)

export const useDarkMode = () => {
  return useContext(DarkModeContext)
}

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <DarkModeContext.Provider value={[darkMode, setDarkMode]}>
      {children}
    </DarkModeContext.Provider>
  )
}
