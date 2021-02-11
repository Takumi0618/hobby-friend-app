import React, { useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton'; 
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'; 
import { makeStyles } from '@material-ui/styles';
import { storage } from '../../firebase/index';
import ImagePreview from './ImagePreview';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48
  }
})

const ImageArea = ({ image, setImage }) => {
  const classes = useStyles();
  
  const deleteImage = useCallback(async (id) => {
    const ret = window.confirm('この画像を削除しますか？')
    if (!ret) {
      return false
    } else {
      setImage({id: "", path: ""})
      return storage.ref('images').child(id).delete()
    }
  }, [setImage])


  const uploadImage = useCallback((event) => {
    const file = event.target.files;
    let blob = new Blob(file, { type: "image/jpeg"});

    // Generate random 16 digits strings
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n%S.length]).join('');

    const uploadRef = storage.ref('images').child(fileName);
    const uploadTask = uploadRef.put(blob);

    uploadTask.then(() => {
      // Handle successful uploads on complete
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        const newImage = {id: fileName, path: downloadURL};
        setImage(newImage);
      })
    })
    
  }, [setImage]) 

  return (
    <div>
      {image.id !== "" ?
        (<ImagePreview delete={deleteImage} id={image.id} path={image.path} />)
      :
        <div className="u-text-right">
          <span>画像を登録</span>
          <IconButton className={classes.icon}>
            <label>
              <AddPhotoAlternateIcon />
              <input className="u-display-none" type="file" id="image" onChange={(event) => uploadImage(event)} />
            </label>
          </IconButton>
        </div>
      }
    </div>
  )
}

export default ImageArea;