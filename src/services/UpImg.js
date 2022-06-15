import { useState } from "react"

export default function UpImg(){
    const [file, setFile] = useState(null)
    const [status, setStatus] = useState('')

    const sendHandler = async (e)=>{
    e.preventDefault();

        if(!file){
            setStatus('Not-file')
            return
        }
        else {
            setStatus('success')
        }
    const formatdata = new FormData()
    formatdata.append('file', file)

    fetch('http://localhost:3000/service/user/upfile',{
        method: 'POST',
        body: formatdata,
    })
    .then(res=>res.text())
    .then(res=>console.log(res))
    .catch(err=>{console.error(err)
    }) 
    setFile(null)
    }
    return (
        <form onSubmit={sendHandler} encType="multipart/form-data">
            <input type="file" onChange={e=>setFile(e.target.files[0])}/>
            <button>Enviar</button>
            {status === 'Not-file' && <p>alredy you chosen file?</p>}
            {status === 'success' && <p>Upload sucess !!</p>}            
        </form>
    )
}