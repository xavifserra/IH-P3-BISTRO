import React, { Component } from 'react'

import { withAuth } from '../components/AuthProvider';
import { withDataPlaces } from '../components/PlacesProvider'

import { withStyles } from '@material-ui/core/styles';

import Map from '../components/Map/Map';
import ListPlaces from '../components/ListPlaces/ListPlaces';

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
    if (!this.props.geojson.length>0) this.props.locateMe()
  }

  render() {
    // const { user } = this.props
    const { classes, searchString } = this.props;
    // console.log(this.props);

    return (
     <div>
      <Map/>
      <br/>
      {searchString}
      {
        this.props.geojson.features.map((element) => {
          console.log(element)
          console.log(element.properties.place.includes(searchString))
          console.log(element.properties.place.includes(searchString)|| !searchString ? true : false)
          return(
          <ListPlaces
            data={element}
          />
          )
        })
      }
      <br/>
      </div>
  )}
}

export default withAuth()(withDataPlaces()(withStyles(stylePaper)(Private)));
