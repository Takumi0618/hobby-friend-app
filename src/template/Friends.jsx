import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Friend } from '../components/chat';
import List from '@material-ui/core/List';
import { getFriends, getUserId } from '../reducks/users/selector';
import { fetchFriends } from '../reducks/users/operations'

const Friends = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const friends = getFriends(selector);
  
  //友達データの取得
  useEffect(() => {
    dispatch(fetchFriends(uid))
  }, []);
  
  return (
    <section className="c-section-container">
      <div className="c-box">
        <List id={"scroll-area"}>
          {friends &&
            friends.length > 0 ?
              friends.map(friend => (
                <Friend
                  key={friend.uid} username={friend.username} uid={friend.uid} icon={friend.icon} check={friend.check}
                />
              ))
            :
              <h2 className="u-text__headline">掲示板でお友達を探しましょう！</h2>
          }
        </List>
      </div>
    </section>
  )
}

export default Friends;