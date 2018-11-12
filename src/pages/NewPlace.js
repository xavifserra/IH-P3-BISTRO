import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'


import { withAuth } from '../components/AuthProvider'
import mapServices from '../lib/map-services';

const style={
    container: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerButtons: {
      height: '100%',
      display: 'flex-wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    form: {
      margin: '10px',
      width: '80%',
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
      minWidth:'5rem',
    },
    services: {
      display: 'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidht: '5rem',
    }
}
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  address: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.number()
    .required('Required'),
})

class NewPlace extends Component {
  state={
    name: '',
    address: '',
    lat: 0.0,
    long: 0.0,
  }

  autoFillForm = () => {

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(({coords}) =>{
       const { latitude, longitude } = coords
      console.log({ latitude, longitude });
        mapServices.getAddresInCurrentCoordinates(longitude, latitude)
        .then(data => {
          console.log({data:data[0].place_name})
          this.setState({
            address: data[0].place_name,
            lat: latitude,
            long: longitude,
          })

          this.props.saveNewPlace()
        })
      })
    }
  }

  handlerFields = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })

  }
  render = () => {

    return (
      <div>
        <Formik
          initialValues={{
            name: '',
            address: '',
            lat: 0.0,
            long: 0.0,
            airConditioned:false,
            fidelityCard: false,
            ticketRestaurant: false,
            chequeGourmet: false,
            wifi: false,
            movileCoverage:false,
            pets: false,
            adapted: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values)
          }}
        >
          {
            ({ errors, touched }) => (
              <Form >
                <div style={style.container}>
                  <label style={style.label}> Name</label>
                  <Field value={this.state.name} name="name" style={style.input} onChange={this.handlerFields}/>
                  <div className="material-icons"
                    onClick={this.autoFillForm}>
                    my_location
                  </div>
                </div>
                <div style={style.container}>
                  <label style={style.label}>address</label>
                  <Field value={this.state.address} name="address" type="text" style={style.input} onChange={this.handlerFields}/>
                </div>
                <div style={style.container}>
                  <label style={style.label}>coordinates long</label>
                  <Field value={this.state.long} name="long" type="number"style={style.input} onChange={this.handlerFields}/>
                  {errors.lastName && touched.lastName ? ( <div>{errors.lastName}</div> ) : null}
                  <label style={style.label}> coordinates lat</label>
                  <Field value={this.state.lat} name="lat" type="number" style={style.input} onChange={this.handlerFields}/>
                  {errors.email && touched.email ? <div style={style.label}>{errors.email}</div> : null}
                </div>
              {/* SERVICES */}
                <h5> services</h5>
                <hr />

                <div style={style.container}>
                  <div style={style.services}>
                    <div className="material-icons">ac_unit</div>
                    <Field className="material-icons" name="airConditioned" type="checkbox"/>
                    <label>Air Conditioned</label>
                  </div>
                  <div  style={style.services}>
                    <div className="material-icons">card_giftcard</div>
                    <Field className="material-icons" name="fidelityCard" type="checkbox"/>
                    <label>Fidelity Card</label>
                  </div>
                  <div  style={style.services}>
                    <div className="material-icons">credit_card</div>
                    <Field className="material-icons" name="ticketRestaurant" type="checkbox" style={style.input}/>
                    <label>Ticket Restaurant</label>
                  </div>
                  <div  style={style.services}>
                    <div className="material-icons">card_membership</div>
                    <Field className="material-icons" name="chequeGourmet" type="checkbox" style={style.input}/>
                    <label>Cheque Gourmet</label>
                  </div>
                  <div  style={style.services}>
                    <div className="material-icons">accessible</div>
                    <Field className="material-icons" name="address" type="checkbox" style={style.input}/>
                    <label>accessible</label>
                  </div>
                  <div  style={style.services}>
                    <div className="material-icons">wifi</div>
                    <Field className="material-icons" name="wifi" type="checkbox" style={style.input}/>
                    <label> wifi</label>
                  </div>
                  <div  style={style.services}>
                    <div className="material-icons">signal_cellular_alt</div>
                    <Field className="material-icons" name="address" type="checkbox" style={style.input}/>
                    <label>movile Coverage</label>
                  </div>
                  <div  style={style.services}>
                    <div className="material-icons">pets</div>
                    <Field className="material-icons" name="address" type="checkbox" style={style.input}/>
                    <label>pet frienly</label>
                  </div>
                </div>

                <br/>

                <center>
                  <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">Submit</button>
                </center>
              </Form>
            )
          }
        </Formik>
      </div>
    )
  }
}

export default withAuth()(NewPlace)
