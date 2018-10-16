import React, { Component } from 'react';
import auth from '../../lib/auth-service';

// import { AuthConsumer } from '../components/AuthProvider';

class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    auth.login({ username, password })
    .then( (user) => {
      this.props.setUser(user)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
     <div className="container col-md-6 grid-md" id="inbox">
      <form className="form " onSubmit={this.handleFormSubmit}>

        <div className="form-group">
           <label className="form-label">Username:</label>
           <input className="form-input"type="text" name="username" value={username} onChange={this.handleChange}/>
         </div>
        <div className="form-group">
           <label className="form-label">Password:</label>
           <input className="form-input"type="password" name="password" value={password} onChange={this.handleChange} />
         </div>
        <div className="form-group">
           <input className="btn btn-primary input-group-btn form-button" type="submit" value="Login" />
         </div>
        </form>
       </div>
    )
  }
}

export default Login;
