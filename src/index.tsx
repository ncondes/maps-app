import React from 'react';
import ReactDOM from 'react-dom';
import { MapsApp } from './MapsApp';
import mapboxgl from 'mapbox-gl';
 

mapboxgl.accessToken = 'pk.eyJ1IjoibmNvbmRlcyIsImEiOiJja3g0M3doc28wdjdkMm9wbW80NHVtdWtuIn0.f1voweyK7l2-YmgWyjOAgQ';

if (!navigator.geolocation) {
    alert('Your Browser has not acess to the geolocation');
    throw new Error('Your Browser has not acess to the geolocation');
}

ReactDOM.render(
    <React.StrictMode>
        <MapsApp />
    </React.StrictMode>,
    document.getElementById('root')
);
