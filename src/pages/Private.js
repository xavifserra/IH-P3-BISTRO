import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import Map from '../components/Map/Map';
import ListPlaces from '../components/ListPlaces/ListPlaces';


class Private extends Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <h1>Welcome {user.username}</h1>
        <Map/>
        <ListPlaces/>
      </div>
    )
  }
}

export default withAuth()(Private);
