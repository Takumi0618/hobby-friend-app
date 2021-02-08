import React, { useCallback, useState } from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { signIn, TwitterSignIn } from '../reducks/users/operations';

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
        [password, setPassword] = useState("");
  
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);
  
  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword]);
        
  return (
    <div>
      <h2>サインイン</h2>
      <div>スペース</div>
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"text"} onChange={inputEmail}
      />
      <TextInput 
        fullWidth={true} label={"パスワード(6文字以上の英数字)"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <div>スペース</div>
      <div>
        <PrimaryButton
          label={"Sign In"}
          onClick={() => dispatch(signIn(email, password))}
        />
        <PrimaryButton
          label={"Twitterで登録・サインインする"}
          onClick={() => dispatch(TwitterSignIn())}
        />
        <p onClick={() => dispatch(push('/signup'))}>アカウント登録はこちら</p>
        <p onClick={() => dispatch(push('/signin/reset'))}>パスワードを忘れた方はこちら</p>
      </div>
    </div>
  )
}

export default SignIn;