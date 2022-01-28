import { useContext, useEffect, useReducer } from 'react';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { mapContext } from './mapContext';
import { mapReducer } from './mapReducer';
import { placesContext } from '../';
import directionsApi from '../../apis/directionsApi';
import { DirectionsResponse } from '../../interfaces/directions';


export interface MapState {
    isMapReady: boolean,
    map?: Map,
    markers: Marker[],
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
}

interface Props {
    children: JSX.Element | JSX.Element[],
}

export const MapProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const { places } = useContext(placesContext);

    useEffect(() => {
        state.markers.forEach((marker) => marker.remove());
        const newMarkers: Marker[] = [];

        if (!state.map) return;

        for (const place of places) {
            const [lng, lat] = place.center;
            const popup = new Popup()
                .setHTML(`
                    <h6>${ place.text_en }</h6>
                    <p>${ place.place_name_en }</p>
                `)
            const newMaker = new Marker()
                .setPopup(popup)
                .setLngLat([lng, lat])
                .addTo(state.map);
            newMarkers.push(newMaker);
        }
        // TODO: Limpiar poyline
        dispatch({ type: 'setMarkers', payload: newMarkers })
    }, [places]);
    

    const setMap = (map: Map) => {
        const myLocationPopup = new Popup()
            .setHTML(`
                <h4>Here I am</h4>
                <p>In somewhere around the world</p>
            `)
        new Marker({
            color: '#61DAFB'
        })
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopup)
            .addTo(map)
            
        dispatch({ type: 'setMap', payload: map })
    }

    const getRouteBetweenPoints = async(start: [number, number], end: [number, number]) => {
        const resp = await directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`);
        const { distance, duration, geometry } = resp.data.routes[0];
        const { coordinates } = geometry;
        const kms = Math.round((distance/1000) * 100)/100;
        const minutes = Math.floor(duration/60);
        // TODO: 
        console.log({
            'distance( km )': kms,
            'duration( min )': minutes,
        });

        const bounds = new LngLatBounds(
            start,
            start
        )

        for (const coord of coordinates) {
            const newCoord: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCoord);
        }

        state.map?.fitBounds(bounds, {
            padding: 200
        })

        // polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates
                        }
                    }
                ]
            },
        }

        if (state.map?.getLayer('RouteString')) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData);
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        })
    }

    return (
        <mapContext.Provider value={{
            ...state,
            // Methods
            setMap,
            getRouteBetweenPoints,
        }}>
            { children }
        </mapContext.Provider>
    );
};
