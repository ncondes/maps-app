import axios from 'axios';


const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoibmNvbmRlcyIsImEiOiJja3g0M3doc28wdjdkMm9wbW80NHVtdWtuIn0.f1voweyK7l2-YmgWyjOAgQ',
    }
})


export default directionsApi;