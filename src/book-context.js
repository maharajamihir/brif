import React, { useState, createContext } from 'react';


const url = 'https://brif-backend.herokuapp.com/';
//const url = 'http://localhost:5000/';


export const SummaryContext = createContext();

export const SummaryContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookSummary, setBookSummary] = useState(null);


const fetchBookSummary = (text) => {
  setIsLoading(true);
    const endpoint = url + 'get-sum';
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        title: text
      })
    }).then(response => response.json())
      .then(data => setBookSummary(data))
      .then(books => console.log("Received data for Book List: " + text))
      .then(b => setIsLoading(false))
      .catch(error => setError(error))
      .then(l => { return l });
  }


  return (
    <SummaryContext.Provider
      value={{
        isDoneFetching: !!bookSummary,
        isLoading,
        bookSummary,
        fetchBookSummary,
        error,
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
};
