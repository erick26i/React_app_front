import { useState } from "react"
import { useToken } from "../Context/TokenContext"
import { useUser } from "../Context/UserContext"
import './AddComments.css'

function AddComments(){
    const [token] = useToken()
    const [username] = useUser()
    const [comments, setComments] = useState()
    
    const handleSubmit = async e => {
    e.preventDefault()
    try {
    const res = await fetch('http://127.0.0.1:3000/service/user/task', {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token 
        },
        body: JSON.stringify({ username, comments })
    })
    } catch (e) {
      console.warn(e)
    }
  }

   return (
    <aside>
      <form id="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>New Comment:</span>
          <textarea name="comments" value={comments} onChange={e => setComments(e.target.value)}/>
          </label>
        <button>Add Comments</button>
    </form>
    </aside>
  )
}


export default AddComments