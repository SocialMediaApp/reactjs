// React
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';

// Pages
import { LoginPage } from './pages/Login';
import { NewsfeedPage } from './pages/Newsfeed';
import { ProfilePage } from './pages/Profile';

// Components
import { AuthRoute } from './higher-order/AuthRoute';
import { AuthSubscription } from './higher-order/AuthSubscription';
import { HeaderComponent } from './components/Header';
import { FooterComponent } from './components/Footer';

// 3rd Party
import './firebase';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
  render() {
    return (
      <AuthSubscription className="app">
        <HeaderComponent/>
        <Switch>
          <AuthRoute path="/newsfeed" component={NewsfeedPage}></AuthRoute>
          <Route path="/login" component={LoginPage} />
          <AuthRoute path="/profile" component={ProfilePage} />
          <AuthRoute path="*" render={() => <Redirect to="/newsfeed" />} />
        </Switch>
        <FooterComponent/>
      </AuthSubscription>
    );
  }
}

export default App;
