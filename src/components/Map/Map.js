import React, { PureComponent } from 'react'
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer, ScaleControl } from "react-mapbox-gl"

import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

// import { Link } from 'react-router-dom'
import { withAuth } from '../AuthProvider'
import ModalForm from '../Modal/ModalForm'
import NewPlace from '../../pages/NewPlace'

// import 'mapbox-gl/dist/mapbox-gl.css'
// import './map.css'

const stylePaper = theme => ({
  mapContainer: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit,
    height: "70vh",
    width: "93vw",
    // marginLeft: theme.spacing.unit,
    // marginRigth: theme.spacing.unit,
    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2,
  },
})

const MapReact = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API,// 'pk.eyJ1IjoieGF2aWZzIiwiYSI6ImNqa2ExZGpqdDIyMmwza3FsMWN6ODRkNGIifQ.NAa3sEP45u118hQ4btsCEw',
  //minZoom: 15,
  //maxZoom: 17,
  scrollWheelZoom: false,
  dragRotate: false,
})

class Map extends PureComponent {

  constructor(props) {
    super(props)
    const {lng, lat} = this.props
    this.state = {
      center: [lng, lat],
      zoom: [17],
      // geojson: geojson,
    }
  }

  onMapClick(map, e) {
    // console.log(e)
    // console.log(e.point)
    // console.log(e.lngLat)
    const features = map.queryRenderedFeatures(e.point)
    // console.log(features)
    const xCoordinate = e.lngLat.lng
    const yCoordinate = e.lngLat.lat
    const data = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [yCoordinate, xCoordinate]
        },
        properties: {
          title: features[0].properties.name,
          description: features[0].properties.maki
        }
      }]
    }
    this.setState({geoJson: data})
  }

  render() {
    const { zoom, center } = this.state
    const { classes, lat, lng, geojson } = this.props
    return (
      <Paper className={classes.mapContainer}>
        <MapReact
        // eslint-disable-next-line
        style = "mapbox://styles/mapbox/streets-v8"
        center={center}
        zoom={zoom}
        showUserLocation={true}
        movingMethod="jumpTo"
        containerStyle = {{
          height: "100%",
          width: "100%",
        }}
        showCollisionBoxes= {true}
        onClick={(map, e) => this.onMapClick(map,e)}
        >
          <ScaleControl/>
          <Layer
            type="symbol"
            id="marker"
            layout={{
              "icon-size": 1,
              "icon-image": "marker-15",
              "text-anchor":"top",
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 0.6],
              "text-field": "you" }}>
              <Feature coordinates={[lng, lat]}/>
            </Layer>
            <GeoJSONLayer
              data={ geojson }
              symbolOnClick= {this.handleOnclick}
              symbolLayout={{
                "icon-image": "restaurant-15",
                "icon-size": 1,
                "text-field": "{place}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top"
              }}/>
            <ModalForm
              title= 'new place'
              classButtonShow="material-icons mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
              textButtonShow="add"
              styleButtonShow = {{
                margin:"5px",
                position:"relative",
                float:"right"
              }}
            >
              <NewPlace/>
            </ModalForm>
          </MapReact>
      </Paper>
    )
  }
}

export default withAuth()(withStyles(stylePaper)(Map))
