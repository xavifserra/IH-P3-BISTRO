
import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import { withDataPlaces } from '../PlacesProvider';


class ListPlaces extends Component {
  render() {
    return (
      <div>
        listPlaces
      </div>
    );
  }
}

export default withAuth()(withDataPlaces()(ListPlaces));
