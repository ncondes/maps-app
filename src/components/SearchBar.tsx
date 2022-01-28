import { useContext, useRef } from 'react';
import { SearchResults } from '.';
import { placesContext } from '../context';

export const SearchBar = () => {

    const { searchPlacesByTerm } = useContext(placesContext);

    const debounceRef = useRef<NodeJS.Timeout>();

    const onQueryChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }
        debounceRef.current = setTimeout(() => {
            // TODO: buscar consulta
            searchPlacesByTerm(event.target.value)
        }, 500);
    }

    return (
        <div className="search-container">
            <input
                className="form-control"
                placeholder="Search ..."
                type="text"
                onChange={ onQueryChanged }
            />
            <SearchResults />
        </div>
    );
};
