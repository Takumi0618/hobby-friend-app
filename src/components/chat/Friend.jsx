import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles({
  icon: {
    cursor: "pointer",
  },
  img: {
    width: 240,
  }
})

const Friend = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();


  return (
    <ListItem className='p-chat__row' className={classes.icon} onClick={() => dispatch(push(`/chat/${props.uid}`))}>
      <ListItemAvatar>
        <Badge color="secondary" variant="dot" invisible={!props.check} >
          <Avatar alt="icon" src={props.icon.path} />
        </Badge>
      </ListItemAvatar>
      <h2>{props.username}</h2>
    </ListItem>
  )
}

export default Friend;