import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Formik, Form, Field, Label } from 'formik'
// import * as Yup from 'yup'
import { withAuth } from '../components/AuthProvider';
import ListPlaces from '../components/ListPlaces/ListPlaces';

 class Favorites extends Component {

   render() {
    const { user, geojson, userFavorite, searchString } = this.props
    const  { favorites } = user// geojson
    // console.log(favorites);
    return (
      <div>
        <center><h2>Favorites</h2></center>
        {
        // eslint-disable-next-line array-callback-return
        favorites.map((element) => {
          const { _id, services } = element
          // console.log({element} );
          // console.log( _id, services );
          if (element.name.includes(searchString)){
            return(
            <ListPlaces
              key={_id}
              placeId={_id}
              place={element}
              user={user}
              userFavorite={userFavorite}
              services={services}
            />
            )}
          }
        )
      }

       <Link className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" to="/private">back</Link>
        {/* </Form> */}
      </div>
    );
  }
}

export default withAuth()(Favorites);
