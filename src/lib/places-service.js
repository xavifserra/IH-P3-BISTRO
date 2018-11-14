import axios from 'axios';

class Places {
  constructor() {
    // console.log(process.env.REACT_APP_BASE_URI);
    this.places = axios.create({
      // baseURL: process.env.NODE_ENV ==='development'
      //           ? process.env.REACT_APP_DEV_URI
      //           : process.env.REACT_APP_PRODUCTION_URI,
      baseURL: process.env.REACT_APP_BASE_URI, //AUTO USE .env.develoment or env.production
      withCredentials: true
    })
  }

  getAroundGeoJSON = (lat, lng, dist) => {
    return this.places.get(`/api/v1/places/aroundGeoJSON?lat=${lat}&lng=${lng}&dist=${dist}`)
    .then(({ data }) => {
      return data
    })
  }

  putFavorite = (placeId) => {
    // alert('put', userId, placeId)
    return this.places.put(`/api/v1/me/favorite/${placeId}`)
    .then(( {data} ) => {
      // console.log('put fav:', data );
      return data
    })
  }

  removeFavorite = (placeId) => {
    // alert('remove', userId, placeId)
    return this.places.delete(`/api/v1/me/favorite/${placeId}`)
    .then(({ data }) => {
      // console.log('delete fav:',{ data });
      return data
    })
  }

  removePlace = (placeId) => {
    return this.places.delete(`/api/v1/places/${placeId}`)
    .then(({ data }) => {
      // console.log('delete place:',{ data });
      return data
    })
  }
}

const places = new Places()

export default places
