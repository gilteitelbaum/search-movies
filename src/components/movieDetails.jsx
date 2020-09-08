import React, { Component } from "react";
import restService from '../services/restService';
import config from "../config.json";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


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

    displayColumn(content) {
        return (
            <Col className="description">
                {content}
            </Col>
        );
    }

    displayTitledData(title, content) {
        return (
            <>
                <Row>
                    <Col lg={3} md={4} xs={6} className="title">
                        {title}
                    </Col>
                    <Col lg={9} md={8} xs={6} className="content">
                        {content}
                    </Col>
                </Row>
            </>
        )
    }

    displayTitledDataWithLine(title, content) {
        return (
            <>
                <hr></hr>
                {this.displayTitledData(title, content)}
            </>
        )
    }


    render() {
        const { movie, isLoading } = this.state;

        if (!movie && !isLoading) return null;

        if (isLoading) return (<h3>Loading Movie Details...</h3>);
        return (
            <>
                <h2>{movie.Title} {"(" + movie.Year + ")"}</h2>
                <hr></hr>
                <Row>
                    <Col className="margin-bottom-40" md={6} sm={12}>
                        <img className="movieListImage" src={movie.Poster}></img>
                    </Col>
                    <Col md={6} sm={12} >
                        <Row>
                            {this.displayColumn(movie.Rated)}
                            {this.displayColumn(movie.Runtime)}
                            {this.displayColumn(movie.Genre)}
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col className="description">
                                {movie.Plot}}
                            </Col>
                        </Row>
                        {this.displayTitledDataWithLine("Writer:", movie.Writer)}
                        {this.displayTitledData("Actors:", movie.Actors)}
                        {this.displayTitledData("Director:", movie.Director)}
                        {this.displayTitledData("Country:", movie.Country)}
                        {this.displayTitledDataWithLine("Awards:", movie.Awards)}
                        {this.displayTitledData("Metascore:", movie.Metascore)}
                        {this.displayTitledData("Imdb Rating:", movie.imdbRating)}
                        {this.displayTitledData("Imdb Votes:", movie.imdbVotes)}
                        {this.displayTitledDataWithLine("Box Office:", movie.BoxOffice)}
                        {this.displayTitledData("Production:", movie.Production)}
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

