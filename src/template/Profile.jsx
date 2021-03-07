import React, { useCallback, useEffect, useState } from 'react';
import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit';
import { setProfile } from '../reducks/users/operations';
import { useDispatch, useSelector } from "react-redux";
import { ImageArea } from '../components/boards';
import { db } from '../firebase';
import { getUserId } from '../reducks/users/selector';

const Profile = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

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

  //プロフィールデータの取得
  useEffect(() => {
    db.collection('users').doc(uid).get().then(snapshot => {
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
  }, [])

  return (
    <section>
      <h2 className="u-text__headline u-text-center">プロフィールの設定</h2>
      <div className="c-section-container">
        
        <ImageArea image={image} setImage={setImage} />
        <TextInput 
          fullWidth={true} label={"名前"} multiline={false} required={true}
          rows={1} value={username} type={"text"} onChange={inputUsername}
        />
        <TextInput 
          fullWidth={true} label={"自己紹介"} multiline={true} required={false}
          rows={4} value={introduce} type={"text"} onChange={inputIntroduce}
        />
        <h2>趣味</h2>
        <SelectBox
          label={"趣味1"} required={false} options={categories} select={setHobby1} value={hobby1}
        />
        <SelectBox 
          label={"趣味2"} required={false} options={categories} select={setHobby2} value={hobby2}
        />
        <SelectBox 
          label={"趣味3"} required={false} options={categories} select={setHobby3} value={hobby3}
        />
        
      </div>
      <div className="module-spacer--small"/>
      <div className="u-text-center">
        <PrimaryButton
          label={"プロフィールを設定"}
          onClick={() => dispatch(setProfile(uid, username, hobby1, hobby2, hobby3, introduce, image))}
        />
      </div>
    </section>
  )
}

export default Profile;