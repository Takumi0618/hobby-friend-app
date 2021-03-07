import React from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const EmojiLibrary = (props) => {
  return (
    <>
      {props.open && (
        <Picker
          onClick={(e) => props.handleEmojiToggle(e)}
          onSelect={emoji => props.inputEmoji(emoji.native)}
          native
          perLine={7} 
          i18n={{
            search: '検索',
            categories: {
              search: '検索結果',
              recent: 'よく使う絵文字',
              people: '顔 & 人',
              nature: '動物 & 自然',
              foods: '食べ物 & 飲み物',
              activity: 'アクティビティ',
              places: '旅行 & 場所',
              objects: 'オブジェクト',
              symbols: '記号',
              flags: '旗',
              custom: 'カスタム',
            },
          }}
          style={{
            position: 'absolute',
            zIndex: '1',
          }}
        />
      )}
    </>
  );
}

export default EmojiLibrary;