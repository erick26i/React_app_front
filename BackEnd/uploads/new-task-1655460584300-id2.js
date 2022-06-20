import { useState } from 'react'

function Accordion({ children, title }) {
  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  return (
    <div className="accordion">
      <header>
        {title}
        <button onClick={handleClick}>+/-</button>
      </header>
      {show &&
        <main>
          {children}
        </main>
      }
    </div>
  )
}

export default Accordion
