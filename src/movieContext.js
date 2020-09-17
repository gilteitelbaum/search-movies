
import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = (props) => {
    const [moviesSearch, setMoviesSearch] = useState({});
    return (
        <MovieContext.Provider value={[moviesSearch, setMoviesSearch]}>
            {props.children}
        </MovieContext.Provider>
    );

}