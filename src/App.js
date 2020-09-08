import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Movies from "./components/movies";
import MovieDetails from "./components/movieDetails";
import NotFound from "./components/notFound";

function App() {
  return (
    <div className="App">
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieDetails}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Route path="/" component={Movies}></Route>
          <Redirect to="not-found"></Redirect>
        </Switch>
      </main>
    </div>
  );
}

export default App;
