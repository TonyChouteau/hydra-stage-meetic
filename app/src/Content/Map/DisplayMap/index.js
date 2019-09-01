import React from "react"

import DrawSvg from "../DrawSvg"
import MapFilterTool from "../MapFilterTool"
import MapTable from "../MapTable"

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import config from '../../../Data/config.json';

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
  }
}));

function DisplayMap(props)
{
  const classes = useStyles();

  const [selectedMap, setSelectedMap] = React.useState(0);
  const [countryClicked, setCountryClicked] = React.useState("NaN");
  const [x, setX] = React.useState(true);
  const [markersTargeted, setMarkersTargeted] = React.useState([])
  const [table, setTable] = React.useState({
    "countries": [],
    "maped": {}
  })
  const [date, setDate] = React.useState(getDate())

  let markers = [];
  let testedCountry = [];

  if (x) 
  {
    //console.log("x")
    GetTable()
    setX(false)
  }

  function getDate()
  {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    
    return yyyy + '-' + mm + '-' + dd;
  }

  function createMarkers()
  {
    //console.log(table)
    for (let i=0; i<table.countries.length; i++)
    {
      for (let j=0; j<table.maped[table.countries[i]].length; j++)
      {
        let lat = [0,0]
        let long = [0,0]

        for (let k=0; k<table.maped[table.countries[i]][j].segments.length; k++)
        {

          if (table.maped[table.countries[i]][j].segments[k].type.toLowerCase() === "longitude")
          {
            //console.log(table.maped[table.countries[i]][j].segments[k].type.toLowerCase())
            long = [table.maped[table.countries[i]][j].segments[k].min, table.maped[table.countries[i]][j].segments[k].max]
            //console.log(long)
          }
          if (table.maped[table.countries[i]][j].segments[k].type.toLowerCase() === "latitude")
          {
            //console.log(table.maped[table.countries[i]][j].segments[k].type.toLowerCase())
            lat = [table.maped[table.countries[i]][j].segments[k].min, table.maped[table.countries[i]][j].segments[k].max]
            //console.log(lat)
          }
        }
        if ((lat[0] !== 0 || lat[1] !== 0) && (long[0] !== 0 || long[1] !== 0))
        {
          //console.log(long)
          //console.log(lat)
          markers.push({ 
            name: table.maped[table.countries[i]][j].id, 
            upLeft: [long[0],lat[1]],
            bottomRight : [long[1],lat[0]],
            country : table.countries[i],
          });
        }
      }
    }
    //console.log(markers)
  }

  function GetTable()
  {
    let device = "*"
    switch (selectedMap)
    {
      case 0:
        device = "wad"
        break;
      case 1:
        device = "wam"
        break;
      case 2:
        device = "ad"
        break;
      default: //3
        device = "ip"
        break;
    }

    return (
      fetch(config.vpsFetchAddress+"/maped-abtests?"+
      (date!==""?"date="+date:"")+"&device="+device)
      .then(response => response.json())
      .then((jsonData) => {
        // jsonData is a parser json object received from url
        //console.log("fetch",jsonData)

        setTable(jsonData)
      })
      .catch((error) => {
        // handle errors
        console.error(error)
      })
    )
  }

  function setTestedCountry()
  {
    //console.log("setTested",table)
    testedCountry = []
    for (let i=0; i<table.countries.length; i++)
    {
      //console.log(table.maped[table.countries[i]].length)
      if (table.maped[table.countries[i]].length !== 0)
      {
        //console.log(table.countries[i])
        testedCountry.push(table.countries[i])
      }
    }

    //console.log(testedCountry)
  }

  function handleMapChange(newValue)
  {
    setSelectedMap(newValue);
    setX(true);
  }

  function searchAtdate()
  {
    //console.log("x")
    setDate(document.getElementById("searchByDate").value)
    setX(true)
  }

  function handleKeydown(e)
  {
    if(e.keyCode === 13)
    {
      searchAtdate();
    }
  }

  function selectArea(index)
  {
    let mt = []
    for (let i=0; i<markers.length; i++)
    {
      if (markers[i].upLeft[0] === markers[index].upLeft[0]
          && markers[i].upLeft[1] === markers[index].upLeft[1] 
          && markers[i].bottomRight[0] === markers[index].bottomRight[0] 
          && markers[i].bottomRight[1] === markers[index].bottomRight[1])
      {
        mt.push(markers[i].name)
      }
    }

    setMarkersTargeted(mt)
    setCountryClicked(markers[index].country)
  }

  function selectCountry(x)
  {
    setMarkersTargeted([])
    setCountryClicked(x)
  }

  return (
    <div className={classes.root}>
      <Paper square className={classes.paper}>
        <MapFilterTool 
          searchAtdate={searchAtdate}
          handleKeydown={handleKeydown}
          selectedMap={selectedMap} 
          changeMap={handleMapChange}
        />
        {
          setTestedCountry()
        }
        {
          createMarkers()
        }
        <DrawSvg 
          markers={markers}
          testedCountry={testedCountry}

          markerColor = {"#ED147D"}
          markedCountryColor={"#c7a1b1"}
          landColor={"#BBBBBB"}
          hoverColor={"#999999"}
          capitalColor={"#EEEEEE"}
          borderColor={"#FFFFFF"}
          borderStrenght={"0.25px"}

          handleClick={(x) => selectCountry(x)}
          clickOnArea={selectArea}
          countryClicked={countryClicked}
        />
      </Paper>
      <MapTable 
        markersTargeted={markersTargeted}
        markers={markers}
        table={table}
        countryClicked={countryClicked}
        selectRow={props.selectRow}
      />
    </div>
  );
}
/*

  <!--
  cx="1376" cy="768.8155"

  London : -0.1277583 | 51.5073509

  cx = 1270+(Longitude-0.1277583)/180*1376
  cy = 360-(Latitude-51.5073509)/90*688

  Paris : 
  -->
  */

export default DisplayMap;
