import React, { useEffect, useState, useCallback } from 'react';
import List from '@material-ui/core/List';
import { Chat } from '../components/boards';
import { MessageArea } from '../components/boards';
import { db, FirebaseTimestamp, storage } from '../firebase';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageFriend } from '../reducks/users/operations';
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

const ChatFriend = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const userIcon = getUserIcon(selector);
  const uid = getUserId(selector);
  const timestamp = FirebaseTimestamp.now();

  let friendId = window.location.pathname.split('/chat/')[1];

  const [image, setImage] = useState({id: "", path: ""}),
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

  //入力されたテキストの投稿
  const sendMessageFunc = () => {
    if(text.trim() === ""){
      return
    } else {
      addMessages({message: text, sended_at: timestamp, icon: userIcon, uid: uid, image: {id: '', path: ''}})
      dispatch(sendMessageFriend(text, friendId, uid, userIcon))
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

    const uploadRef = storage.ref('chatsFriendImages').child(fileName);
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
          
          //自分のデータベースに内容を保存
          db.collection('users').doc(uid).collection('friends').doc(friendId)
            .set({updated_at: timestamp, check: false}, {merge: true})
            .then(() => {
              db.collection('users').doc(uid).collection('friends').doc(friendId).collection('messages').doc().set(data)
            })
          
          //相手のデータベースに内容を保存
          db.collection('users').doc(friendId).collection('friends').doc(uid)
            .set({updated_at: timestamp, check: true}, {merge: true})
            .then(() => {
              db.collection('users').doc(friendId).collection('friends').doc(uid).collection('messages').doc().set(data)
            })
        })
      }) 
  }, [addMessages])

  //過去のメッセージ取得
  useEffect(() => {
    (async() => {
      const list = []

      await db.collection('users').doc(uid).collection('friends').doc(friendId)
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
        {/* <h2></h2> */}
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
        <MessageArea value={text} inputText={inputText} sendMessage={sendMessageFunc}
          uploadImage={uploadImage} inputEmoji={inputEmoji}
        />
      </div>
    </section>
  )
}

export default ChatFriend;