import React, { useEffect, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';



export default function ControllableStates() {
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState('');
  const [bookList, setBookList] = useState(null);
  const [options, setOptions] = useState(null);

  const fetchData = (text) => {
    const url = 'https://brif-backend.herokuapp.com/get-sum'
    fetch(url, {
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
    const url = 'https://brif-backend.herokuapp.com/get-sum'
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        title: ""
      })
    }).then(response => response.json())
      .then(data => data.map(item => item.name))
      //.then(res => console.log(JSON.stringify(res[0])))
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
     { options ? <Autocomplete
        value={value}
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
        sx={{ width: 1000 }}
        renderInput={(params) => <TextField {...params} label="Books" />}
                 /> : <p>loading...</p>}
      <VirtualizedList/>
    </div>
  );
}

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
    <ListItemText primary={`Item ${index + 1}`} style={{color: '#000'}} />
      </ListItemButton>
    </ListItem>
  );
}

function VirtualizedList() {
  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 1000, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={1000}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
