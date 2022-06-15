import { useState, useEffect } from 'react'
import './EightGag.css'

function EightGag() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`https://8gag-api.anxoso.com/posts`)
      .then(res => res.json())
      .then(resData => setData(resData))
  }, [])

  if (!data) {
    return <div className="8gag">Cargando...</div>
  }

  return (
    <div className="gag">
      {data.map(post =>
        <div className="post" key={post.id}>
          <h2>{post.title}</h2>
          <img src={post.image} alt="Meme" />
        </div>
      )}
    </div>
  )
}

export default EightGag
