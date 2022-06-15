import { useState } from "react"
import { useFile } from "../Context/FileContext"
import { useServiceId } from "../Context/IdContext"
import { useModal } from "../Context/ModalContext"
import { useToken } from "../Context/TokenContext"
import FileState from "./FileState"

export default function UpLoadFile(){
    const [file, setFile] = useFile('')
    const [files, setFiles] = useState(null)
    const [status, setStatus] = useState('')
    const [token] = useToken()
    const [, setModal] = useModal()
    const [id] = useServiceId('')
    
    const sendHandler = async e=>{
    e.preventDefault();
        if(files){
            const formatdata = new FormData()
            formatdata.append('file', files)
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
        
        document.getElementById('fileinput').reset()
        setFiles(null)
        setTimeout(() => {
            setModal(null)
        }, 2000)}
    }

    const handleClick = async e=>{
        e.preventDefault()
        return <FileState/>
    }

    return (
        <>
            <h2> Upload File</h2>
            <form id="fileinput" onSubmit={sendHandler}>
                <input placeholder="No file selected" type="file" onChange={e=>setFiles(e.target.files[0])}/>
                <button onClick={handleClick}>Upload</button>
                {status === 'Not-file' && <p>alredy you chosen file?</p>}
                {status === 'success' ? <p>Upload sucess !!</p> : ''}            
            </form>
        </>
    )
}