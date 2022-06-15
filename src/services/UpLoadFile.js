import { useState } from "react"
import { useServiceId } from "../Context/IdContext"
import { useModal } from "../Context/ModalContext"
import { useToken } from "../Context/TokenContext"

export default function UpLoadFile(){
    const [file, setFile] = useState(null)
    const [status, setStatus] = useState('')
    const [token] = useToken()
    const [, setModal] = useModal()
    const [id] = useServiceId('')
    
    const sendHandler = async e=>{
    e.preventDefault();
        if(file){
            const formatdata = new FormData()
            formatdata.append('file', file)
            await fetch(`http://localhost:3000/service/${id}/upfile`,{
            method: 'POST',
            headers: { 'Authorization': token },
            body: formatdata    
            })
            .then(res=>res.text())
            .then(res=>console.log(res))
            .catch(err=>{console.error(err)
             })
            setStatus('success')
        }
        else {
            setStatus('Not-file')
        }
        if(status === 'success'){
            
        }
        document.getElementById('fileinput').reset()
        setFile(null)
        setTimeout(() => {
            setModal(null)
        }, 2000);
    }
    return (
        <form id="fileinput" onSubmit={sendHandler}>
            <input  type="file" onChange={e=>setFile(e.target.files[0])}/>
            <button>Enviar</button>
            {status === 'Not-file' && <p>alredy you chosen file?</p>}
            {status === 'success' ? <p>Upload sucess !!</p> : ''}            
        </form>
    )
}