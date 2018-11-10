import React, { Component } from 'react'
import auth from '../lib/auth-service'

import { Link } from 'react-router-dom'

import './styles/access.css'
class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const { username, password } = this.state

    auth.login({ username, password })
    .then( (user) => {
      this.props.setUser(user)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  render() {
    const { username, password } = this.state

    return (

  <div className="container">
    <div className="main-container mdl-card mdl-shadow--2dp">
      <div className="mdl-card__title">
          <h2>BISTRO</h2>
      </div>

      <form className="form-group" onSubmit={this.handleFormSubmit}>
        <label>Username:</label>
        <input className="mdl-textfield__input" type="text" name="username" value={username} onChange={this.handleChange}/>
        <label>Password:</label>
        <input className="mdl-textfield__input" type="password" name="password" value={password} onChange={this.handleChange} />

        <div className="mdl-card__supporting-text">
          New user? Sign up to create your account
            <Link to={"/signup"}> SignUp</Link>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-button ">LogIn</button>
        </div>
      </form>
    </div>
  </div>

    )
  }
}

export default Login
