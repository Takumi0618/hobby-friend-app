import React from 'react';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { signOut } from '../../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256,
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  button: {
    borderRadius: 5,
    alignContent: "start", 
    width: "100%",
    justifyContent: "start",
  },
  drawerPaper: {
    width: 256 
  },
}));

const ClosableDrawer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {container} = props;

  const selectMenu = (event, path) => {
    dispatch(push(path))
    props.onClose(event);
  };

  const doSignOut = (event) => {
    dispatch(signOut())
    props.onClose(event);
  }

  const menus = [
    {func: selectMenu, label: "掲示板", icon: <GroupIcon />, id: "bulletin board", value: "/"},
    {func: selectMenu, label: "チャット", icon: <ChatIcon />, id: "chat", value: "/chat"},
    {func: selectMenu, label: "プロフィール", icon: <PersonIcon />, id: "profile", value: "/profile"},
  ]

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
      >
        <List>
          {menus.map(menu => (
            <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
              <ListItemIcon>
                {menu.icon}
              </ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          ))}
          <ListItem button key="logout" onClick={(e) => doSignOut(e)}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer;