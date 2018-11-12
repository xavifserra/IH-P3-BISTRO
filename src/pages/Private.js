import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import { withAuth } from '../components/AuthProvider'

import Map from '../components/Map/Map'
import ListPlaces from '../components/ListPlaces/ListPlaces'

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
})


class Private extends Component {

  componentDidMount(){
    if (this.props.geojson.length<0) this.props.locateMe()
  }

  render() {
    const { user, searchString, geojson, userFavorite } = this.props
    const { features } = geojson
    console.log(user)

    return (
     <div>
      <Map/>
      <br/>
      {
        // eslint-disable-next-line array-callback-return
        features.map((element) => {
          const {_id, services, place} = element.properties
          if (place.includes(searchString)){ // .toLowerCase()
            // console.log(_id, user.favorites.some(e => {
            //   console.log(e,"<=>",_id);
            //   return e===_id}))

            return(
            <ListPlaces
              key={_id}
              place={element.properties}
              user={user}
              userFavorite={userFavorite}
              services={services}
            />
            )}
        })
      }
      <br/>
    </div>
  )}
}

export default withAuth()(withStyles(stylePaper)(Private))
