import { useState } from 'react';
import { useToken } from '../Context/TokenContext';

function CreateService() {
  const [token] = useToken();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

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
      console.log(res);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <aside>
      <form id='create-service' onSubmit={handleSubmit}>
        <label>
          <span>Titulo:</span>
          <input
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Descripcion:</span>
          <input
            name='description'
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button>Crear Servicio</button>
      </form>
    </aside>
  );
}

export default CreateService;
