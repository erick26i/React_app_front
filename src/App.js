import { Route, Routes } from 'react-router-dom';
import { useDarkMode } from './components/Misc/DarkModeContext';
import { useUser } from './Context/UserContext';
import { useToken } from './Context/TokenContext';
import { useModal } from './Context/ModalContext';
import AddComments from './services/AddComments';
import Header from './components/Header/Header';
import Home from './components/Home&Register/Home';
import List from './services/List';
import Login from './components/Login/Login';
import Register from './components/Home&Register/Register';
import NewTask from './services/NewTask';
import CreateService from './services/CreateService';
import Modal from './components/Modal/Modal';
import GetUsers from './services/GetUsers';

function App() {
  const [modal] = useModal();
  /*const [token] = useToken()
  const [user] = useUser()
  const [darkmode, setDarkMode] = useDarkMode()*/

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/service/list' element={<List />} />
        <Route path='/service/user/task' element={<AddComments />} />
        <Route path='/service/add' element={<CreateService />} />
        <Route path='/login' element={<Login />} />
        <Route path='/service/users' element={<GetUsers />} />
      </Routes>

      {modal && <Modal>{modal}</Modal>}
    </div>
  );
}

export default App;
