import React, { useCallback, useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import { Chat } from '../components/boards';
import { MessageArea } from '../components/boards';
import { db, FirebaseTimestamp, storage } from '../firebase';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../reducks/bulletinBoards/operations';
import { getUserIcon, getUserId } from '../reducks/users/selector';

const useStyles = makeStyles({
  image: {
    height: 200,
  },
  chats: {
    height: "500px",
    padding: "0",
    overflow: "auto"
  },
})

const BoardDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const userIcon = getUserIcon(selector);
  const uid = getUserId(selector);
  const timestamp = FirebaseTimestamp.now();

  let boardId = window.location.pathname.split('/board/detail/')[1];

  const [title, setTitle] = useState(""),
        [memo, setMemo] = useState(""),
        [image, setImage] = useState({id: "", path: ""}),
        [text, setText] = useState(""),
        [messages, setMessages] = useState([]);

  const inputText = useCallback((event) => {
    setText(event.target.value)
  }, [setText])

  const inputEmoji = useCallback((emoji) => {
    setText(prevText => {
      return prevText + (emoji + " ")
    })
  }, [setText])

  const addMessages = useCallback((chat) => {
    setMessages(prevMessages => {
      return [...prevMessages, chat]
    })
  }, [setMessages])

  //入力されたテキストまたは画像の投稿
  const sendMessageFunc = () => {
    if(text.trim() === ""){
      return
    } else {
      addMessages({message: text, sended_at: timestamp, icon: userIcon, uid: uid, image: {id: '', path: ''}})
      dispatch(sendMessage(text, boardId, uid, userIcon))
      setText("")
    }
  }

  //画像の投稿
  const uploadImage = useCallback((event) => {
    const file = event.target.files;
    let blob = new Blob(file, { type: "image/jpeg"});

    // Generate random 16 digits strings
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n%S.length]).join('');

    const uploadRef = storage.ref('boardsImages').child(fileName);
    const uploadTask = uploadRef.put(blob);
      uploadTask.then(() => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          
          const data = {
            uid: uid,
            sended_at: timestamp,
            message: "",
            icon: userIcon,
            image: {id: fileName, path: downloadURL},
          };
      
          addMessages(data)
          
          db.collection('bulletinBoards').doc(boardId).set({updated_at: timestamp}, {merge: true})
            .then(() => {
              db.collection('bulletinBoards').doc(boardId).collection('messages').doc().set(data)
            })
        })
      }) 
  }, [addMessages])
  
  

  //掲示板作成時のデータ取得
  useEffect(() => {
    (async() => {
      await db.collection('bulletinBoards').doc(boardId).get()
      .then(snapshot => {
        const board = snapshot.data();
        setTitle(board.title)
        setMemo(board.memo)
        setImage(board.image)
      })
    })();
  }, [])

  //掲示板のメッセージ取得
  useEffect(() => {
    (async() => {
      const list = []

      await db.collection('bulletinBoards').doc(boardId)
      .collection('messages')
      .orderBy('sended_at', 'asc')
      .get()
      .then(snapshots => {
        snapshots.forEach(snapshot =>{
          const data = snapshot.data()
          list.push(data)
        })
        setMessages(list)
      }) 
    })();
  }, [])

  // 最新のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
    <section className="c-section-container">
      <div>
        <h2>{title}</h2>
        <p>{memo}</p>
        {image.path !== '' && <img className={classes.image} src={image.path} alt={"掲示板のイメージ画像"}/>}
        <div className="module-spacer--small"/>
      </div>
      <div className="c-box">
        <List className={classes.chats} id={"scroll-area"}>
          {messages.length > 0 && (
            messages.map((message, index) => (
              <Chat key={index} updated_at={message.sended_at} message={message.message}
               icon={message.icon} image={message.image} messageUid={message.uid} uid={uid} />
            ))
          )}
        </List>
        <div className="module-spacer--small"/>
        <MessageArea id={boardId} value={text} inputText={inputText} sendMessage={sendMessageFunc}
          uploadImage={uploadImage} inputEmoji={inputEmoji}
        />
      </div>
    </section>
  )
}

export default BoardDetail;