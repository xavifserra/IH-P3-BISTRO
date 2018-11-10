import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import auth from '../lib/auth-service'

import './styles/access.css'
class Signup extends Component {

  state = {
    username: "",
    password: "",
    email: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const username = this.state.username
    const password = this.state.password
    const email = this.state.email

    auth.signup({ username, password, email })
      .then( (user) => {
        this.setState({
            username: "",
            password: "",
            email:"",
        })
        this.props.setUser(user)
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  render() {
    const { username, password, email } = this.state

    return (
      <div className="container">
        <div className="main-container  mdl-card mdl-shadow--2dp" >
          <div className="mdl-card__title">
              <h2>BISTRO</h2>
          </div>

          <form className="form-group" onSubmit={this.handleFormSubmit}>
            <label>Username:</label>
            <input className="mdl-textfield__input"  type="text" name="username" value={username} onChange={this.handleChange}/>
            <label>Password:</label>
            <input className="mdl-textfield__input"  type="password" name="password" value={password} onChange={this.handleChange} />
            <label>email:</label>
            <input className="mdl-textfield__input"  type="email" name="email" value={email} onChange={this.handleChange} />

            <div className="mdl-card__supporting-text">
              <p>Already have account?
                <Link to={"/login"}> Login</Link>
              </p>
            </div>
              <div className="mdl-card__actions mdl-card--border">
                  <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-button ">SignUp</button>
              </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Signup
