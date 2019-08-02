// React Component
import React from 'react';

// Own Components
import DisplaySearchTool from '../SearchTool';
import DisplayTable from '../Table';

// MaterialUI Components
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import 'date-fns';
//import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

function PageContent(props) 
{
  const classes = useStyles();

  const [orderedByIndex, setOrderedByIndex] = React.useState(0);
  const [orderedAsc, setOrderedAsc] = React.useState(false);

  //=================
  // SEARCH HEADER
  //=================

  function handleChange()
  {
    props.handleSearch()
  }
  //=================
  // TABLE HEAD
  //=================

  function setOrderedBy(index)
  {
    if (index !== orderedByIndex)
    {
      setOrderedByIndex(index);
      setOrderedAsc(false);
    }
    else
    {
      setOrderedAsc(!orderedAsc);
    }
  }

  //=================
  // TABLE BODY
  //=================

  function gotoDetail(index)
  {
    props.selectItem(index);
  }

  //=================
  // TABLE CONTENT
  //=================

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>

        <DisplaySearchTool
          handleChange={handleChange}
        />
        
        <DisplayTable 
          table={props.table}
          searchByID={props.searchByID}
          searchByName={props.searchByName}
          searchByStart={props.searchByStart}
          searchByEnd={props.searchByEnd}
          orderedByIndex={orderedByIndex}
          orderedAsc={orderedAsc}
          setOrderedBy={(index) => {setOrderedBy(index)}}
          toString={(row, colIndex) => {props.toString(row, colIndex)}}
          gotoDetail={(rowID) => {gotoDetail(rowID) }}
          handleRefresh={props.handleRefresh}
          count={props.count}
          endOfData={props.endOfData}
        />

      </Paper>
    </div>
  );
}

export default PageContent;