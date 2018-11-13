/* eslint-disable no-unexpected-multiline */
import React, { Component } from 'react'
// import { Link, Redirect } from 'react-router-dom';

import auth from '../lib/auth-service'
import places from '../lib/places-service'
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
              userSaveProfile={authStore.userSaveProfile}
              userDeleteProfile={authStore.userDeleteProfile}
              // userFavorites= {this.userFavorites}
              lat = { authStore.lat }
              lng = { authStore.lng }
              geojson = { authStore.geojson }
              locateMe = { authStore.locateMe}
              handleSearch = {authStore.handleSearch}
              searchString = { authStore.searchString }
              userFavorite = {authStore.userFavorite}
              editPlace = {authStore.editPlace}
              deletePlace = {authStore.deletePlace}
              saveNewPlace= {authStore.saveNewPlace}
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

  // getSnapshotBeforeUpdate(prevProps, prevState){
  //   console.log('Snapshot',this.state.user===prevState.user&&prevState.user>0);
  //   if(this.state.user===prevState.user&&prevState.user>0){
  //     console.log('Need Snapshot');
  //     return prevState.user
  //   }
  //   return null
  // }

  // componentDidUpdate(prevProps, prevState,snapshot){
  //   console.log('actual state:',this.state.user)
  //   console.log('prev state:',prevState.user)
  //   if (snapshot !== null) console.log('snapshot');
  //   if(this.state.user===prevState.user&&prevState.user>0){
  //     console.log('sin cambios');
  //   }
  // }

  componentWillMount(){
    this.locateMe()
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

    this.setState({
      searchString : e.target.value
    })
  }

  saveNewPlace = (e) => {
    // e.preventDefault() // not needed. Use Formik for send results
    console.log(e)
    console.log('save new place');
    // mapServices.getAddresInCurrentCoordinates()
    // if(navigator.geolocation){
      //   return navigator.geolocation.getCurrentPosition(({coords}) => coords }
      // }
  }

  userDeleteProfile = (e) => {
    auth.delete()
    .then(response=>this.logoutUser())
  }

  userSaveProfile = (newProfile) => {
    // e.preventDefault() Not needed. controlled in FormiK

    auth.update(newProfile)
    .then(savedUser=> !savedUser.error ? this.setUser(savedUser) : null)
  }

  userFavorite = (favorite) => {
    const { placeId, actualState} = favorite

    if(!actualState) {
      return places.putFavorite(placeId)
      .then((updatedUser)=> {
        // console.log(updatedUser);
        console.log('push',updatedUser);
        this.setUser(updatedUser)
        return updatedUser
      })
    }else{
      return places.removeFavorite(placeId)
      .then((updatedUser)=> {
        console.log('pull',updatedUser);
        this.setUser(updatedUser)
        return updatedUser
      })
    }
  }

  editPlace = () => {

  }

  deletePlace = () => {

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
        </center>
      </div>
    default:
      return (
        <Provider value={{
          isLogged, user,
          logout: this.logoutUser,
          setUser: this.setUser,
          userSaveProfile: this.userSaveProfile,
          userDeleteProfile: this.userDeleteProfile,
          userFavorite : this.userFavorite,
          geojson,
          lat,
          lng,
          searchString,
          handleSearch: this.handleSearch,
          locateMe:this.locateMe,
          editPlace:this.editPlace,
          deletePlace:this.deletePlace,
          saveNewPlace:this.saveNewPlace,
        }}>
          {children}
        </Provider>
      )
    }
  }
}
