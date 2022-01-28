import axios from 'axios';


const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'en',
        access_token: 'pk.eyJ1IjoibmNvbmRlcyIsImEiOiJja3g0M3doc28wdjdkMm9wbW80NHVtdWtuIn0.f1voweyK7l2-YmgWyjOAgQ'
    }
})


export default searchApi;