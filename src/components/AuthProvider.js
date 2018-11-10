/* eslint-disable no-unexpected-multiline */
import React, { Component } from 'react'
import auth from '../lib/auth-service'
import places from '../lib/places-service'
// import CircularProgress  from '../components/Progress/CircularProgres'
import LinearProgress  from '../components/Progress/LinearProgress'

export const AuthContext = React.createContext(
  // authStore // default value
)

export const { Provider, Consumer }  = AuthContext.Consumer

export const withAuth = () => (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <Consumer>
          {(authStore) => {
            return <Comp
              isLogged={authStore.isLogged}
              user={authStore.user}
              logout={authStore.logout}
              setUser={authStore.setUser}
              userProfile={authStore.userProfile}
              userRefresh={authStore.userRefresh}
              lat = { authStore.lat }
              lng = { authStore.lng }
              geojson = { authStore.geojson }
              searchString = { authStore.searchString }
              locateMe = { authStore.locateMe}
              handleSearch = {authStore.handleSearch}
              userFavorite = {authStore.userFavorite}
              {...this.props} />
          }}
        </Consumer>
      )
    }
  }
}

export default class AuthProvider extends Component {
  state = {
    isLogged: false,
    user: {},
    lng: 0,
    lat: 0,
    geojson: {},
    searchString: '',
    status: 'loading'
  }

  setUser = (user) => {
    this.setState({
      isLogged: true,
      user,
    })
  }

  logoutUser = () =>{
    auth.logout()
      .then(() => {
        this.setState({
          isLogged: false,
          user: {},
        })
      })
      .catch( error => console.log(error))
  }

  userProfile = (e) => {
    console.log(e)
    // e.preventDefault()
  }

  locateMe = () =>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {

        const {latitude: lat, longitude: lng} = position.coords
        // test values. cerdanyola and ironhak
        //        lng = 2.1454805  //  2.189978
        //        lat = 41.4838637 //  41.397779

        places.getAroundGeoJSON(lat, lng, 1000 )
        .then((data) => {
          // console.log(data)
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
    // console.log(e.target.value)

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

  userFavorite = (object) => {
    const { placeId, actualState} = object

    // console.log({ placeId, actualState, usr:this.state.user })

    if(!actualState) {
      places.putFavorite(placeId).then(({updatedUser})=> {
        this.setState({user:updatedUser})
      })
      // console.log(this.state.user);
    }else{
      places.removeFavorite(placeId).then(({updatedUser})=> {
        this.setState({user:updatedUser})
      })
      // console.log(this.state.user);
    }
  }

  componentDidMount() {
    auth.me()
      .then((user) => {
        // console.log(user);
        this.setState({
          isLogged: true,
          user,
          status: 'loading'
        })
      })
      .catch((error) => {
        this.setState({
          isLogged: false,
          user: {},
          status: 'loading'
        })
      })
  }

  componentWillMount(){
    this.locateMe()
  }

  render() {
    const { isLogged, user, status } = this.state
    const { geojson, lat, lng, searchString } = this.state
    const { children } = this.props
    switch (status) {
      case 'loading':
      return <div>
        <center>
          Loading
          <LinearProgress/>
          {/* <CircularProgress/> */}
        </center>
      </div>
    default:
      return (
        <Provider value={{
          isLogged, user,
          logout: this.logoutUser,
          setUser: this.setUser,
          userProfile: this.userProfile,
          userRefresh: this.userRefresh,
          geojson,
          lat,
          lng,
          searchString,
          handleSearch: this.handleSearch,
          locateMe:this.locateMe,
          userFavorite : this.userFavorite,
        }}>
          {children}
        </Provider>
      )
    }
  }
}
