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
        <ul className='ul-container'>
          {list.map((i) => (
            <li className='add-storage' key={i.length}>
              <img className='avatar' src={avatarSvg} />
              {i}
            </li>
          ))}
        </ul>
        <input
          className='comment-input'
          placeholder='your commment'
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <span>
          <button className='comment-btn' onClick={handleAdd}>
            Add
          </button>
        </span>
      </div>
    </div>
  );
}
