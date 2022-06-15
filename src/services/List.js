import { useToken } from '../Context/TokenContext'
import useFetch from '../hooks/useFetch'
import comentario from '../img/comentario.png'
import checkmark from '../img/controlar.png'
import { useModal } from '../Context/ModalContext'
import addfile from '../img/agregar.png'
import './list.css'
import { useServiceId } from "../Context/IdContext"
import AddComments from './AddComments'
import AddMultiComments from './AddMultiComments'
import UpLoadFile from './UpLoadFile'
import FileState from './FileState'
import { useFile } from '../Context/FileContext'

function List(){
  const [token] = useToken()
  const [, setFile] = useFile('')
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
                      <label>Title: </label> <span className="resp-bd">{lis.title}</span>
                      <label>Description: </label> <span className="resp-bd">{lis.description}</span>
                      <label>Comments: </label> <span className="resp-bd">{!lis.comments ? 'There is not data' : lis.comments}</span>
                      <label>Files: </label> <span className="resp-bd"><FileState/> </span>
                    {token && 
                        <img className="add-comment" src={comentario} 
                          onClick={()=> {
                            setId(lis.id)
                            setModal(<AddMultiComments />)}} 
                          alt='add-comment'/>}
                    {token && 
                        <img className="checkmark" src={checkmark} 
                        onClick={()=>setId(lis.id)}
                        alt='checkmark-btn' />}
                    {token && 
                        <img className="add-file" src={addfile} 
                         onClick={()=>{
                            setId(lis.id)
                            setModal(<UpLoadFile />)
                            setFile(lis.file)}}
                         alt='add-btn' />}
                  </span>)}
            </div>

                  </>
  )
 }

 export default List