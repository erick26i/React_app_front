import { useToken } from '../Context/TokenContext';
import useFetch from '../hooks/useFetch';
import comentario from '../img/message.svg';
import checkmark from '../img/check.svg';
import serviceLogo from '../img/service.svg';
import { useModal } from '../Context/ModalContext';
import addfile from '../img/upload.svg';
import { Fragment } from 'react';
import './list.css';
import { useServiceId } from '../Context/IdContext';
import AddComments from './AddComments';
import AddMultiComments from './AddMultiComments';
import avatarSvg from '../img/avatar.svg';

function List() {
  const [token] = useToken();
  const [, setModal] = useModal('');
  const [, setId] = useServiceId('');
  const list = useFetch('http://127.0.0.1:3000/service/list');
  const users = useFetch('http://127.0.0.1:3000/service/users');

  return (
    <Fragment>
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
                  <aside key={u.id}>
                    <img id='avatar' src={avatarSvg} />
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
                    className='message '
                    src={comentario}
                    onClick={() => {
                      setId(lis.id);
                      setModal(<AddMultiComments />);
                    }}
                    alt='add-comment'
                  />
                )}
                {token && (
                  <img
                    className='checkmark '
                    src={checkmark}
                    onClick={() => setId(lis.id)}
                    alt='checkmark-btn'
                  />
                )}
                {token && (
                  <img
                    className='add-file '
                    src={addfile}
                    onClick={() => setId(lis.id)}
                    alt='add-btn'
                  />
                )}
              </div>
            </span>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default List;
