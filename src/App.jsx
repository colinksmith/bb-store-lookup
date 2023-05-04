import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react"
import Header from "./components/Header"
import Lookup from "./components/Lookup"
import Store from "./components/Store"
import storeData from "./assets/storeData"


function App() {
  const [storeNumberInput, setStoreNumberInput] = useState('')
  const [currentStore, setCurrentStore] = useState('')
  const [autoCopy, setAutoCopy] = useState(false)

  useEffect(() => {
    let storeNumber = storeNumberInput.padStart(4, '0')
    setCurrentStore(storeData[storeNumber])
  }, [storeNumberInput])

  function updatestoreNumberInput(event) {
    setStoreNumberInput(event.target.value)
  }
  function getStoreData() {
    // if (storeNumberInput.length > 4) {
    //   showErr('must be 4 numbers or less')
    //   return
    // }
    let storeNumber = storeNumberInput.padStart(4, '0')
    setCurrentStore(storeData[storeNumber])
    console.log(currentStore)
  }
  function copyStore() {
    console.log('copied ' + currentStore.address2.slice(-5))
    navigator.clipboard.writeText(currentStore.address2.slice(-5))
  }
  function toggleAutoCopy() {
    setAutoCopy(x => !x)
  }

  function showErr(message) {
    console.log(message)
  }

  return (
      <div className='h-100'>
          <Header />
          <Lookup  
            storeNumberInput={storeNumberInput}
            handleChange={updatestoreNumberInput}
            handleClick={getStoreData}
            autoCopy={autoCopy}
            handleCheckBox={toggleAutoCopy}

          />
          {(currentStore) 
          ? <Store 
              store={currentStore}
              handleClick={copyStore}
              autoCopy={autoCopy}
            />
          : <div>Hmm, store {storeNumberInput} doesn't seem to exist</div>}
          <footer>
            Copyright © 2023 <a href="https://colinkenjirosmith.netlify.app/">Colin Smith</a>. All Rights Reserved
          </footer>
      </div>
  )
}

export default App
