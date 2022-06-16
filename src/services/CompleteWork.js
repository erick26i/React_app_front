import { useServiceId } from "../Context/IdContext"
import { useModal } from "../Context/ModalContext"
import { useToken } from "../Context/TokenContext"

export default function CompleteWork(){
    const [token] = useToken()
    const [id] = useServiceId()
    const [, setModal] = useModal()

    const handleSubmit = async e => {
    e.preventDefault()
    try {
    await fetch(`http://127.0.0.1:3000/service/${id}`, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token 
        },
        body: JSON.stringify({ id })
    })
      return setModal(null)
    } catch (e) {
      console.warn(e)
    }
  }

   return (
    <div>
        <form onSubmit={handleSubmit}>
            <span>are you sure to complete service?</span>
            <button>Accept</button>
        </form>
        <button onClick={()=>setModal(null)}>Cancel</button>
    </div>
  )
}