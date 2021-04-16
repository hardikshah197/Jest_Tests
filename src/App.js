import logo from './logo.svg';
import './App.css';
import Title from './Title';
import {useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if(count > 3)
       return(
        alert('OverLimit')
       )
      else{
        return(
          <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        )
      }
  });
  function countChecker(){
    console.log(count);
    return(setCount(count+1))
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <Title title="My Test Jest Test" count="3"/>
        <img src={logo} className="App-logo" alt="logo" />
        {/* {counterChecker} */}
        <button onClick={countChecker}>Counter</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
