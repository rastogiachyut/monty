import './App.css';
import { useEffect, useRef, useState } from 'react';

const cities = ['Goa', 'Delhi', 'Bangalore', 'Ghatkopar', 'Gondolin']

const MyDropdown = ({label = 'Select', options, api = ''}) => {
  console.log('options', options)
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const selectList = useRef(null);
  
  useEffect(() => {
    if (!selectList.current) return
    selectList.current.scrollIntoView({
      block: "center"
    }, [focusedIndex])
  })


  const focusOut = (e) => {
    console.log('e.target', e.target)
    setSelectValue(e.target.value)
    console.log('focusOut')
    setShow(false)
  }

  const focusIn = (e) => {
    console.log('e.target', e.target)
    console.log('focusIn')
    setShow(true)
  }

  const setSelectValue = (opt) => {
    console.log('setSelectValue', opt)
    setQuery(opt)
  }

  const handleKeyDown = (e) => {
    const { key } = e
    console.log('handleKeyDown', key)
    console.log('e.target.value', e.target.value)
    let nextIndexCount = 0
    
    if (key === 'ArrowDown') {
      nextIndexCount = (focusedIndex + 1) % cities.length
    }
    if (key === 'ArrowUp') {
      nextIndexCount = (focusedIndex - 1) % cities.length
    }
    if (key === 'Enter') {
      setSelectValue(cities[focusedIndex])
    }
    if (key === 'Escape') {
      setShow(false)
    }
    setFocusedIndex(nextIndexCount)
  }

  return (
    <div onBlur={focusOut} className='dropdown'>
      <label>{label}</label>
      <div tabIndex={1} onKeyDown={handleKeyDown} className={`input-container ${show ? "open" : ""}`}>
        <input value={query} onFocus={focusIn} onChange={e => setSelectValue(e.target.value)} />
      </div>
      {show ? <ul className='options'>
        {options.filter(opt => !query || opt.toLowerCase().startsWith(query.toLowerCase()))
                .map((opt, index) => {
                  return (
                    <li
                      ref={index === focusedIndex ? selectList : null}
                      style={{backgroundColor: index === focusedIndex ? "rgba(0,0,0,0.1)" : ""}}
                      className='option'
                      key={opt}
                      onMouseDown={() => setSelectValue(opt)}
                    >
                      {opt}
                    </li>)}
                  )
                }
      </ul> : null}
    </div>
  )
}

function App() {
  return (
    <div className="App">
        <MyDropdown options={cities} />
    </div>
  );
}

export default App;
