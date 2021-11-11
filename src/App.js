import './App.css';
import React from 'react';
import ControllableStates from './Searchbar'

function App() {

  return (
    <div
      className="App">
      <header className="App-header">
        <div>
          <h1>brif.</h1>
        </div>
        <ControllableStates />
      </header>
    </div>
  );
}

export default App;
