
import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';
import { withDataPlaces } from '../PlacesProvider';

import './ListPlaces.css'
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
    // console.log(this.props);
    const {_id:userId, favorites} = this.props.user
    const favoriteEnbled = favorites.some(e => e._id===placeId)

    // console.log('fav:',placeId, favorites, favoriteEnbled);
    return (
    <div>
      <div className='mdl-layout main-description'>
        <div className="distance">
          <p>{distance} km</p>
        </div>
        <div className="places">
          <h5 >{place}</h5>
        </div>
        <dir className="social">
          <div className="material-icons" >ac_unit</div>
          <div className="material-icons" >wifi</div>
          <div className="material-icons" >account_box</div>
          <div className="material-icons" >credit_card</div>
          <div className="material-icons"
             onClick={e=>this.props.userFavorite({userId, placeId, favoriteEnbled})}>
             {favoriteEnbled?'favorite':'favorite_border'}
          </div>
          <div className="material-icons" >edit</div>
        </dir>

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

export default withAuth()(withDataPlaces()(ListPlaces))
