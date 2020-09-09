import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import restService from '../services/restService';
import config from "../config.json";
import { Form, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';


class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            totalMovies: 0,
            isLoading: false,
            didSearch: false,
            movieSearchName: null,
            movieYear: null,
            lastPage: 1,
            errors: {}
        }
    }

    validate() {
        const errors = {};
        const { movieSearchName, movieYear } = this.state;

        if (movieSearchName.trim() === '')
            errors.movieSearchName = "Name of movie is required";
        if (movieYear && movieYear.trim().length > 0 && isNaN(parseInt(movieYear.trim()))) {
            errors.movieYear = "Year is invalid";
        }
        return errors;
    }

    handleSubmit = event => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({ errors });
        for (let key in errors) {
            toast.error(errors[key]);
            return; // return on first error
        }

        if (this.state.movieSearchName) {
            this.performSearch(1)
        }
    }

    getMoreMovies = event => {
        this.performSearch(this.state.lastPage + 1);
    }

    getUrl(page) {
        let url = config.endpointBase + '&s=' + this.state.movieSearchName;
        if (this.state.movieYear)
            url += "&y=" + this.state.movieYear;
        if (page > 1)
            url += "&page=" + page;
        return url;
    }


    async performSearch(page) {
        try {
            this.setState({ isLoading: true });
            const moviesRetrieved = await restService.get(this.getUrl(page));
            if (page > 1)
                this.setState({ movies: this.state.movies.concat(moviesRetrieved.data.Search), totalMovies: moviesRetrieved.data.totalResults });
            else
                this.setState({ movies: moviesRetrieved.data.Search, totalMovies: moviesRetrieved.data.totalResults });
            this.setState({ isLoading: false, lastPage: page, didSearch: true });
        } catch (ex) {
            this.setState({ isLoading: false });
            if (ex.response && ex.response.status === 404) {
                alert("not found")
            }
        }
    }

    handleChange = event => {
        const { id, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    showMovies() {
        const { totalMovies, movies } = this.state;

        return (
            <div className="row margin-top-40">
                <div className="col">
                    {totalMovies > 0 ? <h4>Found {totalMovies} matching movies</h4> : <h4>No matching movies found</h4>}
                    {movies ? <MoviesTable movies={movies}></MoviesTable> : null}
                </div>
            </div>
        );
    }

    render() {
        const { isLoading, movies, totalMovies, movieSearchName, movieYear } = this.state;
        if (isLoading) return <p>Loading...</p>

        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col className="searchControl" md={8} sm={6} xs={8}><Form.Control id="movieSearchName" onChange={this.handleChange} value={movieSearchName || ""} placeholder="Search for any movie" /></Col>
                        <Col className="searchControl" md={2} sm={3} xs={4}><Form.Control id="movieYear" onChange={this.handleChange} value={movieYear || ""} placeholder="Year" /></Col>
                        <Col className="searchControlButton" md={2} sm={3} xs={12}><button disabled={isLoading || !(movieSearchName && movieSearchName.length)} className=" btn-custom wideButton" type="submit">Search</button></Col>
                    </Row>
                </Form >
                {this.state.didSearch ? this.showMovies() : null}
                {movies && movies.length > 0 && movies.length < totalMovies ? <button className="btn-custom margin-top-10" onClick={this.getMoreMovies}>Show More Movies</button> : null}
            </>
        );
    }
}

export default Movies;
