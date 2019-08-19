import React/*, { useEffect }*/ from 'react';

import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import PostFileUI from '../PostFileUI';
import config from '../../../Data/config.json';

const useStyles = makeStyles(theme => ({
    root: {
			margin: theme.spacing(2, 2),
			flexGrow: 1,
		},
		grid : {
			flexGrow: 1,
      padding: theme.spacing(1, 1),
      minWidth: '275px',
		},
		cards: {
    },
    cardContent : {
      //textAlign: 'justify',
      margin: theme.spacing(0, 2),
      padding: theme.spacing(4, 0, 4, 0),
    },
		space : {
			margin : theme.spacing(0,0,1,0),
    },
    error : {
			margin : theme.spacing(2,2,2,2),
    }
  }));

function DisplayDetail(props)
{
  const classes = useStyles();

  const [data, setData] = React.useState({
    id : -5,
    description : "",
    groups : [],
    segments : [],
    sites : [],
    from : "",
    to : ""
  })
  const [x, setX] = React.useState(true)

  if (x)
  {
    GetTable()
    setX(false)
  }

  function GetTable()
  {
    const l = props.history.location.pathname
    return (
      fetch(config.vpsFetchAddress+"/abtest/"+parseInt(l.substring(8),10))
      .then(response => response.json())
      .then((jsonData) => {
        // jsonData is a parser json object received from url
        
        //console.log(jsonData)
        setData(jsonData);
      })
      .catch((error) => {
        // handle errors
        console.error(error)
      })
    )
  }

  /*function resizeGrid()
  {
    for(let i=1; i<=2; i++)
    {
      const grid = [
        document.getElementById("grid"+i+"1"), 
        document.getElementById("grid"+i+"2"), 
        document.getElementById("grid"+i+"3")]

      if (grid[0] && grid[1] && grid[2])
      {
        if (["xs","sm"].includes(props.width))
        {
          grid[0].style.height = "";
          grid[1].style.height = "";
          grid[2].style.height = "";
        }
        else
        {
          const x = Math.max(grid[0].clientHeight, grid[1].clientHeight, grid[2].clientHeight)
          grid[0].style.height = x+"px";
          grid[1].style.height = x+"px";
          grid[2].style.height = x+"px";
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("resize",resizeGrid)
    resizeGrid()
  });*/

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {data[props.table["title"][0]] !== 0 &&
        <React.Fragment>
          <Grid item  xs={12} sm={6} md={4} className={classes.grid}>
            <Paper id="grid11" className={classes.cards}>
              <div className={classes.cardContent}>
                <Typography variant="h5" className={classes.space}>
                  Description : 
                </Typography>
                <Divider className={classes.space}/>
                {data[props.table["title"][1]]}
              </div>
            </Paper>
            
          </Grid>
          <Grid item  xs={12} sm={6} md={4} className={classes.grid}>
            <Paper id="grid12" className={classes.cards}>
              <div className={classes.cardContent}>
                <Typography variant="h5" className={classes.space}>
                  Groups : 
                </Typography>
                <Divider className={classes.space}/>
                {data["groups"].map((group, id) => {
                  return (
                    <div key={id}>
                      {"id"+group["id"]+" - "+group["proportion"]+"%"}
                    </div>
                  )
                })}
              </div>
            </Paper>
          </Grid>
          <Grid item  xs={12} sm={6} md={4} className={classes.grid}>
            <Paper id="grid13" className={classes.cards}>
              <div className={classes.cardContent}>
                <Typography variant="h5" className={classes.space}>
                  Segments : 
                </Typography>
                <Divider className={classes.space}/>
                {data["segments"].map((segment, id) => {
                  return (
                    <div key={id}>
                      {segment["type"]+(segment["value"]!==""?"-"+segment["value"]:"")+(segment["min"]===""?"":" (min : "+segment["min"])+(segment["max"]===""?"":", max : "+segment["max"]+")")}
                    </div>
                  )
                })}
              </div>
            </Paper>
          </Grid>
          <Grid item  xs={12} sm={6} md={4} className={classes.grid}>
            <Paper id="grid21" className={classes.cards}>
              <div className={classes.cardContent}>
                <Typography variant="h5" className={classes.space}>
                    Sites : 
                </Typography>
                <Divider className={classes.space}/>
                {data["sites"].map((site, id) => {
                  return (
                      <span key={id}>{(id!==0?" - ":"")+site}</span>
                  )
                })}
              </div>
            </Paper>
          </Grid>
          <Grid item  xs={12} sm={6} md={4} className={classes.grid}>
            <Paper id="grid22" className={classes.cards}>
                <div className={classes.cardContent}>
                <Typography variant="h5" className={classes.space}>
                  From : 
                </Typography>
                <Divider className={classes.space}/>
                {data[props.table["title"][5]].split("-").join("/")}
              </div>
            </Paper>
          </Grid>
          <Grid item  xs={12} sm={6} md={4} className={classes.grid}>
            <Paper id="grid23" className={classes.cards}>
                <div className={classes.cardContent}>
                <Typography variant="h5" className={classes.space}>
                  To : 
                </Typography>
                <Divider className={classes.space}/>
                {data[props.table["title"][6]].split("-").join("/")}
              </div>
            </Paper>
          </Grid>
        </React.Fragment>
        }
        {data[props.table["title"][0]] === 0 &&
          <Typography className={classes.error} color={'error'} align={"center"} variant={"h5"}>
            No abtest found with this ID
          </Typography>
        }
      </Grid>
      <PostFileUI
        id={data.id}
      />
    </div>
  )
}

export default withWidth()(DisplayDetail);
