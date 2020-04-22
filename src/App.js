import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

import "bootstrap/dist/css/bootstrap.min.css";
import {Nav} from "react-bootstrap";
import styled from 'styled-components';

import CreateWorkout from "./components/create-workout.component";
import EditWorkout from "./components/edit-workout.component";
import WorkoutList from "./components/workout-list.component";
import Dashboard from "./components/Dashboard";

const MyNav = styled(Nav)`
  position: absolute;
  left: 0px;
  right: 0px;
  z-index: 10;
`
const MainDiv = styled.div`

`

class App extends Component {
  render() {
    return (
      <Router>
        <MainDiv className="container">
          <MyNav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">MERN-Stack Workout App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <HashLink to="/" className="nav-link">Workouts</HashLink>
                </li>
                <li className="navbar-item">
                  <HashLink to="/create" className="nav-link">Create Workout</HashLink>
                </li>
              </ul>
            </div>
          </MyNav>
          <br/>
          <Dashboard/>
          <Route path="/" exact component={WorkoutList} />
          <Route path="/edit/:id"  component={EditWorkout} />
          <Route path="/create"  component={CreateWorkout} />
        </MainDiv>
      </Router>
    );
  }
}

export default App;
