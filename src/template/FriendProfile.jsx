import React, { useCallback, useEffect, useState } from 'react';
import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit';
import { useDispatch } from "react-redux";
import { ImageArea } from '../components/boards';
import { db } from '../firebase';

const FriendProfile = () => {
  const dispatch = useDispatch();
  
  let friendId = window.location.pathname.split('/profile/')[1];

  const [username, setUsername] = useState(""),
        [hobby1, setHobby1] = useState(""),
        [hobby2, setHobby2] = useState(""),
        [hobby3, setHobby3] = useState(""),
        [categories, setCategories] = useState([]),
        [introduce, setIntroduce] = useState(""),
        [image, setImage] = useState({id: "", path: ""});

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value)
  }, [setUsername]);
  
  const inputIntroduce = useCallback((event) => {
    setIntroduce(event.target.value)
  }, [setIntroduce]);

  //プロフィールデータの取得
  useEffect(() => {
    db.collection('users').doc(friendId).get().then(snapshot => {
      const data = snapshot.data();

      if (!data.introduce) {
        setUsername(data.username)
        setImage(data.icon)
        return
      } else {   
        setUsername(data.username)
        setImage(data.icon)
        setHobby1(data.hobbies[0])
        setHobby2(data.hobbies[1])
        setHobby3(data.hobbies[2])
        setIntroduce(data.introduce)
      }
    })
  }, [friendId])

  //カテゴリーの取得
  useEffect(() => {
    db.collection('categories')
      .orderBy('order', 'asc')
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach(snapshot => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name
          })
        })
        setCategories(list)
      })
  }, []);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">{username}のプロフィール</h2>
      <div className="c-section-container">
        <ImageArea image={image} setImage={setImage} />
        <TextInput 
          fullWidth={true} label={"名前"} multiline={false} required={true}
          rows={1} value={username} type={"text"} onChange={inputUsername}
          disabled={true}
        />
        <TextInput 
          fullWidth={true} label={"自己紹介"} multiline={true} required={false}
          rows={4} value={introduce} type={"text"} onChange={inputIntroduce}
          disabled={true}
        />
        <SelectBox
          label={"趣味1"} required={false} options={categories} select={setHobby1} value={hobby1}
          disabled={true}
        />
        <SelectBox 
          label={"趣味2"} required={false} options={categories} select={setHobby2} value={hobby2}
          disabled={true}
        />
        <SelectBox 
          label={"趣味3"} required={false} options={categories} select={setHobby3} value={hobby3}
          disabled={true}
        />
        
      </div>
      <div className="module-spacer--small"/>
      <div className="u-text-center">
        <PrimaryButton 
          label={"メッセージを送る"}
        />
      </div>
    </section>
  )
}

export default FriendProfile;