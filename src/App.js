import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import urls from "./urls";
import './App.css';
import Cassegrain from "./components/Cassegrain";

const Home = () => {
  return (
    <div>Home</div>
  );
}

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a className="navbar-brand" href="">Amateur Telescope Makers</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink to={urls.home} className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={urls.cassagrain} className="nav-link">Cassagrain</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navigation />  
          <Switch>
            <Route path={urls.home} component={Home} exact />
            <Route path={urls.cassagrain} component={Cassegrain} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
