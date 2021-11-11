import React, { useEffect,   useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import CustomizedAccordions from './Summary'


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
      .then(books => console.log("Received data for Book List: " + JSON.stringify(bookList[0])))
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
      .then(res => console.log(JSON.stringify(res[0])))
      .catch(error => console.log(error))
      .then(l => { return l });

  }

  useEffect(() => {
   getBookNames();
  });

  return (
    <div>
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
         sx={{color: '#fff', width: '80%' }}
        renderInput={(params) => <TextField {...params} label="Books" />}
                 /> : <p>loading...</p>}
      <CustomizedAccordions/>
    </div>
  );
}
