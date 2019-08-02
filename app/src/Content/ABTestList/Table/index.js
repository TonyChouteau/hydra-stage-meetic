// React Component
import React from 'react';

// MaterialUI Components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

import loadingIcon from './load.gif';

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
  },
  idCell : {
  },
  otherCell : {
    minWidth: "100px",
  },
  searchResult : {
    padding: theme.spacing(2),
    fontStyle: "italic",
    display : "flex",
    flexDirection: "row",
    justify: "flex-start",
    alignItems: "center",
  },
  loadingIcon : {
    margin : theme.spacing(1),
    width : "30px",
    height : "30px",
  },
	refresh : {
    marginRight : theme.spacing(2),
		"&:hover": {
      fillOpacity: 0.5,
		}
	}
}));

function DisplayTable(props) 
{
  const classes = useStyles();

  let tableJson = props.table;
  let tableTitle = props.table["title"];
  let tableToDisplay;

  const [numberOfResults, setNumberOfResults] = React.useState(0);

  //=================
  // TABLE HEAD
  //=================

  function sortBy(index, direction)
  {
    let table = tableJson.data;
    /*let table = tableJson.data.filter(row => 
      {
        let result = true;

        if (props.searchByID !== "")
        {
          result = row["id"].toString().includes(props.searchByID);
        }
        if (props.searchByName !== "")
        {
          result = result & row["description"].toLowerCase().includes(props.searchByName.toLowerCase());
        }
        if (props.searchByStart !== "")
        {
          result = result & (row["from"].includes(props.searchByStart) | row["from"] > props.searchByStart);
        }
        if (props.searchByEnd !== "")
        {
          result = result & (row["to"].includes(props.searchByEnd) | row["to"] < props.searchByEnd);
        }

        return result;
      }
    );*/

    if (direction)
    {
      tableToDisplay = table.sort((a, b) => 
          (a[tableJson.title[index]]<b[tableJson.title[index]])?1:-1);
    }
    else
    {
      tableToDisplay = table.sort((a, b) => 
          (a[tableJson.title[index]]>b[tableJson.title[index]])?1:-1);
    }
  }

  function getDirection(index)
  {
    let dir = 'desc';

    if (props.orderedByIndex === index)
    {
      dir = props.orderedAsc?'asc':'desc';
    }
    
    return dir;
  }

  function DisplayTableHeader()
  {
    sortBy(props.orderedByIndex, props.orderedAsc)
    setNumberOfResults(tableToDisplay.length)

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"/>
          {
            tableTitle.map( (colTitle, index) => {
              return (
                <TableCell className={(index === 0 || index === 4)?classes.lastCol:""} key={index}> 
                  {(index < 2 || index > 4) && <TableSortLabel
                    active={props.orderedByIndex === index}
                    direction={getDirection(index)}
                    onClick={() => {props.setOrderedBy(index)}}
                  >
                    {colTitle}
                  </TableSortLabel>}
                  {(index >= 2 && index <= 4) && colTitle} 
                </TableCell>
              )
            })
          }
        </TableRow>
      </TableHead>
    )
  }

  //=================
  // TABLE BODY
  //=================

  function toString(row, index)
  {
    let value = row[tableJson.title[index]];
    switch(index)
    {
      case 0:
      case 1:
      case 5:
      case 6:
        return value;
      case 2:
        return (value.map((row, index) =>
        {
            return (
              <div key={index}>
                {"id :"+row["id"]+" | "+row["proportion"]+"%"}
              </div>
            )
        }));
      case 3:
        return (value.map((row, index) =>
        {
          if (index < 50)
          {
            return (
              <div key={index}>
                {row["type"]+(row["value"]!==""?(" : "+row["value"]):"")}{(row["min"]!==0||row["max"]!==0)?(" | min : "+row["min"]+" - max : "+row["max"]):""}
              </div>
            )
          } else if (index === 50) 
          {
            return (
              <div key={index}>
                {"... (View more on Detail page)"}
              </div>
            )
          } else 
          {
            return ""
          }
            
        }));
      case 4:
        return (value.map((row, index) =>
        {
            return (
              <div key={index}>
                {row}
              </div>
            )
        }));
      default:
        return "Error"+index;
    }
  }

  function DisplayTableBody()
  {
    return(
      <TableBody>
        {tableToDisplay.map((row, rowIndex) => {
          return (
            <TableRow key={rowIndex} hover onClick={() => props.gotoDetail(row["id"]) }>
              <TableCell padding="checkbox"/> 
              {
                tableTitle.map( (colTitle, colIndex) => {
                  return (
                    <React.Fragment key={colIndex}>
                      {colIndex === 0 && <TableCell className={classes.idCell} key={colIndex}> {toString(row, colIndex)} </TableCell>}
                      {colIndex !== 0 && <TableCell className={classes.otherCell} key={colIndex}> {toString(row, colIndex)} </TableCell>}
                    </React.Fragment>
                  )
                })
              }
            </TableRow>
          )
        })}
      </TableBody>
    )
  }

  //=================
  // TABLE FOOTER
  //=================

  function DisplayTableFooter()
  {
    const classes = useStyles();

    return (
      <div className={classes.footer}>
        { !props.endOfData &&
          <img src={loadingIcon} className={classes.loadingIcon} alt="loading..." />
        }
      </div>
    )
  }

  //=================
  // TABLE CONTENT
  //=================

  function RefreshIcon()
  {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18" onClick={props.handleRefresh} className={classes.refresh} ><rect width="100%" height="100%" fill="#CCCCCC" rx="5" ry="5"/><path d="M9 13.5c-2.49 0-4.5-2.01-4.5-4.5S6.51 4.5 9 4.5c1.24 0 2.36.52 3.17 1.33L10 8h5V3l-1.76 1.76C12.15 3.68 10.66 3 9 3 5.69 3 3.01 5.69 3.01 9S5.69 15 9 15c2.97 0 5.43-2.16 5.9-5h-1.52c-.46 2-2.24 3.5-4.38 3.5z"/></svg>
    );
  }

  return (
    <div>
      <div className={classes.tableWrapper}>
        <div className={classes.searchResult}>
          <RefreshIcon/>
          <Typography> Displayed results : {numberOfResults} / {props.count}</Typography>
        </div >

        <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
        >
          <DisplayTableHeader/>

          <DisplayTableBody/>
        </Table>
      </div>
      <DisplayTableFooter/>
    </div>
  );
}

export default DisplayTable;