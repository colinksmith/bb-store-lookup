import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react"
import Header from "./components/Header"
import Lookup from "./components/Lookup"
import Store from "./components/Store"
import storeData from "./assets/storeData"


function App() {
  const [storeNumberInput, setstoreNumberInput] = useState('')
  const [currentStore, setCurrentStore] = useState('')

  function updatestoreNumberInput(storeId) {
    setstoreNumberInput(storeId)
    console.log(storeId)
  }
  function getStoreData() {
    if (storeNumberInput.length > 4) {
      showErr('must be 4 numbers or less')
      return
    }
    let storeNumber = storeNumberInput.padStart(4, '0')
    setCurrentStore(storeData[storeNumber])
    console.log(currentStore)
  }

  function showErr(message) {
    console.log(message)
  }

  return (
      <div>
          <Header />
          <Lookup  
            storeNumberInput={storeNumberInput}
            handleChange={updatestoreNumberInput}
            handleClick={getStoreData}

          />
          {currentStore && <Store 
            store={currentStore}
          />}
      </div>
  )
}

export default App
