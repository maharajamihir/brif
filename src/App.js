import './App.css';
import React from 'react';
import ControllableStates from './Searchbar'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CustomizedAccordions from './Summary'

function App() {
  return (
    <Router>
        <div
          className="App">
          <header className="App-header">
            <div>
              <h1>brif.</h1>
            </div>
            <Routes>
              <Route exact path='/' element={<ControllableStates/>}></Route>
              <Route exact path='/summary/' element={<CustomizedAccordions />}>
                  <Route path=":title" element={<CustomizedAccordions/>} />
              </Route>
            </Routes>

          </header>
        </div>
    </Router>
  );
}

export default App;
