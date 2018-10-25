import axios from 'axios';

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.NODE_ENV ==='development'
                ? process.env.REACT_APP_DEV_URI
                : process.env.REACT_APP_PRODUCTION_URI,
      withCredentials: true
    })
  }

  signup(user) {
    const { username, password, email } = user;
    return this.auth.post('/auth/signup', {username, password, email})
      .then(({ data }) => data);
  }

  login(user) {
    const { username, password } = user;
    return this.auth.post('/auth/login', {username, password})
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/auth/logout', {})
      .then(response => response.data)
  }

  me(user) {
    return this.auth.get('/auth/me')
    .then(response => response.data)
  }
}

const auth = new Auth()

export default auth
