import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import { withDataPlaces } from '../components/PlacesProvider'
import Map from '../components/Map/Map';
// import ListPlaces from '../components/ListPlaces/ListPlaces';
import Paper  from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const stylePaper = theme => ({
  detailContainer: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit,
    // height: "70vh",
    width: "100vw",
    //marginLeft: theme.spacing.unit,
    //marginRigth: theme.spacing.unit,
    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2,
  },
});

class Private extends Component {
  render() {
    // const { user } = this.props
    const { classes } = this.props;
    // const {
    // _id: placeId,
    //  id,
    //  place,
    //  address,
    //  category,
    //  location ,
    //  numReviews,
    //  reviews,
    //  details,
    //  polarity,
    //  lat,
    //  lng } = this.props.geojson

     console.log(this.props);

    return (
     <div>
      {/* <div class='col12 pad4 contain fill-navy dark clip'>
        <div class='center quiet'>
         Map Canvas

        </div>
        <div class='pin-right pad2'>
          <a href='#places' class='button fill-darkblue'>Detail</a>
        </div>
        {/*<  div id='places' class='col4 pad2 fill-darken1 pin-left offcanvas-left animate'>
          <a href='#' class='fill-darken2 pad1 icon close'></a>

            <div class='col10 margin1 keyline-all round space-bottom'>
              <div class='pad1y pad2x keyline-bottom'>Explore the ship</div>
              <div class='pad1y pad2x keyline-bottom'>Eat my gross space lunch</div>
              <div class='pad1y pad2x keyline-bottom'>Play gravity ball</div>
              <div class='pad1y pad2x keyline-bottom'>Send out a space prank to friends</div>
              <div class='pad1y pad2x'>Finsh this todo list</div>
            </div>

            <fieldset class='margin3 col6 pill clearfix'>
              <input type='text' class='col8' placeholder='List item name'/>
              <a href='#' class='button col4 icon plus submit'>Add item</a>
            </fieldset>
        </>
      </div> */}


      <Map/>
      {
        this.props.geojson.features.map((element) => {
          const {
            _id:placeId,
            id,
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
          } = element.properties

          return(
            <Paper key={placeId} className={classes.detailContainer}>
            {console.log(element.properties)}
            <fieldset>
              <label>Name</label>
              <input type='text' value={place} />
            </fieldset>
            {distance}
            {address}
            {category}
            {location }
            {numReviews}
            {reviews}
            {details}
            {polarity}
            {lat}
            {lng}
              <li> {this.props.key}</li>
          </Paper>
        )
      })
      }
    </div>
  )}
}

export default withAuth()(withDataPlaces()(withStyles(stylePaper)(Private)));
