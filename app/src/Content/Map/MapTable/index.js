import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableHead } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';

//import Yes from '@material-ui/icons/MapRounded';
//import No from '@material-ui/icons/MapRounded';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection : "column",
    width: window.innerWidth>window.innerHeight?"50%":"100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  paper : {
    display: "flex",
    width: "100%",
    flexDirection : "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
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

function MapTable(props)
{
  const classes = useStyles();

  function abtestsByCountryOrArea(test, index)
  {
    //console.log(markersTargeted)
    return (
      <TableRow key={index} hover onClick={() => props.selectRow(test["id"])}>
        {
          ["id","description","proportions","regional"].map((column,columnIndex) => {
            if (column === "proportions")
            {
              return (
                <TableCell key={columnIndex}>
                  {test[column].join(" - ")}
                </TableCell>
              )
            } else if (column === "regional")
            {
              //console.log()
              return (
                <TableCell key={columnIndex}>
                  {(() => {
                    for (let i=0; i<props.markers.length; i++)
                    {
                      if (props.markers[i].name === test.id)
                      {
                        return true
                      }
                    }
                    return false
                  })()?"Yes":"No"}
                </TableCell>
              )
            } else
            {
              return (
                <TableCell key={columnIndex}>
                  {test[column]}
                </TableCell>
              )
            }
          })
        }
      </TableRow>
    )
  }

  return (
      <Paper square className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              {
                ["Id","Description","Proportions", "Regional"].map((column,index) => {
                  return (
                    <TableCell key={index}>
                      {column}
                    </TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
              {
                (props.table.countries.includes(props.countryClicked) && props.markersTargeted.length === 0) &&
                props.table.maped[props.countryClicked].map((test, index) => {return abtestsByCountryOrArea(test,index)})
              }
              {
                (props.table.countries.includes(props.countryClicked) && props.markersTargeted.length !== 0) &&
                props.table.maped[props.countryClicked].filter((row) => {
                  //console.log(markersTargeted, row.id, markersTargeted.includes(row.id))
                  return props.markersTargeted.includes(row.id)
                }).map((test, index) => {return abtestsByCountryOrArea(test,index)})
              }
          </TableBody>
        </Table>
      </Paper>
  );
}

export default MapTable;