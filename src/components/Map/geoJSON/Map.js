import React, { PureComponent } from 'react';
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer, Popup } from "react-mapbox-gl";

// import { Link } from 'react-router-dom';
import { withAuth } from '../AuthProvider';
import { withDataPlaces } from '../PlacesProvider';

import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  accessToken: process.env.REACT_APP_MAPBOX_API,// 'pk.eyJ1IjoieGF2aWZzIiwiYSI6ImNqa2ExZGpqdDIyMmwza3FsMWN6ODRkNGIifQ.NAa3sEP45u118hQ4btsCEw',
  //minZoom: 15,
  //maxZoom: 17,
  scrollWheelZoom: false,
  dragRotate: false,
  doubleClickZoom: false,
  showCollisionBoxes: true,
  onClick : (map, e) => this.onMapClick(map,e)
})

class Map extends PureComponent {

  constructor(props) {
    super(props);
    const {lng, lat} = this.props
    this.state = {
      center: [lng, lat],
      zoom: [17],
      // geojson: geojson,
    };
  }

  onMapClick (map, evt) {
    console.log(evt.lngLat);
  }

  handleOnClickMap (e) {
    console.log(e.Layer);
  }

  handleOnClickElement(e){
    console.log(e);
    const { lat, lng } = e.lngLat
    console.log(lat,lng);
   return (
    <Popup
      coordinates={[lng,lat]}
      offset={{
        'bottom-left': [12, -38],
        'bottom': [0, -38],
        'bottom-right': [-12, -38]
      }}>
      <h1>Popup</h1>
    </Popup>
    )
  }

  render() {
    const { zoom, center } = this.state;
    const { classes, lat, lng, geojson } = this.props;
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
        >
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
            symbolOnClick = { this.handleOnClickElement }
            symbolLayout={{
              "icon-image": "restaurant-15",
              "icon-size": 1,
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

export default withAuth()(withDataPlaces()(withStyles(stylePaper)(Map)));
