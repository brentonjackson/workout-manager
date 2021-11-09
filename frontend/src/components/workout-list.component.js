import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Card, CardDeck } from "react-bootstrap";
import styled from "styled-components";

const ResponsiveCardDeck = styled(CardDeck)`
  @media (max-width: 1199px) {
    justify-content: center;
  }
  @media (min-width: 576px) {
    margin-right: 0;
    margin-left: 0;
  }
  @media (min-width: 1200px) {
    justify-content: center;
  }
`;

const Title = styled.h3`
  margin: 50px 0 50px;

  @media (min-width: 992px) {
    margin: 50px 0 100px;
  }
`;

const Workout = ({ workout }) => (
  <Card
    style={{
      width: "18rem",
      maxWidth: "300px",
      marginBottom: "15px",
      marginLeft: "0",
      flex: "auto",
      boxShadow: "-7px 7px 8px #00000026",
    }}
  >
    <Card.Body>
      <Card.Title>{workout.workout_title}</Card.Title>
      {workout.exercises.map((element, i) => {
        return (
          <>
            <Card.Text>
              Exercise {i + 1}: {element.name}
              <br></br>
              {element.sets} sets x {element.reps} reps
              <br></br>
              {element.weight ? 
              'Weight: ' + element.weight :  
              null}
            </Card.Text>
          </>
        );
      })}
      {workout.duration !== undefined ? (
        <Card.Text>Duration: {workout.duration}</Card.Text>
      ) : (
        ""
      )}
      <Card.Link>
        <Link to={"edit/" + workout._id}>Edit</Link>
      </Card.Link>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">
        {new Date(workout.date).toLocaleDateString("en-US", {
          timeZone: "UTC",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </small>
    </Card.Footer>
  </Card>
);

export default class WorkoutList extends Component {
  constructor(props) {
    super(props);
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://intense-ridge-39955.herokuapp.com/"
        : "http://localhost:4000/";

    let workouts = axios
      .get(baseUrl + "workouts/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data.workouts;
      });
    this.state = {
      workouts: workouts,
      redirect: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this._loadWorkouts();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  //   componentDidUpdate() {
  //     this._loadWorkouts();
  //   }

  async _loadWorkouts() {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://intense-ridge-39955.herokuapp.com/"
        : "http://localhost:4000/";
    this.setState({ ...this.state, isLoading: true });

    await axios
      .get(baseUrl + "workouts/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({ workouts: response.data.workouts, isLoading: false });
        return response.data.workouts;
      })
      .catch(function (error) {
        if (this?.state) {
          this.setState({ ...this.state, isLoading: false });
        }
      });
      console.log(this.state)

      let firstWorkouts = [];
      let keys;
      localStorage.length > 0 ?  keys = Object.keys(localStorage) : keys = null;
      if (keys) {
        let i = keys.length;
        while ( i-- ) {
          firstWorkouts.push( JSON.parse(localStorage.getItem(keys[i]) ));
        }
        firstWorkouts.forEach(workout => this.state.workouts.push(workout))
        this.setState({workouts: [...this.state.workouts], isLoading: false}) ;
        console.log(this.state)
      }

  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Title className="text-center text-white"> Workouts</Title>
        <ResponsiveCardDeck>
          <h4 className="text-center text-white">
            {this.state.isLoading ? "Loading workouts....." : ""}
          </h4>
          {this.state.isLoading
            ? ""
            : this.state.workouts
            ? this.state.workouts.length > 0
              ? this.state.workouts.map((currentWorkout, i) => (
                  <Workout workout={currentWorkout} key={i} />
                ))
              : "Go ahead and track a workout!"
            : ""}
        </ResponsiveCardDeck>
      </div>
    );
  }
}
