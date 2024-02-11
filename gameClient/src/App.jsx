import { useState } from 'react'
import './app.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='hello-div'> 
        <p> hello </p>

        <span> span spann </span>
      </div>
    </>
  )
}

export default App
