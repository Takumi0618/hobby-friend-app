import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { signUp } from '../reducks/users/operations';
import { push } from "connected-react-router";

const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(""),
        [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState("");

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value)
  }, [setUsername]);
  
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);
  
  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword]);
  
  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value)
  }, [setConfirmPassword]);
        
  return (
    <div>
      <h2>アカウント登録</h2>
      <div>スペース</div>
      <TextInput 
        fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
        rows={1} value={username} type={"text"} onChange={inputUsername}
      />
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"text"} onChange={inputEmail}
      />
      <TextInput 
        fullWidth={true} label={"パスワード(6文字以上の英数字)"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <TextInput 
        fullWidth={true} label={"パスワードの確認"} multiline={false} required={true}
        rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
      />
      <div>スペース</div>
      <div>
        <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
        />
        <p onClick={() => dispatch(push('/signin'))}>すでにアカウントをお持ちの方はこちら</p>
      </div>

    </div>
  )
}

export default SignUp;