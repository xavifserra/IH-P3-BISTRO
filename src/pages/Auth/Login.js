import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import auth from '../../lib/auth-service';
import "./auth.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm = event => {
    this.state.username.length > 0 && this.state.password.length > 0
  }


  handleChange = event => {
    const {id, value} = event.target
    // console.log(id)
    // console.log([id])
    this.setState({ [id]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state

    auth.login({ username, password })
    .then( (user) => {
      this.props.setUser(user)
    })
    .catch( error => console.log(error) )
  }

  render() {
    return (
      <Component className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>User Name</ControlLabel>
            <FormControl
              autoFocus
              type="syring"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Component>
    );
  }
}
