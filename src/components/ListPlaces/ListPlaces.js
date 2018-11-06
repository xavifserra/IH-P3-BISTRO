
import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import { withDataPlaces } from '../PlacesProvider';

import './ListPlaces.css'
import { div } from 'gl-matrix/src/gl-matrix/vec4';
class ListPlaces extends Component {

  render() {
    const {
      _id:placeId,
      place,
      address,
      category,
      location ,
      numReviews,
      reviews,
      details,
      distance,
      polarity,
      lat,
      lng,
      searchString,
    } = this.props.data.properties
console.log(this.props.data);
    return (
    <div>
      <div className='mdl-layout main-description'>
        <div className="distance">
          <p>{distance} km</p>
        </div>
        <div className="places">
          <h5 >{place}</h5>
        </div>
        <div className="social">
          <i className="material-icons">favorite_border</i>
        </div>
        <div class="social material-icons" >ac_unit</div>
        <div class="social material-icons mdl-badge mdl-badge--overlap" data-badge="1">account_box</div>
        <div class="social material-icons mdl-badge mdl-badge--overlap" data-badge="1">account_box</div>

        {/* <fieldset>
          <p>{searchString}</p>
          <h2>{address}</h2>
          <h4>{reviews}</h4>
          <p>{address}</p>
          <p>{distance}</p>
          <p className='icon trash' />
          </fieldset>
          <fieldset className='hide-mobile'>
          <label >{category}</label>
          <label >{location }</label>
          <label>{numReviews}</label>
          <label >{reviews}</label>
          <label >{details}</label>
          <label >{polarity}</label>
          <label >{lat}</label>
          <label >{lng}</label>
        </fieldset> */}
        <br/>
      </div>
      </div>
    )
  }
}

export default ListPlaces
