import React, { Component }  from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { withAuth } from '../components/AuthProvider'

const style={
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  containerButtons: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  form: {
    margin: '10px',
    width: '80%',
    height: '50%',
  },
  input: {
    margin: '5px',
    padding: '.5rem',
    fontSize: '16px',
    width: '100%',
    display: 'block',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  label: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '.5rem',
  }
}

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
})

class Profile extends Component {

  // eslint-disable-next-line no-restricted-globals
  confirmDelete = () => confirm("DELETE USER\n are you sure?") ? this.props.userDeleteProfile() : null

  render() {

    const {
      name,
      lastname,
      username,
      password,
      email,
    } = this.props.user

    return (
      <div>
        <center>
          <h4>Profile user: <span>{username}</span> </h4>
        </center>
        <Formik
          initialValues={{
            name: name,
            lastname: lastname,
            username: username,
            password: password,
            email: email,
          }}

          validationSchema={SignupSchema}

          onSubmit={(values) => {
            // same shape as initial values
            console.log('sended:',values)
            this.props.userSaveProfile(values)
            return <Redirect to={'/private'}/>
          }}
        >
          {({ errors, touched }) => (
            <div style={style.container}>
              <Form style={style.form}>
                <label>Name</label>
                <Field name="name" style={style.input}/>
                <label>Lastname</label>
                <Field name="lastname" style={style.input}/>
                <label>User Name</label>
                <Field name="username" style={style.input}/>
                <label>email</label>
                <Field name="email" type="email" style={style.input}/>
                { errors.email && touched.email ? <div style={style.label}>{errors.email}</div> : null }
                <label>Password</label>
                <Field name="password" type="password" style={style.input}/>

                <br/>
                <div style={style.containerButtons}>
                  <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                    type="submit">Submit</button>
                  <Link
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                    to="/private">Back
                  </Link>
                  <div
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mdl-button--icon"
                    onClick={this.confirmDelete}>
                    <i className="material-icons">delete</i>"
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    )
  }
}

export default withAuth()(Profile)
