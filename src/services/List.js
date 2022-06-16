import { useToken } from '../Context/TokenContext';
import useFetch from '../hooks/useFetch';

import { useModal } from '../Context/ModalContext';

import { useServiceId } from '../Context/IdContext';
import AddComments from './AddComments';
import UpLoadFile from './UpLoadFile';
import CompleteWork from './CompleteWork';
import DeleteService from './DeleteService';
/* SVG */
import upload from '../img/upload.svg';
import checkmark from '../img/check.svg';
import serviceLogo from '../img/service.svg';
import close from '../img/close.svg';
import comentario from '../img/message.svg';
import avatarSvg from '../img/avatar.svg';
/* == */
import './list.css';

function List() {
  const [token] = useToken();
  const [, setModal] = useModal('');
  const [, setId] = useServiceId('');
  const list = useFetch('http://127.0.0.1:3000/service/list');
  const users = useFetch('http://127.0.0.1:3000/service/users');

  return (
    <>
      {/* MAIN TITLE */}
      <div id='service-list'>
        <h2>
          <img src={serviceLogo} alt='logo' className='service-logo' />
          Servicios Disponibles
        </h2>
      </div>
      <div className='list-container'>
        <div className='list-key'>
          {list?.map((lis) => (
            <span id='cont' key={lis.id}>
              {/* USER RENDER */}
              <h4>
                {users?.map((u) => (
                  <aside key={u.id} className='user-container'>
                    <img id='avatar' src={avatarSvg} alt='avatar_img' />
                    {u.id === lis.userId && u.username}
                  </aside>
                ))}
              </h4>
              {/* TITEL RENDER */}
              <label>Title: </label>
              <span className='resp-bd '>{lis.title}</span>
              {/* DESCRIPTION RENDER */}
              <label>Description: </label>{' '}
              <span className='resp-bd '>{lis.description}</span>
              {/* COMMENTS RENDER */}
              <label>Comments: </label>{' '}
              <span className='resp-bd '>
                {!lis.comments ? 'There is not data' : lis.comments}
              </span>
              {/* FILE RENDER */}
              <label>Files: </label>{' '}
              <span className='resp-bd '>
                {!lis.file && 'There is not data'}{' '}
              </span>
              {/* BUTTONS */}
              <div className='buttons-service'>
                {token && (
                  <img
                    className='message'
                    src={comentario}
                    onClick={() => {
                      setId(lis.id);
                      setModal(<AddComments />);
                    }}
                    alt='add-comment'
                  />
                )}
                {token && (
                  <img
                    className='checkmark'
                    src={checkmark}
                    onClick={() => {
                      setId(lis.id);
                      setModal(<CompleteWork />);
                    }}
                    alt='checkmark-btn'
                  />
                )}
                {token && (
                  <img
                    className='add-file'
                    src={upload}
                    onClick={() => {
                      setId(lis.id);
                      setModal(<UpLoadFile />);
                    }}
                    alt='add-btn'
                  />
                )}
                {token && (
                  <span>
                    <img
                      className='del-btn'
                      src={close}
                      onClick={() => {
                        setId(lis.id);
                        setModal(<DeleteService />);
                      }}
                      alt='add-btn'
                    />
                  </span>
                )}
              </div>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default List;
