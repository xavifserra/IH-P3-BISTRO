import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../AuthProvider';

class ListPlaces extends Component {
  render() {
    const { isLogged, user, logout } = this.props;
    const { username } = user;

    return (
      <div>
        ListPlaces
      </div>
    );
  }
}

export default withAuth()(ListPlaces);
