import { useState } from 'react'
import BillInput from './BillInput'
import SelectPercentage from './SelectPercentage'
import Output from './Output'
import Reset from './Reset'
import './App.css'

function App() {

  const [bill, setBill] = useState('')

  function handleBillChange(e) {
      setBill(e.target.value)
  }

  return (
    <>
      <BillInput 
        text='How much was the bill?'
        value={bill}
        onChange={handleBillChange}
      />
      <SelectPercentage
        text='How did you like the service?'
      />
      <Output
        value={bill}
      >
      </Output>
      <Reset
      >
        
      </Reset>
    </>
  )
}

export default App
