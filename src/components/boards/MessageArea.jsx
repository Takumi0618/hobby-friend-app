import React, { useCallback, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { makeStyles } from '@material-ui/styles';
import { TextInput } from '../UIkit';
import { EmojiLibrary } from '../UIkit';


const useStyles = makeStyles({
  textField: {
    display: "flex",
    maxWidth: 600,
    width: "100%",
    minWidth: 100,
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: "center"
  }
})

const MessageArea = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleEmojiToggle = useCallback((event) => {
    if (event.type === 'keydown' && (event.type === 'Tab' || event.type === 'Shift')) {
      return;
    }
    setOpen(!open)
  }, [setOpen, open]);
  
  return (
    <div className={classes.textField}>
      <div className="u-text-right">
        <IconButton className={classes.icon}>
          <label>
            <AddAPhotoIcon />
            <input className="u-display-none" type="file" id="image" onChange={(event) => props.uploadImage(event)} />
          </label>
        </IconButton>
      </div>
      <IconButton className={classes.icon} onClick={(e) => handleEmojiToggle(e)}>
        <EmojiEmotionsIcon />
      </IconButton>
      <EmojiLibrary open={open} handleEmojiToggle={handleEmojiToggle} inputEmoji={props.inputEmoji} />
      <TextInput
        fullWidth={false} label={""} multiline={true} required={true}
        rows={1} value={props.value} type={"text"} onChange={props.inputText} 
      />
      <IconButton className={classes.icon} onClick={() => props.sendMessage()}>
        <SendIcon />
      </IconButton>
    </div>
  )
}

export default MessageArea;
