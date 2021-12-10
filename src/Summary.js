import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useParams, Navigate} from "react-router-dom";
import {SummaryContext} from './book-context';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  root: {
    width: 400
  },
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  let { title } = useParams();
  console.log(title);
  console.log("Hello World");
  const { bookSummary, isLoading } = React.useContext(SummaryContext);
  if(isLoading){
    return(<h1>loading...</h1>)
  }
  if(bookSummary == null){
    return <Navigate to={`/`} />
  }
  if(bookSummary.sum){
    return (
      <div>
        <h1>{bookSummary.name}</h1>
        <p>
          {bookSummary.sum}
        </p>
      </div>
    )
  }
  return (
    <div>
      <h1>{bookSummary.name}</h1>
      {bookSummary.chaps.map((chapter) => (
        <Accordion expanded={expanded === chapter.name} onChange={handleChange(chapter.name)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>{chapter.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
        {chapter.sum}
          </Typography>
        </AccordionDetails>
      </Accordion>


      ))}
   </div>
  );
}
