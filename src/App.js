import React, { Component } from 'react'
import {Switch} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import AnonRoute from './components/AnonRoute'
import AppNavBar  from './components/AppNavBar/AppNavBar'
import AuthProvider from './components/AuthProvider'
import PlacesProvider from './components/PlacesProvider'

import Private from './pages/Private'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Favorites from './pages/Favorites'

import './App.css'
class App extends Component {
  render() {
    return (
      <AuthProvider>
        <PlacesProvider>
          {/* <p>mode: {process.env.NODE_ENV}</p> */}
          <AppNavBar/>
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <AnonRoute isExact path="/" component={Login}/>
            <PrivateRoute path="/private" component={Private} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/favorites" component={Favorites} />
          </Switch>
        </PlacesProvider>
      </AuthProvider>
    )
  }
}

export default App
