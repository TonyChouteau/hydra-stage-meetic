// React Component
import React , { useState } from 'react';

// MaterialUI Components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Own component
import AppMenuDrawer from '../Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    background :"#ED147D",
    color: "#FFFFFF",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign : 'center',
    flexGrow: 1,
    fontWeight: "bold",
  },
}));

function AppMenuBar(props) 
{
  const classes = useStyles();

  const [state, setState] = useState(
    {
      open : false
    }
  )

  function handleClick(e)
  {
    props.changeRouteIndex(e);
    setState({open: !state.open});
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.page}
          </Typography>
        </Toolbar>
      </AppBar>
      <AppMenuDrawer open={state.open} onClickInside={handleClick}/>
    </div>
  );
}

export default AppMenuBar;