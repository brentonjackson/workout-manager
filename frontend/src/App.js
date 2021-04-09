import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Container } from "react-bootstrap";
import styled from "styled-components";

import CreateWorkout from "./components/create-workout.component";
import EditWorkout from "./components/edit-workout.component";
import WorkoutList from "./components/workout-list.component";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Amplify, { Auth, loadingBar } from "aws-amplify";
import awsExports from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

Amplify.configure(awsExports);

const MyNav = styled(Nav)`
  z-index: 10;
  font-size: large;
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
`;

const WorkoutContainer2 = styled(Container)`
  min-height: 100vh;
  padding: 0px 15px;
  color: white;
  text-align: center;

  @media (min-width: 768px) {
    padding: 100px 100px 150px;
  }
`;

const App = () => {
  const [user, setUser] = useState();

  function handleAuthStateChange(state) {
    if (state === "signedin" || state === "signedout") {
      setUser(state);
    }
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        console.log(authenticatedUser);
        setUser(authenticatedUser);
      } catch {
        console.log("The user isn't signed in.");
      }
    };

    getUser();
  }, []);

  return user ? (
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
            <li className="navbar-item">
              {/* <Link to="/motivation" className="nav-link">
                Motivation
              </Link> */}
              <a
                className="nav-link"
                href="https://musing-mclean-fefe4c.netlify.app/"
              >
                Motivation
              </a>
            </li>
            {/* <li>
              <span>{this.loggedIn ? this.loginName : "Login"}</span>
            </li> */}
          </ul>
        </div>
        <div>
          {/* Signed in as <b>{user.attributes.email}</b> */}
          <Login loggedIn={user} loginName={user.attributes.email} />
        </div>
      </MyNav>
      <br />
      {/* <Dashboard /> */}
      <WorkoutContainer>
        <Route path="/" exact component={Dashboard} />
        <Route path="/workouts" exact component={WorkoutList} />
        <Route path="/edit/:id" component={EditWorkout} />
        <Route path="/create" component={CreateWorkout} />
        <Route path="/profile" component={Profile} />
      </WorkoutContainer>
    </Router>
  ) : (
    <Router>
      <MyNav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
          <div className="navbar-nav">
            <Login />
            {/* <AmplifySignOut /> */}
          </div>
        </div>
      </MyNav>
      <WorkoutContainer2>
        <Welcome />
      </WorkoutContainer2>
    </Router>
  );
};

export default App;
