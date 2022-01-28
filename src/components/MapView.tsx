import { useContext, useLayoutEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';
import { placesContext, mapContext } from '../context';
import { Loading } from './';


export const MapView = () => {

    const { isLoading, userLocation } = useContext(placesContext);
    const { setMap } = useContext(mapContext);
    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new Map({
                container: mapDiv.current!, // container ID
                style: 'mapbox://styles/mapbox/light-v10',
                // style: 'mapbox://styles/mapbox/streets-v11',
                center: userLocation, // starting position [lng, lat]
                zoom: 14
            });
            setMap(map);
        }
    }, [isLoading]);
    

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div
            ref={mapDiv}
            style={{
                height: '100vh',
                left: 0,
                position: 'fixed',
                top: 0,
                width: '100vw',
            }}
        >
            {userLocation?.join(',')}
        </div>
    );
};
