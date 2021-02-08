import { signInAction, signOutAction } from './actions';
import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from '../../firebase/index';
import firebase from 'firebase/app';

const usersRef = db.collection('users');

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
        if (user) {
          const uid = user.uid;

          usersRef.doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data();
              if (!data) {
                throw new Error('ユーザーデータが存在しません。')
              }

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username
              }))
            })
        } else {
          dispatch(push('/signin'))
        }
    })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert('必須項目が未入力です')
      return false
    } else {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          alert('入力されたアドレスにパスワードリセット用のメールを送りました。')
          dispatch(push('/signin'))
        }).catch(() => {
          alert('パスワードリセットに失敗しました。通信環境を確認してください。')
        })
    }
  }
}

export const signIn = (email, password) => {
  return async (dispatch) => {
    // Validation
    if (email === "" || password === "") {
      alert("必須項目が未入力です")
      return false
    }

    auth.signInWithEmailAndPassword(email, password)
    .then(result => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        db.collection('users').doc(uid).get()
          .then(snapshot => {
            const data = snapshot.data();

            dispatch(signInAction({
              icon: data.icon,
              isSignedIn: true,
              role: data.role,
              uid: uid,
              username: data.username
            }))

            dispatch(push('/'))
          })
      }
    })
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // Validation
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
      alert("必須項目が未入力です")
      return false
    }
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試し下さい。")
      return false
    }
    if (password.length < 6) {
      alert("パスワードは6文字以上で入力してください。")
      return false
    }

    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username
          }

          db.collection('users').doc(uid).set(userInitialData)
            .then(() => {
              dispatch(push('/'))
            })
        }
      })
  }
}

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(signOutAction());
        dispatch(push('/signin'));
      })
  }
}

export const TwitterSignIn = () => {
  return async (dispatch) => {
    var provider = new firebase.auth.TwitterAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => {
        var user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();
          const username = user.displayName;
          const email = user.email;
          const icon = user.photoURL;

          const userInitialData = {
            icon: icon,
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username
          }
          
          if (!db.collection('users').doc(uid).get()){
            db.collection('users').doc(uid).set(userInitialData)
          }
          dispatch(push('/'))
        }
      })
  }
}