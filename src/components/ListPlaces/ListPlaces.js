
import React, { Component } from 'react'

import './ListPlaces.css'
class ListPlaces extends Component {
  constructor(props) {
    super(props);

    this.state={
      showDetails: false,
      favoriteIsEnabled: this.props.user.favorites.some(e => e===this.props.place._id),
    }
  }

  handleShowDetails= () => {
    const newState= !this.state.showDetails
    console.log(newState);
    this.setState = {
      showDetails: newState,
    }
  }

  changeStateOfFavorite = () => {
    this.props.userFavorite(
      {
        placeId:this.props.place._id,
        actualState:this.state.favoriteIsEnabled,
      })
      // .then(result=> console.log('result:  >',result))
    }

    componentDidUpdate = () => {
      console.log('Receive props', this.props.user.favorites.length);
      console.log(this.props.user)
      console.log(this.props.place)
      this.setState={
        // showDetails:false,
        favoriteIsEnabled: this.props.user.favorites.some(e => e===this.state.placeId)
      }
    }

    render = () => {
      const {
        _id:placeId,
        place,
        distance,
        address,
        category,
        location ,
        numReviews,
        reviews,
        details,
        polarity,
        lat,
        lng,
        owner,
      } = this.props.place
      // console.log(this.props);

    const {
      airConditioned,
      fidelityCard,
      ticketRestaurant,
      chequeGourmet,
      wifi,
      movileCoverage,
      pets,
      adapted,
    } = this.props.services
    // console.log(this.props);
    return (
    <div>
      {
        console.log( 'render:',placeId,'<=>',this.state.favoriteIsEnabled)
        /* {placeId} */
      }
      <div className='mdl-layout main-description'>
        <div className="distance">
          <p>{distance} km</p>
        </div>
        <div className="places">
          <h5 >{place}</h5>
        </div>

        <div className="social">
          <div className="material-icons">{airConditioned?"ac_unit":null}</div>
          <div className="material-icons">{fidelityCard?"card_giftcard":null}</div>
          <div className="material-icons">{ticketRestaurant?"credit_card":null}</div>
          <div className="material-icons">{chequeGourmet?"card_membership":null}</div>
          <div className="material-icons">{adapted?"accessible":null}</div>
          <div className="material-icons">{wifi?"wifi":null}</div>
          <div className="material-icons">{movileCoverage?"signal_cellular_alt":null}</div>
          <div className="material-icons">{pets?"pets":null}</div>
        </div>
        <div className="manage">
          <div className="material-icons"
            onClick={this.props.editPlace}>
            {owner===this.props.user._id?"edit":null}
          </div>
          <div className="material-icons"
            onClick={this.props.deletePlace}>
            {owner===this.props.user._id?"delete_forever":null}
          </div>
          <div className="material-icons"
             onClick={this.changeStateOfFavorite}>
             {this.state.favoriteIsEnabled ? 'favorite':'favorite_border'}
          </div>
          <div className="material-icons"
            onClick={this.handleShowDetails}>
            {this.state.showDetails?"expand_less":"expand_more"}
          </div>
        </div>
        <br/>

        {
          this.state.showDetails &&
          <div className='mdl-layout main-description'>
              <p>{this.props.user._id} </p>
              <p>{address}</p>
              <p>{reviews}</p>
              <div className='material-icons' />

              <div className='mdl-layout'>
                <label >{category}</label>
                <label >{location }</label>
                <label>{numReviews}</label>
                <label >{reviews}</label>
                <label >{details}</label>
                <label >{polarity}</label>
                <label >{lat}</label>
                <label >{lng}</label>
              </div>
          </div>
        }
      </div>
    </div>
    )
  }
}

export default ListPlaces
