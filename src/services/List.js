import { useToken } from '../Context/TokenContext'
import useFetch from '../hooks/useFetch'
import comentario from '../img/comentario.png'
import checkmark from '../img/controlar.png'
import { useModal } from '../Context/ModalContext'
import addfile from '../img/agregar.png'
import { Fragment } from 'react'
import './list.css'
import { useServiceId } from "../Context/IdContext"
import AddComments from './AddComments'

function List(){
  const [token] = useToken()
  const [, setModal] = useModal('')
  const [id, setId] = useServiceId('')
  const list = useFetch('http://127.0.0.1:3000/service/list')
  const users = useFetch('http://127.0.0.1:3000/service/users')
    return (
      <Fragment>
          <div id="service-list">
              <h2>Servicios Disponibles</h2>
          </div>
                {list?.map(lis => 
                  <span id="cont" key={lis.id}>
                      <h4>{users?.map(u=><aside key={u.id}>{u.id === lis.userId && u.username}</aside>)}</h4>
                      <label>Title: </label> <span className="resp-bd">{lis.title}</span>
                      <label>Description: </label> <span className="resp-bd">{lis.description}</span>
                      <label>Comments: </label> <span className="resp-bd">{!lis.comments ? 'There is not data' : lis.comments}</span>
                      <label>Files: </label> <span className="resp-bd">{!lis.file && 'There is not data'} </span>
                      {token && <button className="comment-btn" onClick={()=>setId(lis.id)}><img className="add-comment" src={comentario} alt='add-comment' onClick={() => setModal(<AddComments />)}/></button>}
                      {token && <button className="checkmark-btn"><img className="checkmark" src={checkmark} alt='checkmark-btn' /></button>}
                      {token && <button className="addfile-btn"><img className="add-file" src={addfile} alt='add-btn' /></button>}
                  </span>)}
              
        </Fragment>
  )
 }

 export default List