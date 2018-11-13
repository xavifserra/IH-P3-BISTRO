
import React, { Component } from 'react'

import './ListPlaces.css'
class ListPlaces extends Component {
    state={
      showDetails: false,
      favoriteIsEnabled: this.props.user.favorites
                         ?this.props.user.favorites.some(e => e._id===this.props.placeId)
                         :false,
    }

  handleShowDetails= () => {
    this.setState({
      showDetails: !this.state.showDetails,
    })
  }

  handleStateOfFavorite = () => {
    this.props.userFavorite(
      {
        placeId:this.props.placeId,
        actualState:this.state.favoriteIsEnabled,
      })
      .then(result=> this.setState({
        favoriteIsEnabled: this.props.user.favorites?this.props.user.favorites.some(e => e._id===this.props.placeId):false
      }))
    }

    componentDidMount = (prevProps, prevState) => {
      // console.log('Receive props', this.props.user.favorites);
      // console.log(this.props.user)
      // console.log(this.props.place)
      // console.log(this.state.favoriteIsEnabled,'<=>', this.props.user.favorites.some(e => e._id===this.props.place._id),
      // this.state.favoriteIsEnabled === this.props.user.favorites.some(e => e._id===this.props.place._id))
      // if(this.props.user.favorites.length !== prevProps.user.favorites.length){
      //   console.log('CAMBIO DE PROPS');
      //   this.setState({
      //     // showDetails:false,
      //     favoriteIsEnabled: this.props.user.favorites.some(e => e._id===this.props.place._id)
      //   })
      // }
    }

    render = () => {
      const {
        _id,
        name,
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
       console.log(this.props.place);

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
        // console.log( 'render:',placeId,'favoriteIsEnabled:',this.state.favoriteIsEnabled,'calculated:',this.props.user.favorites.some(e => e._id===this.props.place._id))
        /* {placeId} */
      }
      <div className='mdl-layout main-description'>
        <div className="distance">
          <p>{distance} km</p>
        </div>
        <div className="places">
          <h5 >{place}</h5>
          <h5 >{name}</h5>
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
             onClick={this.handleStateOfFavorite}>
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
          <div className='mdl-layout sub-description'>
              {/* <p>{this.props.user._id} </p> */}
              <h6>{address}</h6>
              <p>{reviews}</p>
              <div className='material-icons' />

              <div className='mdl-layout sub-description'>
                <label >{category}</label>
                <label >{location }</label>
                {/* <label>{numReviews}</label>
                <label >{reviews}</label>
                <label >{details}</label>
                <label >{polarity}</label> */}
                <label >latitude: {lat}</label>
                <label >longitude: {lng}</label>
              </div>
              <div className='mdl-layout sub-header' >
                comments
              </div>
          </div>
        }
      </div>
    </div>
    )
  }
}

export default ListPlaces

