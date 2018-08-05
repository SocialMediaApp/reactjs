import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { LoginPage } from './pages/Login';
import { AuthRoute } from './higher-order/AuthRoute';
import { NewsfeedPage } from './pages/Newsfeed';
import { ProfilePage } from './pages/Profile';
import { HeaderComponent } from './components/Header';
import { FooterComponent } from './components/Footer';
import './firebase';

import 'bulma/css/bulma.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderComponent/>
        <Switch>
          <AuthRoute path="/newsfeed" component={NewsfeedPage}></AuthRoute>
          <Route path="/login" component={LoginPage} />
          <AuthRoute path="/profile" component={ProfilePage} />
          <AuthRoute path="*" render={() => <Redirect to="/newsfeed" />} />
        </Switch>
        <FooterComponent/>
      </div>
    );
  }
}

export default App;
