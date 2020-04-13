import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateWorkout from "./components/create-workout.component";
import EditWorkout from "./components/edit-workout.component";
import WorkoutList from "./components/workout-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
          
          </nav>
          <br/>
          <Route path="/" exact component={WorkoutList} />
          <Route path="/edit/:id"  component={EditWorkout} />
          <Route path="/create"  component={CreateWorkout} />
        </div>
      </Router>
    );
  } 
}

export default App;
