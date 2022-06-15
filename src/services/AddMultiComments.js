import { useState } from 'react';
import './AddComments.css';
import avatarSvg from '../img/avatar.svg';
import './AddMultiComments.css';

export default function AddMultiComments() {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    setList([...list, newItem]);
    setNewItem('');
  };
  JSON.stringify('message', list);
  console.log(list);

  return (
    <div className='comments-container'>
      <div className='container'>
        <h1>Leave a comment</h1>
        <ul className='ul-container'>
          {list.map((i) => (
            <li className='add-storage' key={i.length}>
              <img className='avatar' src={avatarSvg} alt='avatar' />
              {i}
            </li>
          ))}
        </ul>

        <input
          className='comment-input'
          placeholder='Write your commment here...'
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <input className='comment-btn' onClick={handleAdd} value='add' />
      </div>
    </div>
  );
}
