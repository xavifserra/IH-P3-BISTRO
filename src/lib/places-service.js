import axios from 'axios';
class Places {
  constructor() {
    this.places = axios.create({
      baseURL: process.env.NODE_ENV ==='development'
                ? process.env.REACT_APP_DEV_URI
                : process.env.REACT_APP_PROD_URI,
      withCredentials: true
    })
  }

  getAroundGeoJSON(lat, lng, dist) {
    return this.places.get(`/api/v1/places/aroundGeoJSON?lat=${lat}&lng=${lng}&dist=${dist}`)
    .then(response => response)
  }

}

const places = new Places()

export default places
