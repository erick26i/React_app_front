import { createContext, useContext, useState } from 'react'

export const ServiceIdContext = createContext(null)

export const useServiceId = () => {
  return useContext(ServiceIdContext)
}

export const ServiceIdProvider = ({ children }) => {
  const [id, setId] = useState('')
  return (
    <ServiceIdContext.Provider value={[id, setId]}>
      {children}
    </ServiceIdContext.Provider>
  )
}
