// React Component
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import 'date-fns';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  lastCol: {
    width : '90px',
  },
  idCol: {
    width : '50px',
  },
  sortIconAsc: {
    transitionDuration: '2s',
    transform: 'rotate(0deg)',
  },
  sortIconDesc: {
    transform: 'rotate(180deg)',
  },
  footer: {
    textAlign : 'center',
  },
  link: {
    textDecoration: 'none',
  },
  searchHeader : {
    height : "50px",
  },
  container: {
    align: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 160,
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    width: 125,
  },
  root2: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  panel : {
    justifyContent: 'center', 
    alignItems: 'center',
    width: '1000px',
  },
  inputBox : {
    justifyContent: 'center', 
    alignItems: 'center',
    display: 'flex',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  }
}));

function DisplaySearchTool(props) 
{
	const classes = useStyles();
	
  const [expanded, setExpanded] = React.useState(false);
	const [selected, setSelected] = React.useState(null);
	
  function handleKeydown(e)
  {
    if(e.keyCode === 13)
    {
      props.handleChange();
    }
  }

	return (
			<div className={classes.root2}>
			<ExpansionPanel expanded={expanded} className={classes.panel}>
					<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					onClick={() => {setExpanded(!expanded)}}
					aria-controls="panel1a-content"
					id="panel1a-header"
					>
					<Typography className={classes.heading}>Search Tool</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className={classes.inputBox}>
					<form className={classes.container} noValidate>
							<TextField
							id="searchByID"
							type="number"
							label="Search by ID :"
							className={classes.textField}
							InputLabelProps={{
									shrink: true,
							}}
							defaultValue={props.searchByID}
							onChange={() => {setSelected(0)}}
							onKeyDown={(event) => {handleKeydown(event)}}
							autoFocus={selected === 0}
							/>
							<TextField
							id="searchByName"
							type="search"
							label="Search by name :"
							className={classes.textField}
							InputLabelProps={{
									shrink: true,
							}}
							defaultValue={props.searchByName}
							onChange={() => {setSelected(1)}}
							onKeyDown={(event) => {handleKeydown(event)}}
							autoFocus={selected === 1}
							/>
							<TextField
							id="searchByStart"
							type="date"
							label="Starts after :"
							className={classes.textField}
							InputLabelProps={{
									shrink: true,
							}}
							defaultValue={props.searchByStart}
							onChange={() => {setSelected(2)}}
							onKeyDown={(event) => {handleKeydown(event)}}
							autoFocus={selected === 2}
							/>
							<TextField
							id="searchByEnd"
							type="date"
							label="Ends before :"
							className={classes.textField}
							InputLabelProps={{
									shrink: true,
							}}
							defaultValue={props.searchByEnd}
							onChange={() => {setSelected(3)}}
							onKeyDown={(event) => {handleKeydown(event)}}
							autoFocus={selected === 3}
							/> 
							<Button className={classes.button} onClick={props.handleChange}>
							Search
							</Button>
					</form>
					</ExpansionPanelDetails>
			</ExpansionPanel>
			</div>
	);
}

export default DisplaySearchTool;