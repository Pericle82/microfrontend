import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const handleClick = () => {
    fetch('/api', {
      method: 'GET',
      redirect: 'follow',
      mode: 'no-cors'
    })
      .then(response => {
        if(response.redirected) {
          window.location.href = response.url;
        } else {
          return response.json();
        }
      })
      .catch(err => console.log("error: ", err))
  }


  return (
    <div className="App">
      <header className="App-header">
       <button type="button" onClick={handleClick}>fetch data</button>
      </header>
    </div>
  );
}

export default App;
