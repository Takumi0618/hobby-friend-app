import React from 'react';
import { Switch, Route } from 'react-router';
import { BoardCreate, Reset, SignUp, SignIn, BoardList } from './template';
import Auth from './Auth';

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signin/reset"} component={Reset} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signup"} component={SignUp} />

      <Auth>
        <Route exact path={"/board/edit"} component={BoardCreate} />
        <Route exact path={"(/)?"} component={BoardList} />
      </Auth>
    </Switch>
  )
}

export default Router;