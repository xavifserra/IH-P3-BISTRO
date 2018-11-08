import React, { Component } from 'react'

import { withAuth } from '../components/AuthProvider';
import { withDataPlaces } from '../components/PlacesProvider'

import { withStyles } from '@material-ui/core/styles';

import Map from '../components/Map/Map';
import ListPlaces from '../components/ListPlaces/ListPlaces';
import { div } from 'gl-matrix/src/gl-matrix/vec4';

const stylePaper = theme => ({
  detailContainer: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit,
    // height: "70vh",
    width: "92vw",
    marginLeft: theme.spacing.unit,
    marginRigth: theme.spacing.unit,
    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2,
  },
});


class Private extends Component {

  componentWillReceiveProps(){
    if (this.props.geojson.length<0) this.props.locateMe()
  }

  render() {
    // const { user } = this.props
    const { classes, searchString } = this.props;
    console.log(classes);

    return (
     <div>
      <Map/>
      <br/>
      <div>
      {/* {searchString} */}
      </div>
      {
        this.props.geojson.features.map((element) => {
          const {_id} = element.properties
          console.log(element)
          console.log(_id)
          if (element.properties.place.includes(searchString))
            return(
            <ListPlaces key={_id} data={element} />
            )
        })
      }
      <br/>
      </div>
  )}
}

export default withAuth()(withDataPlaces()(withStyles(stylePaper)(Private)));
