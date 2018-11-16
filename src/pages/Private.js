import React, { Component } from 'react'

import { withAuth } from '../components/AuthProvider'

import Map from '../components/Map/Map'
import ListPlaces from '../components/ListPlaces/ListPlaces'

class Private extends Component {

  componentDidMount(){
    if (this.props.geojson.length<0) this.props.locateMe()
  }

  render() {
    const { user, searchString, geojson, userFavorite } = this.props
    const { features } = geojson

    return (
    <div>
      <Map/>
      <br/>
      {
        // eslint-disable-next-line array-callback-return
        features.map((element) => {
          const {_id, services, name} = element.properties
          if (name.includes(searchString)){
// console.log({ properties:element.properties});
          return(
            <ListPlaces
              key={_id}
              placeId={_id}
              place={element.properties}
              user={user}
              userFavorite={userFavorite}
              services={services}
            />
            )}
        })
      }
      <br/>
    </div>
  )}
}

export default withAuth()(Private)
