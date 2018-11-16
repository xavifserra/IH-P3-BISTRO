import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'


import { withAuth } from '../components/AuthProvider'
import mapServices from '../lib/map-services';
import { Redirect } from 'react-router-dom';

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
      // maxWidht: '5rem',
      minWidth: '12%',
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
  // number: Yup.number()
  //   .required('Required'),
})

class NewPlace extends Component {
  state={
    name: '',
    address: '',
    lat: 0.0,
    lng: 0.0,
    services:{
      airConditioned: false,
      fidelityCard: false,
      ticketRestaurant: false,
      chequeGourmet: false,
      wifi: false,
      movileCoverage: false,
      pets: false,
      adapted: false,
    },
  }

  componentDidMount=()=>{
    // console.log(this.props.actualPlace);
    if (this.props.editPlace){
      if(this.props.actualPlace){
        const {
          name,
          address,
          lat,
          lng,
          services
        } = this.props.actualPlace
        console.log(name, address, lat, lng);
          this.setState({editPlace:true})
          // console.log('Props',this.props.actualPlace)
         if (services) {const {
            airConditioned,
            fidelityCard,
            ticketRestaurant,
            chequeGourmet,
            wifi,
            movileCoverage,
            pets,
            adapted,
            } = services

            this.setState({services:{
              airConditioned:airConditioned,
              fidelityCard:fidelityCard,
              ticketRestaurant:ticketRestaurant,
              chequeGourmet:chequeGourmet,
              wifi:wifi,
              movileCoverage:movileCoverage,
              pets:pets,
              adapted:adapted,
              }
            })
          }
          this.setState({
            name: name,
            address: address,
            lat: lat,
            lng: lng,
          })
      }
    }
  }

  autoFillForm = () => {

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(({coords}) =>{
       const { latitude, longitude } = coords
        mapServices.getAddresInCurrentCoordinates(longitude, latitude)
        .then(data => {
          this.setState({
            address: data[0].place_name,
            lat: latitude,
            lng: longitude,
          })

          // this.props.saveNewPlace()
        })
      })
    }
  }

  submitForm = (values, actions) => {
    // e.preventDefault()
    // console.log(values, actions)
    // console.log(this.state);
    !this.props.editionMode
    ?this.props.saveNewPlace(this.state)
    :this.props.editPlace(this.props.id,this.state)
  }

  handlerFields = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render = () => {
    // console.log('state:', this.state);
    return (

        <Formik
          onSubmit={this.submitForm}
        >
          {
            ({ errors, touched }) => (
              <Form >
                <div style={style.container}>
                  <label style={style.label}> Name</label>
                  <Field value={this.state.name}
                        name="name" style={style.input}
                        onChange={this.handlerFields}
                        />
                  <div className="material-icons"
                    onClick={this.autoFillForm}>
                    my_location
                  </div>
                </div>
                <div style={style.container}>
                  <label style={style.label}>address</label>
                  <Field value={this.state.address}
                    name="address" type="text" style={style.input}
                    onChange={this.handlerFields}/>
                </div>
                <div style={style.container}>
                  <p style={style.label}>coordinates long</p>
                  <Field value={this.state.lng} name="lng" type="text"style={style.input} onChange={this.handlerFields}/>
                  {errors.lastName && touched.lastName ? ( <div>{errors.lastName}</div> ) : null}
                  <label style={style.label}> coordinates lat</label>
                  <Field value={this.state.lat} name="lat" type="text" style={style.input} onChange={this.handlerFields}/>
                  {errors.email && touched.email ? <div style={style.label}>{errors.email}</div> : null}
                </div>
              {/* SERVICES */}
                <h5> services</h5>
                <hr />
                <div style={style.container}>
                  <div style={style.services}>
                    <div className="material-icons">ac_unit</div>
                    <Field value={this.state.services.airConditioned} className="material-icons" name="airConditioned" type="checkbox"/>
                    {/* <centerd>Air Conditioned</centerd> */}
                  </div>
                  <div style={style.services}>
                    <div className="material-icons">card_giftcard</div>
                    <Field value={this.state.services.fidelityCard} className="material-icons" name="fidelityCard" type="checkbox"/>
                    {/* <centered>Fidelity Card</centered> */}
                  </div>
                  <div  style={style.services}>
                    <div className="material-icons">credit_card</div>
                    <Field value={this.state.services.ticketRestaurant} className="material-icons" name="ticketRestaurant" type="checkbox" />
                    {/* <centered>Ticket Restaurant</centered> */}
                  </div>
                  <div  style={style.services}>
                    <div className="material-icons">card_membership</div>
                    <Field value={this.state.services.chequeGourmet} className="material-icons" name="chequeGourmet" type="checkbox" />
                    {/* <centered>Cheque Gourmet</centered> */}
                  </div>
                  <div  style={style.services}>
                    <div className="material-icons">accessible</div>
                    <Field value={this.state.services.adapted} className="material-icons" name="address" type="checkbox" />
                    {/* <label>accessible</label> */}
                  </div>
                  <div  style={style.services}>
                    <div className="material-icons">wifi</div>
                    <Field value={this.state.services.wifi} className="material-icons" name="wifi" type="checkbox"/>
                    {/* <label> wifi</label> */}
                  </div>
                  <div  style={style.services}>
                    <div className="material-icons">signal_cellular_alt</div>
                    <Field value={this.state.services.movileCoverage} className="material-icons" name="address" type="checkbox" />
                    {/* <label>movile Coverage</label> */}
                  </div>
                  <div  style={style.services}>
                    <div className="material-icons">pets</div>
                    <Field value={this.state.services.pets} className="material-icons" name="address" type="checkbox" />
                    {/* <label>pet frienly</label> */}
                  </div>
                </div>

                <br/>

                <center>
                  <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                          type="submit"
                          onClick={this.submitForm}>Submit</button>
                </center>
              </Form>
            )
          }
        </Formik>

    )
  }
}

export default withAuth()(NewPlace)
