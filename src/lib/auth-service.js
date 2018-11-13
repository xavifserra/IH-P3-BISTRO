import axios from 'axios'

class Auth {
  constructor() {
    this.auth = axios.create({
      // baseURL: process.env.NODE_ENV ==='development'
      //           ? process.env.REACT_APP_DEV_URI
      //           : process.env.REACT_APP_PRODUCTION_URI,
      baseURL: process.env.REACT_APP_BASE_URI, //AUTO USE .env.develoment or env.production
      withCredentials: true
    })
  }

  signup(user) {
    const { username, password, email } = user
    return this.auth.post('/auth/signup', {username, password, email})
      .then(({ data }) => {
        console.log(data)
        return data
      })
      .catch(({ response }) => response.data)
  }

  login(user) {
    const { username, password } = user
    return this.auth.post('/auth/login', {username, password})
     .then(( {data} ) => {
       console.log(data);
       return data})
     .catch(({ response }) => response.data)
  }

  logout() {
    return this.auth.post('/auth/logout', {})
      .then(response => response.data)
      .catch(({ response }) => response.data)
  }

  delete() {
    return this.auth.delete('/api/v1/me/', {})
      .then(({ data }) => data)
      .catch(({ response }) => response.data)
  }

  update(newProfile) {
    console.log(newProfile);
    return this.auth.put('/api/v1/me/',newProfile)
      .then(({ data }) => data)
      .catch(({ response }) => response.data)
  }

  me() {
    return this.auth.get('/auth/me')
    .then(response => response.data)
    // .catch(({ response }) => response.data)
  }
}

const auth = new Auth()

export default auth
