import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Movies from "./components/movies";
import MovieDetails from "./components/movieDetails";
import NotFound from "./components/notFound";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
    <ToastContainer />
      <header className="header">
        <h1>OMDB-API Search Movies</h1>
      </header>
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
