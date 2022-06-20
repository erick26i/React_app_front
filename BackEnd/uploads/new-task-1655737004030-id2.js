import { createContext, useContext, useState } from 'react'

export const NocheContext = createContext(null)

export const useNoche = () => {
  return useContext(NocheContext)
}

export const NocheProvider = ({ children }) => {
  const [noche, setNoche] = useState(false)
  return (
    <NocheContext.Provider value={[noche, setNoche]}>
      {children}
    </NocheContext.Provider>
  )
}
