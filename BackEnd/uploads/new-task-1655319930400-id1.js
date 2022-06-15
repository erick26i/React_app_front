import { useState } from 'react'
import Espera from './Espera'
import Interval from './Interval'
import Accordion from './Accordion'
import Hora from './Hora'
import Spam from './Spam'
import RickCharacter from './RickCharacter'
import './App.css'
import EightGag from './EightGag'
import Resolution from './Resolution'
import Player from './Player'
import PlainRef from './PlainRef'

function App() {
  const [id, setId] = useState(1)
  return (
    <div className="App">
      <Accordion title="Espera">
        <Espera />
      </Accordion>
      <Accordion title="Interval">
        <Interval />
      </Accordion>
      <Accordion title="Hora">
        <Hora />
      </Accordion>
      <Accordion title="Rick Character">
        <button onClick={() => setId(id + 1)}>Siguiente</button>
        <RickCharacter id={id} />
      </Accordion>
      <Accordion title="8gag">
        <EightGag />
      </Accordion>
      <Accordion title="Width">
        <Resolution />
      </Accordion>
      <Accordion title="Player">
        <Player />
      </Accordion>
      <Accordion title="PlainRef">
        <PlainRef />
      </Accordion>
      <Spam />
    </div>
  )
}

export default App
