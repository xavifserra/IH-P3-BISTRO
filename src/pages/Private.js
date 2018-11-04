import React, { Component } from 'react'

import { withAuth } from '../components/AuthProvider';
import { withDataPlaces } from '../components/PlacesProvider'

import Paper  from '@material-ui/core/Paper';
import Map from '../components/Map/Map';

import ListPlaces from '../components/ListPlaces/ListPlaces';
import { withStyles } from '@material-ui/core/styles';

const stylePaper = theme => ({
  detailContainer: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit,
    // height: "70vh",
    width: "100vw",
    marginLeft: theme.spacing.unit,
    marginRigth: theme.spacing.unit,
    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2,
  },
});

class Private extends Component {
  render() {
    // const { user } = this.props
    const { classes } = this.props;
    console.log(this.props);

    return (
     <div>
      <Map/>
      {/* <p>{this.props.searchString}</p> */}
      {
        this.props.geojson.features.map((element) => {
          const {
            _id:placeId,
            place,
            address,
            category,
            location ,
            numReviews,
            reviews,
            details,
            distance,
            polarity,
            lat,
            lng,
            searchString,
          } = element.properties

          return(
            <Paper key={placeId} className={classes.detailContainer}>
              {/* {console.log(element.properties)}
              {console.log(searchString)} */}
              <div className=''>
                <div>
                  <h3 id='doc-h3'>dist: {distance} km</h3>
                </div>
                <div>
                  <h1 id='doc-h1'>{place}</h1>
                  <h2 id='doc-h2'>{address}</h2>
                  <h4 id='doc-h4'>{reviews}</h4>
                </div>
                <div>
                </div>
                <fieldset>
                  <p>{searchString}</p>
                  <p >{address}</p>
                  <p>{distance}</p>
                <p className='icon trash' />
                </fieldset>
                <fieldset className='hide-mobile'>
                  <label >{category}</label>
                  <label >{location }</label>
                  <label>{numReviews}</label>
                  <label >{reviews}</label>
                  <label >{details}</label>
                  <label >{polarity}</label>
                  <label >{lat}</label>
                  <label >{lng}</label>
                </fieldset>
              </div>
            </Paper>
          )
        })
      }
      </div>
  )}
}

export default withAuth()(withDataPlaces()(withStyles(stylePaper)(Private)));
