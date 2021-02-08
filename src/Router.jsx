import React from 'react';
import { Switch, Route } from 'react-router';
import { BoardEdit, Home, Reset, SignUp, SignIn } from './template';
import Auth from './Auth';

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signin/reset"} component={Reset} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signup"} component={SignUp} />

      <Auth>
        <Route exact path={"/board/edit"} component={BoardEdit} />
        <Route exact path={"(/)?"} component={Home} />
      </Auth>
    </Switch>
  )
}

export default Router;