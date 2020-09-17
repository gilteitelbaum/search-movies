import React, { useState, useContext, useEffect } from "react";
import MoviesTable from "./moviesTable";
import restService from '../services/restService';
import config from "../config.json";
import { Form, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';
import { MovieContext } from "../movieContext";


export default function Movies(props) {
    const [movies, setMovies] = useState([]);
    const [totalMovies, setTotalMovies] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [didSearch, setDidSearch] = useState(false);
    const [movieSearchName, setMovieSearchName] = useState(null);
    const [movieYear, setMovieYear] = useState(null);
    const [lastPage, setLastPage] = useState(1);

    const [moviesSearch, setMoviesSearch] = useContext(MovieContext);

    useEffect(() => {
        if (moviesSearch && moviesSearch.movies && moviesSearch.movies.length > 0) {
            setMovies(moviesSearch.movies);
            setTotalMovies(moviesSearch.totalMovies);
            setMovieSearchName(moviesSearch.movieSearchName);
            setMovieYear(moviesSearch.movieYear);
            setLastPage(moviesSearch.lastPage);
            setIsLoading(false);
            setDidSearch(true);
        }
    }, []);


    function validate() {
        const validationErrors = {};

        if (!movieSearchName || movieSearchName.trim() === '')
            validationErrors.movieSearchName = "Name of movie is required";
        if (movieYear && movieYear.trim().length > 0 && isNaN(parseInt(movieYear.trim()))) {
            validationErrors.movieYear = "Year is invalid";
        }

        return validationErrors;
    }

    const handleSubmit = event => {
        event.preventDefault();
        const validationErrors = validate();
        for (let key in validationErrors) {
            toast.error(validationErrors[key]);
            return; // return on first error
        }

        if (movieSearchName) {
            performSearch(1)
        }
    }

    const getMoreMovies = event => {
        performSearch(lastPage + 1);
    }

    function getUrl(page) {
        let url = config.endpointBase + '&s=' + movieSearchName;
        if (movieYear)
            url += "&y=" + movieYear;
        if (page > 1)
            url += "&page=" + page;
        return url;
    }

    async function performSearch(page) {
        try {
            setIsLoading(true);
            const moviesRetrieved = await restService.get(getUrl(page));
            setTotalMovies(moviesRetrieved.data.totalResults);
            setIsLoading(false);
            setDidSearch(true);
            setLastPage(page);
            if (page > 1) {
                let holdMovies = movies.concat(moviesRetrieved.data.Search);
                setMovies(holdMovies);
                setMoviesSearch(previousMovies => ({ ...previousMovies, movies: [...holdMovies], lastPage: page }));
            }
            else {
                setMovies(moviesRetrieved.data.Search);
                setMoviesSearch({ movies: moviesRetrieved.data.Search, totalMovies: moviesRetrieved.data.totalResults, lastPage: page, movieSearchName: movieSearchName, movieYear: movieYear })
            }
        } catch (ex) {
            setIsLoading(false);
            if (ex.response && ex.response.status === 404) {
                alert("not found");
            }
        }
    }

    const handleTitleChange = event => {
        setMovieSearchName(event.target.value);
    }

    const handleYearChange = event => {
        setMovieYear(event.target.value);
    }

    function showMovies() {
        return (
            <div className="row margin-top-40">
                <div className="col">
                    {totalMovies > 0 ? <h4>Found {totalMovies} matching movies</h4> : <h4>No matching movies found</h4>}
                    {movies ? <MoviesTable movies={movies}></MoviesTable> : null}
                </div>
            </div>
        );
    }

    return (
        <>
            {isLoading && <p>Loading...</p>}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="searchControl" md={8} sm={6} xs={8}><Form.Control id="movieSearchName" onChange={handleTitleChange} value={movieSearchName || ""} placeholder="Search for any movie" /></Col>
                    <Col className="searchControl" md={2} sm={3} xs={4}><Form.Control id="movieYear" onChange={handleYearChange} value={movieYear || ""} placeholder="Year" /></Col>
                    <Col className="searchControlButton" md={2} sm={3} xs={12}><button disabled={isLoading || !(movieSearchName && movieSearchName.length)} className=" btn-custom wideButton" type="submit">Search</button></Col>
                </Row>
            </Form >
            {didSearch ? showMovies() : null}
            {movies && movies.length > 0 && movies.length < totalMovies ? <button className="btn-custom margin-top-10" onClick={getMoreMovies}>Show More Movies</button> : null}
        </>
    );
}
