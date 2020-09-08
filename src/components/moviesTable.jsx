import React, { Component } from "react";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
    render() {
        const { movies } = this.props;

        return (
            <div className="row">
                {movies.map(movie => (
                    <div key={movie.imdbID} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 movieListEntry">
                        <Link to={'/movies/' + movie.imdbID}>
                            <img loading="lazy" className="movieListImage" src={movie.Poster} alt={"Movie poster for " + movie.Title}></img>
                            <h4 className="movieListTitle">{movie.Title} {"(" + movie.Year + ")"}</h4>
                        </Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default MoviesTable;
