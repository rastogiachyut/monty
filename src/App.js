import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';


const MyDropdown = ({options, api = ''}) => {
  console.log('options', options)
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)
  const selectInput = useRef();


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

  return (
    <div onBlur={focusOut} ref={selectInput} className='container'>
      <input value={query} onFocus={focusIn} onChange={e => setSelectValue(e.target.value)} />
      {show ? <ul className='options'>
        {options.filter(opt => opt.toLowerCase().startsWith(query.toLowerCase()))
                .map(opt => <li className='option' key={opt} onMouseDown={() => setSelectValue(opt)}>{opt}</li>)}
      </ul> : null}
    </div>
  )
}


const cities = ['Goa', 'Delhi', 'Bangalore', 'Ghatkopar']


function App() {
  return (
    <div className="App">
        <MyDropdown options={cities} />
    </div>
  );
}

export default App;
