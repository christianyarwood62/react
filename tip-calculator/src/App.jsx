import { useState } from 'react'
import BillInput from './BillInput'
import SelectPercentage from './SelectPercentage'
import Output from './Output'
import Reset from './Reset'
import './App.css'

function App() {

  return (
    <>
      <BillInput 
        text='How much was the bill?'
      />
      <SelectPercentage/>
      <Output>

      </Output>
      <Reset>
        
      </Reset>
    </>
  )
}

export default App
