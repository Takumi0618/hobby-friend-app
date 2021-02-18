import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selector';
import { push } from 'connected-react-router';
import { ClosableDrawer, HeaderMenu } from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#fff",
    color: "#444",
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%',
  },
  iconButtons: {
    margin: '0 0 0 auto',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      display: "none",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback((event) => {
    if (event.type === 'keydown' && (event.type === 'Tab' || event.type === 'Shift')) {
      return;
    }
    setOpen(!open)
  }, [setOpen, open]);

  

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img 
            alt="hobby-friend Logo" 
            onClick={() => dispatch(push('/'))}          
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenu handleDrawerToggle={handleDrawerToggle}/>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer className={classes.drawer} open={open} onClose={handleDrawerToggle} />
    </div>
  )
}

export default Header;