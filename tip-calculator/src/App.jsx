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

  // Function: handles the bill input component values by updating when the user types or resetting if the value is zero
  function handleBillChange(e) {
    if (bill===0) {
      setBill('');
    } else {
      setBill(Number(e.target.value))
    }

  }

  // Function: resets all input components back to default
  function handleReset() {
    setBill('');
    setFriendPercentage('');
    setPercentage('');
  }

  // Function: updates the input component when the user selects their tip
  function handlePercentage(e) {
    setPercentage(Number(e.target.value));
  }

  // Function: updates the input component when the user selects their friend's tip
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
