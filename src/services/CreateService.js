import { useState } from 'react'
import { useToken } from '../Context/TokenContext'
import { useUser } from '../Context/UserContext'
function CreateService() {
  const [token] = useToken()
  const [username] = useUser()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [comments, setComments] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://127.0.0.1:3000/service/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ title, description, comments, username }),
      })
      setStatus('success')
    } catch (e) {
      setError('error')
    }
  }

  return (
    <aside>
      <form id='create-service' onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Description:</span>
          <input
            name='description'
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          <span>Comments:</span>
          <input
            name='comments'
            type='text'
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </label>
        <button>Create Service</button>
        {error ? <h3 className='error-message'>{error}</h3> : null}
        {status ? (
          <p className='service-create'>
            Congratulations! Service Created!
          </p>
        ) : null}
      </form>
    </aside>
  )
}

export default CreateService;
