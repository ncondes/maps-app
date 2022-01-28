import { useContext, useState } from 'react';
import { LoadingPlaces } from '.';
import { placesContext, mapContext } from '../context';
import { Feature } from '../interfaces/places';


export const SearchResults = () => {

    const { places, isLoadingPlaces, userLocation } = useContext(placesContext);
    const { map, getRouteBetweenPoints }  = useContext(mapContext);

    const [activePlaceId, setActivePlaceId] = useState('');

    const onPlaceClicked = (place: Feature) => {
        const [lng, lat] = place.center;
        setActivePlaceId(place.id);
        map?.flyTo({
            zoom: 14,
            center: [lng, lat],
        })
    }

    const getRoute = (place: Feature) => {
        if (!userLocation) return;
        const [lng, lat] = place.center;
        getRouteBetweenPoints(userLocation, [lng, lat]);
    }

    if (isLoadingPlaces) {
        return (
            <LoadingPlaces />
        );
    }

    if (places.length === 0) {
        return <></>;
    }

    return (
        <ul className="list-group">
            {
                places.map((place) => (
                    <li
                        className={`${ activePlaceId === place.id && 'active' } list-group-item list-group-item-action pointer`}
                        key={ place.id }
                        onClick={ () => onPlaceClicked(place) }
                    >
                        <h6>{ place.text_en }</h6>
                        <p
                            className={`${ activePlaceId !== place.id && 'text-muted' }`}
                            style={{
                                fontSize: '12px'
                            }}
                        >{ place.place_name }</p>
                        <button
                            className={`${ activePlaceId !== place.id ? 'btn-outline-primary' : 'btn-outline-light' } btn btn-sm`}
                            onClick={ () => getRoute(place) }
                        >
                            Directions
                        </button>
                    </li>
                ))
            }
        </ul>
    );
};
