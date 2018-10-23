import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './AuthProvider';
import  AppBarMenu from './AppNavBar/AppBarMenu';

class Navbar extends Component {
  render() {
    const { isLogged, user, logout } = this.props;
    const { username } = user;

    if (isLogged) {
      return <div>
        <AppBarMenu/>
        <ul>
          <li>username: { username }</li>
          <li onClick={logout}>Logout</li>
        </ul>
      </div>
    } else {
      return <div>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
        {process.env.REACT_APP_MAPBOX_API}
      </div>
    }

  }
}

export default withAuth()(Navbar);
