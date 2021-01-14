import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Container } from "react-bootstrap";
import styled from "styled-components";

import CreateWorkout from "./components/create-workout.component";
import EditWorkout from "./components/edit-workout.component";
import WorkoutList from "./components/workout-list.component";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

const MyNav = styled(Nav)`
  z-index: 10;
`;

const WorkoutContainer = styled(Container)`
	

  padding: 0px 15px;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (min-width: 768px) {
    padding: 0px 100px 150px;
  }

  @media (min-width: 992px) {
    margin-top: 100px;
  }
`

const MainDiv = styled.div``;

class App extends Component {
  render() {
    return (
      <Router>
        
        <MyNav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            Workout Manager
          </Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/workouts" className="nav-link">
                  Workouts
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">
                  Create Workout
                </Link>
              </li>
            </ul>
          </div>
        </MyNav>
        <br />
        {/* <Dashboard /> */}<WorkoutContainer>
        <Route path="/" exact component={Dashboard} />
        <Route path="/workouts" exact component={WorkoutList} />
        <Route path="/edit/:id" component={EditWorkout} />
        <Route path="/create" component={CreateWorkout} />
        <Route path="/profile" component={Profile} />
        </WorkoutContainer>
      </Router>
    );
  }
}

export default App;
