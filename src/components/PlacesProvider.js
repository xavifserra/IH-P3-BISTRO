import React, { Component } from 'react'
import places from '../lib/places-service';
import LinearProgress  from '../components/Progress/LinearProgress';

export const PlacesContext = React.createContext(
   // places.getAroundGeoJSON() // default value
);

export const { Provider, Consumer }  = PlacesContext.Consumer;

export const withDataPlaces = () => (Comp) => {
  return class WithDataPlaces extends Component {
    render() {
      return (
        <Consumer>
          {(placeStore) => {
            return <Comp
            lat = { placeStore.lat }
            lng = { placeStore.lng }
            geojson = { placeStore.geojson }
            searchString = { placeStore.searchString }
            locateMe = { placeStore.locateMe}
            handleSearch = {placeStore.handleSearch}
            {...this.props} />
          }}
        </Consumer>
      )
    }
  }
}

export default class PlacesProvider extends Component {
  state = {
    lng: 0,
    lat: 0,
    geojson: {},
    searchString: '',
    status: 'loading',
  }

  locateMe = () =>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {

        const {latitude: lat, longitude: lng} = position.coords
        // test values. cerdanyola and ironhak
        // lng = 2.1454805 // 2.189978
        // lat = 41.4838637// 41.397779

         places.getAroundGeoJSON(lat, lng, 1000 )
          .then((data) => {
            // console.log(data);
            this.setState({
              lng: lng,
              lat: lat,
              geojson: data,
              searchString: '',
              status:'loaded'
            })
            return data
          }).catch((error) => {
            this.setState({
              lng: lng,
              lat: lat,
              geojson: {},
              searchString: '',
              status:'loaded',
            })
            return Error('Server connection lost')
          })
      })
    }
  }

  handleSearch = (e) =>{
   // console.log(e);

    this.setState({
      searchString : e.target.value
    })
  }

  getCoordinates = (e) => {
    console.log(e.target.value)
    // if(navigator.geolocation){
    //   return navigator.geolocation.getCurrentPosition(({coords}) => coords }
    // }
  }

   componentDidMount() {
   // this.locateMe()
  }

  render() {
    const { geojson, lat, lng,  status, searchString } = this.state;
    const { children } = this.props;
    // console.log({ geojson, lat, lng,  status } );
    switch (status) {
      case 'loading':
        return <div>
          <center>
            <LinearProgress/>
            loading places...
          </center>
          </div>
      default:
        return (
          <Provider value={
            { geojson,
              lat,
              lng,
              searchString,
              handleSearch: this.handleSearch,
              locateMe:this.locateMe,
            } }>
            {children}
          </Provider>
        );
    }
  }
}
