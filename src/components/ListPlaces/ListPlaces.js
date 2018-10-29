import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../AuthProvider';
import { withDataPlaces } from '../PlacesProvider';

import Paper from '@material-ui/core/Paper'

class ListPlaces extends Component {


  render() {
    const { _id: userId } = this.props.user;
     const {
       _id: placeId,
    //   id,
    //   place,
    //   address,
    //   category,
    //   location ,
    //   numReviews,
    //   reviews,
    //   details,
    //   polarity,
       lat,
       lng } = this.props.properties.geojson.features

      console.log(this.props);

    return (
      <div>
        <Paper>
          {/* {console.log({
              _id: placeId,
              id,
              place,
              address,
              category,
              location ,
              numReviews,
              reviews,
              details,
              polarity,
              lat,
              lng })}; */}
          <ul>
            <li> element</li>
          </ul>
        </Paper>
      </div>
    );
  }
}

export default withAuth()(withDataPlaces()(ListPlaces));
