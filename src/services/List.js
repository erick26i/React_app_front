import { useToken } from '../Context/TokenContext';
import useFetch from '../hooks/useFetch';
import comentario from '../img/comentario.png';
import checkmark from '../img/controlar.png';
import { useModal } from '../Context/ModalContext';
import addfile from '../img/agregar.png';
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
      <div id='service-list'>
        <h2>Servicios Disponibles</h2>
      </div>
      {list?.map((lis) => (
        <span id='cont' key={lis.id}>
          <h4>
            {users?.map((u) => (
              <aside key={u.id}>
                <img className='avatar' src={avatarSvg} />
                {u.id === lis.userId && u.username}
              </aside>
            ))}
          </h4>
          <label>Title: </label> <span className='resp-bd'>{lis.title}</span>
          <label>Description: </label>{' '}
          <span className='resp-bd'>{lis.description}</span>
          <label>Comments: </label>{' '}
          <span className='resp-bd'>
            {!lis.comments ? 'There is not data' : lis.comments}
          </span>
          <label>Files: </label>{' '}
          <span className='resp-bd'>{!lis.file && 'There is not data'} </span>
          <div className='buttons-service'>
            {token && (
              <img
                className='add-comment'
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
                className='checkmark'
                src={checkmark}
                onClick={() => setId(lis.id)}
                alt='checkmark-btn'
              />
            )}
            {token && (
              <img
                className='add-file'
                src={addfile}
                onClick={() => setId(lis.id)}
                alt='add-btn'
              />
            )}
          </div>
        </span>
      ))}
    </Fragment>
  );
}

export default List;
