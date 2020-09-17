import React, { Component } from "react";
import restService from '../services/restService';
import config from "../config.json";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TitleAndContent from "./titleAndContent";

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            isLoading: false,
        }
    }

    async performSearch() {
        try {
            this.setState({ isLoading: true });
            let url = config.endpointBase + '&plot=full&i=' + this.props.match.params.id;
            const movie = await restService.get(url);
            this.setState({ isLoading: false, movie: movie.data });
        } catch (ex) {
            this.setState({ isLoading: false });
            if (ex.response && ex.response.status === 404) {
                alert("not found")
            }
        }
    }

    async componentDidMount() {
        this.performSearch();
    }

    displayTitledDataWithLine(title, content) {
        return (
            <>
                <hr></hr>
                <TitleAndContent title={title} content={content}></TitleAndContent>
            </>
        )
    }

    render() {
        const { movie, isLoading } = this.state;

        if (!movie && !isLoading) return null;

        if (isLoading) return (<h3>Loading Movie Details...</h3>);
        return (
            <>
                {isLoading && <h3>Loading Movie Details...</h3>}
                <h2>{movie.Title} {"(" + movie.Year + ")"}</h2>
                <hr></hr>
                <Row>
                    <Col className="margin-bottom-40" md={6} sm={12}>
                        <img className="largeMovieListImage" src={movie.Poster}></img>
                    </Col>
                    <Col md={6} sm={12} >
                        <Row>
                            <Col className="description">{movie.Rated}</Col>
                            <Col className="description">{movie.Runtime}</Col>
                            <Col className="description">{movie.Genre}</Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col className="description">{movie.Plot}</Col>
                        </Row>
                        <TitleAndContent displayLine="true" title="Writer:" content={movie.Writer}></TitleAndContent>
                        <TitleAndContent title="Actors:" content={movie.Actors}></TitleAndContent>
                        <TitleAndContent title="Director:" content={movie.Director}></TitleAndContent>
                        <TitleAndContent title="Country:" content={movie.Country}></TitleAndContent>
                        <TitleAndContent displayLine="true" title="Awards:" content={movie.Awards}></TitleAndContent>
                        <TitleAndContent title="Metascore:" content={movie.Metascore}></TitleAndContent>
                        <TitleAndContent title="Imdb Rating:" content={movie.imdbRating}></TitleAndContent>
                        <TitleAndContent title="Imdb Votes:" content={movie.imdbVotes}></TitleAndContent>
                        <TitleAndContent displayLine="true" title="Box Office:" content={movie.BoxOffice}></TitleAndContent>
                        <TitleAndContent title="Production:" content={movie.Production}></TitleAndContent>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Link className="btn-custom wideButton" to="/movies">Back to Movies Search</Link>
                </Row>
            </>
        );
    }
}

export default MovieDetails;