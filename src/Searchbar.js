import React, { useContext, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled} from '@mui/material/styles';
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import {SummaryContext} from './book-context';



const url = 'https://brif-backend.herokuapp.com/';
//const url = 'http://localhost:5000/';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      // Default transform is "translate(14px, 20px) scale(1)""
      // This lines up the label with the initial cursor position in the input
      // after changing its padding-left.
     // transform: "translate(34px, 20px) scale(1);"
    }
  },
  inputRoot: {
    color: '#0b2a5c',
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: '#0b2a5c'
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor:  '#0b2a5c'
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor:  '#0b2a5c'
    },
  }
}));

export default function ControllableStates() {
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState('');
  const [bookList, setBookList] = useState(null);
  const [options, setOptions] = useState(null);
  const [error, setError] = useState("Loading...");

  const classes = useStyles();
  const fetchData = (text) => {
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
      .then(data => setBookList(data))
      .then(books => console.log("Received data for Book List: " + text))
      .catch(error => console.log(error))
      .then(l => { return l });
  }

  const getBookNames = () => {
    //const url = 'https://brif-backend.herokuapp.com/get-sum'
    const endpoint = url + 'get-sum-names'
    fetch(endpoint)
      .then(response => response.json())
     // .then(res => console.log(JSON.stringify(res[0])))
      .then(list => setOptions(list))
      .then(res => console.log(JSON.stringify(options[0])))
      .catch(error => setError("An error occured while fetching recources. Please make sure you have a stable internet connection!"))
      .then(l => { return l });

  }

    if(!options)
      getBookNames();

  return (
    <div style={{alignItems: 'center', justifyContent: 'center'}}>
      {
     //   <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
     // <div>{`inputValue: '${inputValue}'`}</div>
      }<br />
     { options ?
       <Autocomplete
        value={value}
        classes={classes}
        onChange={(event, newValue) => {
          setValue(newValue);
          fetchData(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
         sx={{color: '#fff', maxWidth: 600}}
        renderInput={(params) => <TextField {...params} label="Books" />}
       /> : <p>{error}</p>}

      {value?
       <Summary book={bookList}/> :
       null
      }
      {options ?
        <Featured availableBooks={options}/>
       : null}

    </div>
  );
}

const SummaryItem = styled(Paper)(({ theme }) => ({
  width: '50%',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  lineHeight: '60px',
}));


const Summary = (book) => {
  const { fetchBookSummary } = useContext(SummaryContext);
  if(!book.book){
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
    );
  } else{
  return(
    <div onClick={() => {
      console.log(book.book.name);
      fetchBookSummary(book.book.name);
    }}>
      <Link
            to={`/summary/${book.book.name}`}
    key={book.book.name}>
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.default',
            display: 'grid',
            gridTemplateColumns: { md: '1fr' },
            gap: 2,
          }}
        >
            <SummaryItem key={1} elevation={24}>
              <h2>{//TODO make the Item here
                book.book.name
                  }</h2>
              <img src={book.book.img} alt="cover" style={{width: "10%"}}/>
              <p>Click to read the summary!</p>
            </SummaryItem>
        </Box>
</Link>
  </div>
  );
  }
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const Featured = (props) => {
  const { fetchBookSummary } = useContext(SummaryContext);
  return (
    <div>
    <h2>Featured Summaries</h2>
          <ThemeProvider theme={lightTheme}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr 1fr' },
                gap: 2,
              }}
            >
              {props.availableBooks.map((elevation) => (
                <Link
                  to={`/summary/${elevation}`}
                  >
                <Item key={elevation} elevation={10} style={{paddingLeft: 10, paddingRight: 10}}
                      onClick={()=>{
                        console.log(elevation);
                        fetchBookSummary(elevation);
                                   }}>
                  {elevation}
                </Item>
                </Link>
              ))}
            </Box>
          </ThemeProvider>
    </div>
  );
}
