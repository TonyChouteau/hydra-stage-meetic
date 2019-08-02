import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	tabContainer: {
		width: "100%",
		display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
	},
	tab : {
		width:'25%',
	},
	search : {
	  width: "100%",
	  display: "flex",
	  flexDirection : "row",
	  marginLeft: "auto",
	  marginRight: "auto",
	  alignItems: "center",
	  justifyContent: "center",
	  margin : theme.spacing(2),
	},
	button: {
	  marginTop: theme.spacing(1),
	  marginLeft: theme.spacing(3),
	  width: 125,
	},
}));

function DisplayMapFilterTool(props)
{
		const classes = useStyles();

		function handleChange(event, newValue) {
			props.changeMap(newValue);
		}
	
		return (
			<div className={classes.root}>
				<div className={classes.search}>
					<TextField
						id="searchByDate"
						type="date"
						label="Active on : "
						className={classes.textField}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={() => {props.searchAtdate()}}
						onKeyDown={(event) => {props.handleKeydown(event)}}
					/>
					<Button className={classes.button} onClick={() => {props.searchAtdate()}}>
						Search
					</Button>
				</div>
				<Paper square>
					<Tabs value={props.selectedMap} indicatorColor="primary" textColor="primary" onChange={handleChange} className={classes.tabContainer}>
						<Tab label="Web-app Desktop" className={classes.tab}/>
						<Tab label="Web-app Mobile" className={classes.tab}/>
						<Tab label="Android/Tablet" className={classes.tab}/>
						<Tab label="Iphone/Ipad" className={classes.tab}/>
					</Tabs>
				</Paper>
			</div>
		);
}

export default DisplayMapFilterTool;