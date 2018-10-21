import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import AuthProvider from './components/AuthProvider';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
//import 'spectre.css/dist/spectre.css'
class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Navbar />
        <Switch>
          <AnonRoute path="/signup" component={Signup} />
          <AnonRoute path="/login" component={Login} />
          <PrivateRoute path="/private" component={Private} />
        </Switch>
      </AuthProvider>
    )
  }
}

export default App;
