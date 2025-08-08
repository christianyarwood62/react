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
        text='How did you like the service?'
        percentageValue={percentage}
        onChange={handlePercentage}
      />
      <SelectPercentage
        text='How did your friend like the service?'
        percentageValue={friendPercentage}
        onChange={handleFriendPercentage}

      />
      <Output
        billValue={bill}
        percentageValue={percentage}
        friendPercentageValue={friendPercentage}
      />
      <Reset/>
    </>
  )
}

export default App
