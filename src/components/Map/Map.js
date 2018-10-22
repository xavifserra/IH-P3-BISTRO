import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../AuthProvider';


class Map extends Component {
  render() {
    const { isLogged, user, logout } = this.props;
    const { username } = user;

    return (
      <div>
        Map
      </div>
    );
  }
}

export default withAuth()(Map);
