import { useState, useCallback, useEffect } from 'react' // Added useEffect import
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numbers, setnumbers] = useState(false)
  const [characters, setcharacters] = useState(false)
  const [password, setpassword] = useState('')

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    // Check state variables and append to the string
    if (numbers) str += "0123456789"
    if (characters) str += "!@#$%^&*()_+"

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex)
    }

    setpassword(pass)
  }, [length, numbers, characters])

  useEffect(() => {
    generatePassword()
  }, [length, numbers, characters, generatePassword])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
          type="text" 
          value={password} 
          className="outline-none w-full py-1 px-3 bg-white" 
          placeholder="Password"
          readOnly 
        />
        <button 
          onClick={() => window.navigator.clipboard.writeText(password)} 
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500"
        >copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
            type="range" 
            min={8} 
            max={32} 
            value={length} 
            className='cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numbers}
            id="numberInput"
            onChange={() => setnumbers((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={characters}
            id="characterInput"
            onChange={() => setcharacters((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
