import axios from 'axios';
import auth from '../lib/auth-service';

class Places {
  constructor() {
    console.log(process.env.REACT_APP_BASE_URI);
    this.places = axios.create({
      // baseURL: process.env.NODE_ENV ==='development'
      //           ? process.env.REACT_APP_DEV_URI
      //           : process.env.REACT_APP_PRODUCTION_URI,
      baseURL: process.env.REACT_APP_BASE_URI, //AUTO USE .env.develoment or env.production
      withCredentials: true
    })
  }

   getAroundGeoJSON(lat, lng, dist) {
    return this.places.get(`/api/v1/places/aroundGeoJSON?lat=${lat}&lng=${lng}&dist=${dist}`)
    .then(({ data }) => {
      // console.log({ lat, lng, dist ,data });
      return data
    })
  }

  putFavorite(userId, placeId) {
    alert('put', userId, placeId)
    return this.places.put(`/api/v1/me/favorite/${placeId}`)
    .then(({ data }) => {
      // console.log({ lat, lng, dist ,data });
      return data
    })
  }

  removeFavorite(userId, placeId) {
    alert('remove', userId, placeId)
    return this.places.delete(`/api/v1/me/favorite/${placeId}`)
    .then(({ data }) => {
      auth.me(userId)
      // console.log({ lat, lng, dist ,data });
      return data
    })
  }

}

const places = new Places()

export default places
