// import mbxGeocodin from '@mapbox/mapbox-sdk/services/geocoding'

import axios from 'axios'

class MapServices {
  constructor() {
    // console.log(process.env.REACT_APP_BASE_URI);
    this.mapServices = axios.create({
      baseURL: 'http://api.mapbox.com/geocoding/v5/mapbox.places',
      timeout: 1000,
      withCredentials: false,
      headers:
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'api.mapbox.com',
        'cache-control': 'no-cache',
      },
    })
  }

  getAddresInCurrentCoordinates = (longitude, latitude) => { //not use axios connect
    const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
    const geocodingClient = mbxGeocoding({
      accessToken: process.env.REACT_APP_MAPBOX_API,
    })

    return geocodingClient
        .reverseGeocode({
          query: [longitude, latitude],
          limit: 1,
          language:['es','en'],
        })
        .send()
        .then((response) => {
          const {features} = response.body
          console.log({features});
          return features;
        })
      }
    }
    
const mapServices = new MapServices()
export default mapServices

//https://api.mapbox.com/geocoding/v5/mapbox.places/
// 2.189978,41.397779.json
// ?access_token=pk.eyJ1IjoieGF2aWZzIiwiYSI6ImNqa2ExZGpqdDIyMmwza3FsMWN6ODRkNGIifQ.NAa3sEP45u118hQ4btsCEw
// &autocomplete=true
// return axios.get(`/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_API}&autocomplete=true`)
// .then(response => {
//   const match = response.body;
//   console.log(match);
//   return match
// })
// .catch(e=>console.log({e}))
