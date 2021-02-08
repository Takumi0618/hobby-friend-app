import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { resetPassword } from '../reducks/users/operations';
import { push } from "connected-react-router";

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);
  
        
  return (
    <div>
      <h2>パスワードのリセット</h2>
      <div>スペース</div>
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"text"} onChange={inputEmail}
      />
      <div>スペース</div>
      <div>
        <PrimaryButton
          label={"Reset password"}
          onClick={() => dispatch(resetPassword(email))}
        />
        <p onClick={() => dispatch(push('/signin'))}>ログイン画面に戻る</p>
      </div>

    </div>
  )
}

export default Reset;