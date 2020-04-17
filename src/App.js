import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';

import CreateWorkout from "./components/create-workout.component";
import EditWorkout from "./components/edit-workout.component";
import WorkoutList from "./components/workout-list.component";

const Nav = styled.navbar`
  position: absolute;
  left: 0px;
  right: 0px
`
const MainDiv = styled.div`

`

class App extends Component {
  render() {
    return (
      <Router>
        <MainDiv className="container">
          <Nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">MERN-Stack Workout App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Workouts</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Workout</Link>
                </li>
              </ul>
            </div>
          </Nav>
          <br/>
          <Route path="/" exact component={WorkoutList} />
          <Route path="/edit/:id"  component={EditWorkout} />
          <Route path="/create"  component={CreateWorkout} />
        </MainDiv>
      </Router>
    );
  }
}

export default App;
