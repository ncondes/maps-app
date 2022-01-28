import { useContext } from 'react';
import { mapContext, placesContext } from '../context';


export const BtnMyLocation = () => {

    const { map } = useContext(mapContext);
    const { userLocation } = useContext(placesContext);

    const onClick = () => {
        if (!map) throw new Error('Map is not loaded');
        if (!userLocation) throw new Error('No user location');
        map?.flyTo({
            zoom: 14,
            center: userLocation,
        })
    }

    return (
        <button
            className="btn btn-outline-primary"
            onClick={ onClick }
            style={{
                position: 'fixed',
                right: '20px',
                top: '20px',
                zIndex: '999'
            }}
        >
            My location
        </button>
    );
};
