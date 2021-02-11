import React, { useCallback, useState } from 'react';
import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit';
import { createBoard } from '../reducks/bulletinBoards/operations';
import { useDispatch } from "react-redux";
import { ImageArea } from '../components/boards';



const BoardCreate = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState(""),
        [category, setCategory] = useState(""),
        [memo, setMemo] = useState(""),
        [image, setImage] = useState({id: "", path: ""});

  const inputTitle = useCallback((event) => {
    setTitle(event.target.value)
  }, [setTitle]);
  
  const inputMemo = useCallback((event) => {
    setMemo(event.target.value)
  }, [setMemo]);

  const categories = [
    {id: "sports", name: "スポーツ"},
    {id: "music", name: "音楽"},
    {id: "game", name: "ゲーム"},
    {id: "cartoon", name: "アニメ"},
    {id: "books", name: "読書"},
    {id: "entertainment", name: "エンタメ"},
    {id: "business", name: "ビジネス"},
    {id: "food", name: "グルメ"},
    {id: "sweets", name: "スイーツ"},
  ];

  return (
    <section>
      <h2 className="u-text__headline u-text-center">掲示板の作成</h2>
      <div className="c-section-container">
        <ImageArea image={image} setImage={setImage} />
        <TextInput 
          fullWidth={true} label={"タイトル"} multiline={false} required={true}
          rows={1} value={title} type={"text"} onChange={inputTitle}
        />
        <SelectBox 
          label={"カテゴリー"} required={true} options={categories} select={setCategory} value={category}
        />
        <TextInput 
          fullWidth={true} label={"一言"} multiline={false} required={false}
          rows={1} value={memo} type={"text"} onChange={inputMemo}
        />
      </div>
      <div className="module-spacer--small"/> 
      <div className="u-text-center">
        <PrimaryButton
          label={"掲示板を作成"}
          onClick={() => dispatch(createBoard(title, category, memo, image))}
        />
      </div>
    </section>
  )
}

export default BoardCreate;