// React Component
import React from 'react';
import { Link } from "react-router-dom";

// MaterialUI Components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
//import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapRounded from '@material-ui/icons/MapRounded';
import SearchRounded from '@material-ui/icons/SearchRounded';
//import Details from '@material-ui/icons/GraphicEqRounded';

// Json file
import config from '../../Data/config.json';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
    textDecoration: 'none',
  },
  linkText: {
    textDecoration: 'none',
    color: '#3C4550',
  },
  linkIcon: {
    color: '#ED147D',
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();

  let selected = null;

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    props.onClickInside(selected);
  };

  function displayIcon(index)
  {
    let icon = <div/>;

    switch(index)
      {
        case 0:
          icon = (<SearchRounded/>);
          break;

        /*case 1:
          icon = (<Details/>);
          break;*/

        case 1:
          icon = (<MapRounded/>)
          break;

        default:
          break;
      }
    
    return icon;
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link className={classes.link} to={"/"+config.routingList[0].toLowerCase()}>
          <ListItem onClick={() => {selected = 0;}} className="test" button>
            <ListItemIcon className={classes.linkIcon}>
              {displayIcon(0)}
            </ListItemIcon>
            <ListItemText primary={config.routingList[0]} className={classes.linkText}/>
          </ListItem>
        </Link>
        <Link className={classes.link} to={"/"+config.routingList[1].toLowerCase()}>
          <ListItem onClick={() => {selected = 1;}} button>
            <ListItemIcon className={classes.linkIcon}>
              {displayIcon(1)}
            </ListItemIcon>
            <ListItemText primary={config.routingList[1]} className={classes.linkText}/>
          </ListItem>
        </Link>
      </List>
      {/*
      <Divider />
      <List>
        {['Maybe Something Else'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
        */}
    </div>
  );

  return (
    <div>
      <Drawer open={props.open} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}
