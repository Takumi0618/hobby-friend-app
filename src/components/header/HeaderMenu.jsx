import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';
import { signOut } from '../../reducks/users/operations';
import { push } from 'connected-react-router';

const useStyles = makeStyles((theme) => ({
  space: {
    marginLeft: 4,
    fontSize: 15
  },
  smartPhone: {
    [theme.breakpoints.up('sm')]: {
      display: "none",
    },
  },
  monitor: {
    borderRadius: 5,
    marginLeft: 3,
    [theme.breakpoints.down('xs')]: {
      display: "none",
    },
  },
}));


const HeaderMenu = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <Button className={classes.monitor} onClick={() => dispatch(push('/'))} >
        <GroupIcon />
        <p className={classes.space}>掲示板</p>
      </Button>
      <Button className={classes.monitor}>
        <ChatIcon />
        <p className={classes.space}>チャット</p>
      </Button>
      <Button className={classes.monitor} onClick={() => dispatch(push('/profile'))} >
        <PersonIcon />
        <p className={classes.space}>プロフィール</p>
      </Button>
      <Button className={classes.monitor} onClick={() => dispatch(signOut())} >
        <ExitToAppIcon />
        <p className={classes.space}>Logout</p>
      </Button>
      <IconButton className={classes.smartPhone} onClick={(event) => props.handleDrawerToggle(event)} >
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default HeaderMenu;