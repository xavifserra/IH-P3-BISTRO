import React, { Component, PureComponent } from 'react';
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";
import Paper from '@material-ui/core/Paper'

import { Link } from 'react-router-dom';
import { withAuth } from '../AuthProvider';

import { withStyles } from '@material-ui/core/styles';

import places from '../../lib/places-service'
import { Form } from 'muicss/lib/react/form';


console.log(geojson);

const stylePaper = theme => ({
  mapContainer: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit,
    height: "70vh",
    width: "100vw",
    //marginLeft: theme.spacing.unit,
    //marginRigth: theme.spacing.unit,
    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2,
  },
});

const MapReact = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoieGF2aWZzIiwiYSI6ImNqa2ExZGpqdDIyMmwza3FsMWN6ODRkNGIifQ.NAa3sEP45u118hQ4btsCEw',
  // minZoom: 15,
  // maxZoom: 16,
  dragRotate: false,
})

class Map extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      lng: 2.189978,
      lat: 41.397779,
      center: [0, 0],
      zoom: [15],
      geojson: undefined,
    };
  }

  componentWillMount(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
          center: [position.coords.longitude,
                  position.coords.latitude],
        })
      })
      // places.getAroundGeoJSON(this.lat, this.lng, 1000 )
      // .then(result => this.geojson=result)
    }
  }

  render() {
    const { lng, lat, zoom, center } = this.state;
    // const { isLogged, user, logout } = this.props;
    // const { username } = user;
    const { classes } = this.props;
    return (
      <Paper className={classes.mapContainer}>
        <MapReact
          style = "mapbox://styles/mapbox/streets-v8"
          center={center}
          zoom={zoom}
          movingMethod="jumpTo"
          containerStyle = {{
            height: "100%",
            width: "100%",
          }}
        >
        <Layer
          type="symbol"
          id="marker"
          layout={{
            "icon-size": 1,
            "icon-image": "marker-15",
            "text-anchor":"top-left",
            "text-field": "you" }}>
          <Feature coordinates={[lng, lat]}/>
        </Layer>
        <GeoJSONLayer
          data={this.geojson}
          symbolLayout={{
            "icon-image": "restaurant-15",
            "icon-size": 1,
            // "marker-color": "#944944" ,
            "text-field": "{place}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
          }}/>
      </MapReact>
      </Paper>
    );
  }
};

export default withAuth()(withStyles(stylePaper)(Map));
