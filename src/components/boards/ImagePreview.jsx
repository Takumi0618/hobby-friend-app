import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  icon: {
    color: "#4dd0e1",
    backgroundColor: "#fff",
    boxShadow: "10px",
    borderRadius: "50%",
    padding: 0,
    position: "absolute",
    top: 10,
    right: 10,
    '&:hover': {
      cursor: "pointer"
    }
  }
})

const ImagePreview = (props) => {
  const classes = useStyles();

  return (
    <div className="p-media">
      <ClearIcon className={classes.icon} onClick={() => props.delete(props.id)} />
      <img className="center" alt="" src={props.path} />
    </div>
  )
}

export default ImagePreview;