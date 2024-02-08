import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(7)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  //for copying password to clipboard
  const copyPasswordToClip = (() => { 
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  })

  //usecallback
  //usecallback( ()=>{}, [])
  //usecallback( arrowfunction, dependencies)
  const passGen = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*()_+{}:<>?|-=[];',./"

    for (let i = 1; i <= length; i++) {
      var char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])

  //useEffect
  useEffect(() => { passGen() },
    [length, numAllowed, charAllowed, passGen])

  return (
    <>
      <div className='container'>
        <h1>Password generator</h1>
        <form>
          <div className='genPass'>
            <input
              type='text'
              id='pass'
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button type='button' onClick={copyPasswordToClip}>Copy</button>
          </div>
          <div className='create'>

            <div>
              <input
                type='range'
                id='length'
                min={4}
                max={15}
                value={length}
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label htmlFor='length'>Length({length})</label>
            </div>

            <div>
              <input
                type='checkbox'
                id='numbers'
                onChange={() => {
                  setNumAllowed((prev) => !prev)
                }} />
              <label htmlFor='numbers'>Numbers</label>
            </div>

            <div>
              <input
                type='checkbox'
                id='characters'
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }} />
              <label htmlFor='characters'>Characters</label>
            </div>

          </div>
        </form>
      </div>
    </>
  )
}

export default App
