import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../lib/auth-service';
import "./auth.css";

class Signup extends Component {

  state = {
    username: "",
    password: "",
    email: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;

    auth.signup({ username, password, email })
      .then( (user) => {
        this.setState({
            username: "",
            password: "",
            email:"",
        });
        this.props.setUser(user)
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, email } = this.state;
    return (
      <Component className='Signup'>
        <form onSubmit={this.handleFormSubmit}>

          <Label>Username:</Label>
          <Input type="text" name="username" value={username} onChange={this.handleChange}/>

          <Label>Password:</Label>
          <Input type="password" name="password" value={password} onChange={this.handleChange} />

          <Label>email:</Label>
          <Input type="email" name="email" value={email} onChange={this.handleChange} />

          <Input type="submit" value="Signup" />
        </form>

        <p>Already have account?
          <Link to={"/login"}> Login</Link>
        </p>

      </Component>
    )
  }
}

export default Signup;
