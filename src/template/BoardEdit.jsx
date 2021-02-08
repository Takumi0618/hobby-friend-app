import React, { useCallback, useState } from 'react';
import { TextInput } from '../components/UIkit';

const BoardEdit = () => {

  const [title, setTitle] = useState(""),
        [category, setCategory] = useState(""),
        [memo, setMemo] = useState("");

  const inputTitle = useCallback((event) => {
    setTitle(event.target.value)
  }, [setTitle]);
  
  const inputMemo = useCallback((event) => {
    setMemo(event.target.value)
  }, [setMemo]);

  return (
    <section>
      <h2>掲示板の作成</h2>
      <div>
        <TextInput 
          fullWidth={true} label={"タイトル"} multiline={false} required={true}
          rows={1} value={title} type={"text"} onChange={inputTitle}
        />
        <TextInput 
          fullWidth={true} label={"一言"} multiline={false} required={false}
          rows={1} value={memo} type={"text"} onChange={inputMemo}
        />
      </div>
    </section>
  )
}

export default BoardEdit;