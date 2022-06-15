import { useState } from "react"
import { useToken } from "../Context/TokenContext"

export default function UpLoadFile(){
    const [file, setFile] = useState(null)
    const [status, setStatus] = useState('')
    const [token] = useToken()

    const sendHandler = async e=>{
    e.preventDefault();

        if(file){
            const formatdata = new FormData()
            formatdata.append('file', file)
            await fetch('http://localhost:3000/service/user/upfile',{
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token },
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
    setStatus('')

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