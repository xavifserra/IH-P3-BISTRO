import React, { Component } from 'react'
import auth from '../lib/auth-service';
import CircularProgress  from '../components/Progress/CircularProgres';

export const AuthContext = React.createContext(
  // authStore // default value
);

export const { Provider, Consumer }  = AuthContext.Consumer;

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
              userFavorites={authStore.userFavorites}
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
        });
      })
      .catch( error => console.log(error))
  }

  userProfile = (e) => {
    console.log('Profile')
    // e.preventDefault()
  }

  userFavorites = (e) => {
    console.log('Favorites')
    // e.preventDefault()
  }

  componentDidMount() {
    auth.me()
      .then((user) => {
        this.setState({
          isLogged: true,
          user,
          status: 'loaded'
        })
      })
      .catch((error) => {
        this.setState({
          isLogged: false,
          user: {},
          status: 'loaded'
        });
      })
  }

  render() {
    const { isLogged, user, status } = this.state;
    const { children } = this.props;
    switch (status) {
      case 'loading':
        return <div>
          <center>
            Loading
            <CircularProgress/>
          </center>
        </div>
      default:
        return (
          <Provider value={{
            isLogged, user,
            logout: this.logoutUser,
            setUser: this.setUser,
            userProfile: this.userProfile,
            userFavorites: this.userFavorites
          }}>
            {children}
          </Provider>
        );
    }
  }
}
