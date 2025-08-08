import { useState } from 'react'
import BillInput from './BillInput'
import SelectPercentage from './SelectPercentage'
import Output from './Output'
import Reset from './Reset'
import './App.css'

function App() {

  const [bill, setBill] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [friendPercentage, setFriendPercentage] = useState(0);

  function handleBillChange(e) {
    if (bill===0) {
      setBill('');
    } else {
      setBill(Number(e.target.value))
    }

  }

  function handleReset() {
    setBill('');
    setFriendPercentage('');
    setPercentage('');
  }

  function handlePercentage(e) {
    setPercentage(Number(e.target.value));
  }

  function handleFriendPercentage(e) {
    setFriendPercentage(Number(e.target.value));
  }

  return (
    <>
      <BillInput 
        text='How much was the bill?'
        billValue={bill}
        onChange={handleBillChange}
      />
      <SelectPercentage
        percentageValue={percentage}
        onChange={handlePercentage}
      >
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage
        percentageValue={friendPercentage}
        onChange={handleFriendPercentage}
      >
        How did your friend like the service?
      </SelectPercentage>
      <Output
        billValue={bill}
        percentageValue={percentage}
        friendPercentageValue={friendPercentage}
      />
      <Reset
        onClick={handleReset}
      />
    </>
  )
}

export default App
