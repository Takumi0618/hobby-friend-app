import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  icon: {
    cursor: "pointer",
  },
  img: {
    width: 240,
  }
})

const Chat = (props) => {  
  const avatarClasses = (props.uid !== props.messageUid) ? 'p-chat__row' : 'p-chat__reverse';
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <ListItem className={avatarClasses}>
      {(props.uid !== props.messageUid) ?
        <ListItemAvatar  className={classes.icon} onClick={() => dispatch(push(`/profile/${props.messageUid}`))}>
          <Avatar alt="icon" src={props.icon.path} />
        </ListItemAvatar>
      :
        <ListItemAvatar>
          <Avatar alt="icon" src={props.icon.path} />
        </ListItemAvatar>
      }
      {props.image.path !== '' ?
        <img className={classes.img} alt="投稿画像" src={props.image.path} />
      :
        <div className="p-chat__bubble">{props.message}</div>
      }
    </ListItem>
  )
}

export default Chat;