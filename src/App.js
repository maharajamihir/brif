import './App.css';
import React from 'react';
import ControllableStates from './Searchbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomizedAccordions from './Summary';
import {SummaryContextProvider} from './book-context';

function App() {
  return (
    <SummaryContextProvider>
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
    </SummaryContextProvider>
  );
}

export default App;
