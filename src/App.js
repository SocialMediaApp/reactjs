import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { LoginPage } from './Pages/Login';
import { AuthRoute } from './HigherOrder/AuthRoute';
import { NewsfeedPage } from './Pages/Newsfeed';
import { ProfilePage } from './Pages/Profile';
import { HeaderComponent } from './Components/Header';
import { FooterComponent } from './Components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderComponent/>
        <Switch>
          <AuthRoute path="/newsfeed" component={NewsfeedPage}></AuthRoute>
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="*" render={() => <Redirect to="/newsfeed" />} />
        </Switch>
        <FooterComponent/>
      </div>
    );
  }
}

export default App;
