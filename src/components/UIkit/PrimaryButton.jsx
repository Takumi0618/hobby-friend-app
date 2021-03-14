import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  button: {
    backgroundColor: "orange",
    color: "#000",
    fontSize: 16,
    marginBottom: 16,
    width: 256
  }
})


const PrimaryButton = (props) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} onClick={() => props.onClick()} variant="contained">
      {props.label}
    </Button>
  )
}

export default PrimaryButton;