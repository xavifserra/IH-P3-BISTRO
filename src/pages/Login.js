import React, { Component } from 'react';
import auth from '../lib/auth-service';

import { Link } from 'react-router-dom';
// import { AuthConsumer } from '../components/AuthProvider';
import Container from 'muicss/lib/react/container';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel';


import './access.css'

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
    //const { classes } = props;

    return (
      <Container id="main-container" fluid={true}>
      <Row>
        <Col md="3"/>
        <Col md="6">
          <Panel>
            <center><div className="mui--text-headline">BISTRO</div></center>
            <center><div className="mui--text-title">LogIn</div></center>
          </Panel>
          <Form id="form-group" onSubmit={this.handleFormSubmit}>
            <label>Username:</label>
            <Input type="text" name="username" value={username} onChange={this.handleChange}/>
            <label>Password:</label>
            <Input type="password" name="password" value={password} onChange={this.handleChange} />
            <center>
              <Button id="buttons" variant="raised" color="primary">LogIn</Button>
            </center>
          </Form>
          <center>
            <p>Already have account?
              <Link to={"/signup"}> SignUp</Link>
            </p>
          </center>
        </Col>
        <Col md="3"/>
        </Row>
      </Container>
    )
  }
}

export default Login;
