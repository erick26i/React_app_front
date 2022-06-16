import { useToken } from '../Context/TokenContext'
import useFetch from '../hooks/useFetch'
import comentario from '../img/comentario.png'
import checkmark from '../img/controlar.png'
import { useModal } from '../Context/ModalContext'
import addfile from '../img/agregar.png'
import { useServiceId } from "../Context/IdContext"
import AddComments from './AddComments'
import UpLoadFile from './UpLoadFile'
import CompleteWork from './CompleteWork'
import DeleteService from './DeleteService'
import './list.css'

function List(){
  const [token] = useToken()
  const [, setModal] = useModal('')
  const [, setId] = useServiceId('')
  const list = useFetch('http://127.0.0.1:3000/service/list')
  const users = useFetch('http://127.0.0.1:3000/service/users')
  return (
    <>
          <div id="service-list">
              <h2>Servicios Disponibles</h2>
                {list?.map(lis => 
                  <span id="cont" key={lis.id}>
                      <h4>{users?.map(u=><aside key={u.id}>{u.id === lis.userId && u.username}</aside>)}</h4>
                      <div>
                      <label>Title: </label> <span className="resp-bd">{lis.title}</span>
                      <label>Description: </label> <span className="resp-bd">{lis.description}</span>
                      <label>Comments: </label> <span className="resp-bd">{!lis.comments ? 'There is not data' : lis.comments}</span>
                      <label>Files: </label> <span className="resp-bd">{!lis.file ? 'There is not data' : lis.file} </span>
                      {lis.complete === 1 && <label>Completed</label>}</div>
                    {token && 
                        <img className="add-comment" src={comentario} 
                          onClick={()=> {
                            setId(lis.id)
                            setModal(<AddComments/>)}} 
                          alt='add-comment'/>}
                    {token && 
                        <img className="checkmark" src={checkmark} 
                        onClick={()=>{setId(lis.id)
                                  setModal(<CompleteWork/>)}}
                        alt='checkmark-btn' />}
                    {token && 
                        <img className="add-file" src={addfile} 
                         onClick={()=>{
                            setId(lis.id)
                            setModal(<UpLoadFile />)}}
                         alt='add-btn' />}
                    {token && 
                        <span className='del-btn'
                         onClick={()=>{
                            setId(lis.id)
                            setModal(<DeleteService />)}}
                         alt='del-btn'>X</span>}
                  </span>)}
            </div>
      </>
  )
 }

 export default List