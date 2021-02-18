import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  button: {
    
  },
  space: {
    marginLeft: 10,
  },
  smartPhone: {
    [theme.breakpoints.up('sm')]: {
      display: "none",
      borderRadius: 5,
      marginLeft: 5,
    },
  },
  monitor: {
    borderRadius: 5,
    marginLeft: 5,
    [theme.breakpoints.down('xs')]: {
      display: "none",
    },
  },
}));


const HeaderMenu = (props) => {
  const classes = useStyles();

  return (
    <>
      <IconButton className={classes.monitor}>
        <GroupIcon />
        <p className={classes.space}>掲示板</p>
      </IconButton>
      <IconButton className={classes.monitor}>
        <ChatIcon />
        <p className={classes.space}>チャット</p>
      </IconButton>
      <IconButton className={classes.monitor}>
        <PersonIcon />
        <p className={classes.space}>プロフィール</p>
      </IconButton>
      <IconButton className={classes.monitor}>
        <ExitToAppIcon />
        <p className={classes.space}>Logout</p>
      </IconButton>
      <IconButton className={classes.smartPhone} onClick={(event) => props.handleDrawerToggle(event)} >
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default HeaderMenu;