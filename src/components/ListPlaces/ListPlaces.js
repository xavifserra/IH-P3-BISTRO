import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../AuthProvider';

import Paper from '@material-ui/core/Paper'

class ListPlaces extends Component {


  render() {
    // const { isLogged, user, logout } = this.props;
    // const { username } = user;

    return (
      <div>
        <Paper>
          <ul>
            <li> element 1</li>
            <li> element 2</li>
            <li> element 3</li>
          </ul>
        </Paper>
        <Paper>
          <ul>
            <li> element 1</li>
            <li> element 2</li>
            <li> element 3</li>
          </ul>
        </Paper>
      </div>
    );
  }
}

export default withAuth()(ListPlaces);
