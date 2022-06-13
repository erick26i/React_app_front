import { Route, Routes } from 'react-router-dom'
import { useModal } from './Context/ModalContext'
import { useDarkMode } from './Context/DarkModeContext'
import Header from './components/Header/Header'
import Home from './components/Home&Register/Home'
import List from './services/List'
import CreateService from './services/CreateService'
import Modal from './components/Modal/Modal'
import './App.css'

function App() {
  const [modal] = useModal()
  const [darkMode] = useDarkMode()

  return (
    <div className={!darkMode === false ? "day" : "night" }>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/service/list' element={<List />} />
        <Route path='/service/add' element={<CreateService />} />        
      </Routes>
      {modal && <Modal>{modal}</Modal>}
    </div>
  )
}

export default App
