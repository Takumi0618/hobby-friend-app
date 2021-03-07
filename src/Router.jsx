import React from 'react';
import { Switch, Route } from 'react-router';
import { BoardCreate, BoardDetail, FriendProfile, Profile, Reset, SignUp, SignIn, BoardList } from './template';
import Auth from './Auth';

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signin/reset"} component={Reset} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signup"} component={SignUp} />

      <Auth>
        <Route exact path={"/board/detail/:id"} component={BoardDetail} />
        <Route exact path={"/board/create"} component={BoardCreate} />
        <Route exact path={"(/)?"} component={BoardList} />
        <Route exact path={"/profile"} component={Profile} />
        <Route exact path={"/profile/:id"} component={FriendProfile} />
      </Auth>
    </Switch>
  )
}

export default Router;