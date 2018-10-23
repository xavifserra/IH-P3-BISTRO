import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import Map from '../components/Map/Map';
import ListPlaces from '../components/ListPlaces/ListPlaces';

class Private extends Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <Map/>
        <p>
        Api: {process.env.REACT_APP_MAPBOXAPI}
        </p>
        <p>
        .ENV: {process.env.NODE_ENV}
        </p>
        <p>
        .ENV: {process.env.PUBLIC_URL}
        </p>
        <ListPlaces/>
      </div>
    )
  }
}

export default withAuth()(Private);
