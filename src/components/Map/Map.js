import React, { PureComponent } from 'react';
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';

// import { Link } from 'react-router-dom';
import { withAuth } from '../AuthProvider';
import { withDataPlaces } from '../PlacesProvider';
// import { Form } from 'muicss/lib/react/form';

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
  // minZoom: 15,
  // maxZoom: 16,
  scrollWheelZoom: false,
  dragRotate: false,
})

class Map extends PureComponent {

  constructor(props) {
    super(props);
    const {lng, lat} = this.props
    this.state = {
      center: [lng, lat],
      zoom: [15],
      // geojson: geojson,
    };
  }
 componentDidMount(){
    //this.props.locateMe()
 }

  render() {
    const { zoom, center } = this.state;
    // const { isLogged, user, logout } = this.props;
    // const { username } = user;
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
            "text-anchor":"top-left",
            "text-field": "you" }}>
          <Feature coordinates={[lng, lat]}/>
        </Layer>
        <GeoJSONLayer
          data={ geojson }
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

export default withAuth()(withDataPlaces()(withStyles(stylePaper)(Map)));
