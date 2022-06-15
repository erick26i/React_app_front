import { createContext, useContext, useState } from 'react'

export const FileContext = createContext(null)

export const useFile = () => {
  return useContext(FileContext)
}

export const FileProvider = ({ children }) => {
  const [file, setFile] = useState('')
  return (
    <FileContext.Provider value={[file, setFile]}>
      {children}
    </FileContext.Provider>
  )
}
