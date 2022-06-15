import { useState } from 'react';
import { useToken } from '../Context/TokenContext';
import imagen from '../img/service_bg2.svg';
import './createService.css';

function CreateService() {
  const [token] = useToken();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:3000/service/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ title, description }),
      });
      setStatus('success');
    } catch (e) {
      setError('error');
      console.warn(e);
    }
  };

  return (
    <aside className='aside'>
      <img src={imagen} alt='img' className='service-bg' />
      <form id='create-service' onSubmit={handleSubmit}>
        <label>
          <span className='service-title'>Title:</span>
          <input
            className='service-input'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span className='service-title'>Description:</span>
          <input
            className='service-input'
            name='description'
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className='service-title'>
          <span>Comments:</span>
          <input
            className='service-input'
            name='comments'
            type='text'
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </label>
        <button className='service-btn'>Create Service</button>
        {error ? <h3 className='error-message'>{error}</h3> : null}
        {status ? (
          <p className='service-create'>Congratulations! Service Created!</p>
        ) : null}
      </form>
    </aside>
  );
}

export default CreateService;
