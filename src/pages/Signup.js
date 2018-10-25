import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';

import Container from 'muicss/lib/react/container';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel';


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
      <Container id="main-container" fluid={true}>
      <Row>
        <Col md="3"/>
        <Col md="6">
          <Panel>
            <center><div className="mui--text-headline">BISTRO</div></center>
            <center><div className="mui--text-title">New user</div></center>
          </Panel>
          <Form color="form-group" onSubmit={this.handleFormSubmit}>
            <label>Username:</label>
            <Input type="text" name="username" value={username} onChange={this.handleChange}/>
            <label>Password:</label>
            <Input type="password" name="password" value={password} onChange={this.handleChange} />
            <label>email:</label>
            <Input type="email" name="email" value={email} onChange={this.handleChange} />
            <center>
              <Button id="buttons" variant="raised" color="primary">SignUp</Button>
            </center>
          </Form>
          <center>
            <p>Already have account?
              <Link to={"/login"}> Login</Link>
            </p>
          </center>
          </Col>
        <Col md="3"/>
        </Row>

      </Container>
    )
  }
}

export default Signup;
