import React, { Component } from 'react';

import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import AppNavBar  from './components/AppNavBar/AppNavBar'
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './components/AuthProvider';

import './App.css';
class App extends Component {
  render() {
    return (
      <AuthProvider>
        <AppNavBar/>
        <p>
          mode: {process.env.NODE_ENV}
        </p>
        <Switch>
          <AnonRoute path="/signup" component={Signup} />
          <AnonRoute path="/login" component={Login} />
          <PrivateRoute path="/private" component={Private} />
          {/* <PrivateRoute path="/profile" component={Profile} /> */}
          {/* <PrivateRoute path="/favorites" component={Favorites} /> */}
        </Switch>
      </AuthProvider>
    )
  }
}

export default App;
