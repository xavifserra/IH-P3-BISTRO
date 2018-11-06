import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import withAuth from '../components/AnonRoute';

// import './styles/profile.css'

const style={
  input: {
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
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

const Profile = () => (
  <div>
    <h1>Profile</h1>
    <Formik
      initialValues={{
        name: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        favorites: '',
        comments: '',
        following: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name" style={style.input}/>
          {errors.name && touched.name ? ( <div>{errors.name}</div> ) : null}
          <Field name="lastName" style={style.input}/>
          {errors.lastName && touched.lastName ? ( <div>{errors.lastName}</div> ) : null}
          <Field name="email" type="email" style={style.input}/>
          {errors.email && touched.email ? <div style={style.label}>{errors.email}</div> : null}
          <Field name="languages" type="languages" style={style.input}/>
          <Field name="favorites" type="favorites" style={style.input}/>
          <Field name="comments" type="comments" style={style.input}/>
          <Field name="following" type="followinf" style={style.input}/>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default (Profile)
