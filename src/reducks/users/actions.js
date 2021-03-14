export const FETCH_FRIENDS = "FETCH_FRIENDS";
export const fetchFriendsAction = (friends) => {
  return {
    type: "FETCH_FRIENDS",
    payload: {
      friends: friends,
    }
  }
}

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      icon: userState.icon,
      uid: userState.uid,
      username: userState.username
    }
  }
}

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      role: "",
      uid: "",
      username: ""
    }
  }
}