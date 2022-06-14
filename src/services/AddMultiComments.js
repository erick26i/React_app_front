import { useState } from 'react'
import './AddComments.css'

export default function AddMultiComments() {
  const [list, setList] = useState([])
  const [newItem, setNewItem] = useState('')
  
  
  const handleAdd = async e => {
    e.preventDefault()
    setList([...list, newItem])
    setNewItem('')
  }
  JSON.stringify('message', list)
  console.log(list)

  return (
    <div>
      <ul>
        {list.map(i =>
          <li className="add-storage" key={i.length}>{i}</li>
        )}
      </ul>
      <input value={newItem} onChange={e => setNewItem(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}

