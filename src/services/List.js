import { useToken } from '../Context/TokenContext';
import useFetch from '../hooks/useFetch';
import { useModal } from '../Context/ModalContext';
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
  const [token] = useToken()
  const [, setModal] = useModal('')
  const {data: list, setData: setList} = useFetch('http://127.0.0.1:3000/service/list')
  const {data: users} = useFetch('http://127.0.0.1:3000/service/users')
  /* BUTTONS LOGIC */
  const updateComment = ({serviceId, comment}) =>{
    setList(list.map(item => {
      if(item.id === serviceId) {
        item.comments = comment;
      }
      return item;
    }))
  }
  const markComplete = ({serviceId, complete}) =>{
    setList(list.map(item => {
      if(item.id === serviceId) {
        item.complete = complete;
      }
      return item;
    }))
  }
  const updateFile = ({serviceId, updateFile})=>{
    setList(list.map(item => {
      if(item.id === serviceId) {
        item.file = updateFile;
      }
      return item;
    }))
  }
  const deleteFile = ({serviceId})=>{
    setList(list.filter((item) => 
    item.id !== serviceId
    ))
  }

  return (
    <>
      {/* MAIN TITLE */}
      <div id='service-list'>
        <h2>
          <img src={serviceLogo} alt='logo' className='service-logo' />
          Available Services
        </h2>
      </div>
      <div className='list-container'>
        <div className='list-key'>
          {list?.map((lis) => (
            <span id={!lis.complete ? 'cont' : 'cont-completed'} key={lis.id}>
            {/* USER RENDER */}
              <h4>
                {users?.map((u) => (
                  <aside key={u.id} className='user-container'> 
                    {u.id === lis.userId && <><img id='avatar' src={avatarSvg} alt='avatar_img'/>{u.username}</>}
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
              {' '}
              </span>
              {/* FILE RENDER */}
              <label>Files: </label>{' '}
              <span className='resp-bd '>
                {!lis.file ? 'There is not data' : lis.file}{' '}
              </span>
              {''}
              <span className='resp-bd-completed'>
                {!lis.complete ? '' : 'Completed'}{' '}
              </span>
              {/* BUTTONS */}
              <div className={!lis.complete ? 'buttons-service' : 'buttons-completed'}>
                {token && (
                  <img
                    className='message'
                    src={comentario}
                    onClick={() => {
                      setModal(<AddComments id={lis.id} updateComment={updateComment}/>)
                    }}
                    alt='add-comment'
                  />
                )}
                {token && (
                  <img
                    className='checkmark'
                    src={checkmark}
                    onClick={() => {
                      setModal(<CompleteWork id={lis.id} markComplete={markComplete}/>);
                    }}
                    alt='checkmark-btn'
                  />
                )}
                {token && (
                  <img
                    className='add-file'
                    src={upload}
                    onClick={() => {
                      setModal(<UpLoadFile id={lis.id} updateFile={updateFile}/>);
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
                        setModal(<DeleteService id={lis.id} deleteFile={deleteFile}/>);
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
