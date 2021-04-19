import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const UpdateDiv = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: white;
  margin: 0px 0 50px;

  @media (min-width: 426px) {
    width: 80%;
    max-width: 700px;
  }
`;
const Title = styled.h3`
  margin: 25px 0 35px;
  text-align: center;
  @media (min-width: 992px) {
    margin: 0 0 50px;
  }
`;

export default class EditWorkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      workout_title: "",
      duration: undefined,
      exercises: [{ name: "", sets: 0, reps: 0 }],
      date: new Date().toString(),
    };

    this.onChangeWorkoutTitle = this.onChangeWorkoutTitle.bind(this);
    this.onChangeExerciseName = this.onChangeExerciseName.bind(this);
    this.onChangeExerciseSets = this.onChangeExerciseSets.bind(this);
    this.onChangeExerciseReps = this.onChangeExerciseReps.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
  }

  componentDidMount() {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://intense-ridge-39955.herokuapp.com/"
        : "http://localhost:4000/";

    axios
      .get(baseUrl + "workouts/" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          workout_title: response.data.workout_title,
          duration: response.data.duration,
          exercises: response.data.exercises,
          date: response.data.date,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  // methods to update state
  onChangeWorkoutTitle(e) {
    console.log(e.target.value);
    this.setState({
      workout_title: e.target.value,
    });
  }

  onChangeExerciseName(i, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.exercises[i].name = e.target.value;
    this.setState(stateCopy);
  }
  onChangeExerciseSets(i, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.exercises[i].sets = e.target.value;
    this.setState(stateCopy);
  }
  onChangeExerciseReps(i, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.exercises[i].reps = e.target.value;
    this.setState(stateCopy);
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://intense-ridge-39955.herokuapp.com/"
        : "http://localhost:4000/";

    const obj = {
      workout_title: this.state.workout_title,
      date: this.state.date,
      duration: this.state.duration,
      exercises: this.state.exercises,
    };
    axios
      .patch(baseUrl + "workouts/" + this.props.match.params.id, obj)
      .then((res) => {
        console.log(res.data);
        this.setState({ redirect: "/workouts" });
      })
      .catch((error) => {
        alert(
          error?.response?.data.workouts.map((message) => {
            return message.split(":")[1];
          })
        );

        console.log(error?.response);
      });
  }

  deleteWorkout(e) {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://intense-ridge-39955.herokuapp.com/"
        : "http://localhost:4000/";
    const obj = {
      workout_title: this.state.workout_title,
      date: this.state.date,
      duration: this.state.duration,
      exercises: this.state.exercises,
    };

    axios
      .delete(baseUrl + "workouts/" + this.props.match.params.id, obj)
      .then((res) => {
        console.log("Workout successfully deleted!");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ redirect: "/workouts" });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <UpdateDiv>
        <Title
          className="text-center text-white"
          style={{ marginBottom: "35px" }}
        >
          Update Workout
        </Title>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.workout_title}
              onChange={this.onChangeWorkoutTitle}
            />
          </div>
          {this.state.exercises.map((element, i) => {
            return (
              <div className="form-group">
                <label>Exercise {i + 1} Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.exercises[i].name}
                  onChange={this.onChangeExerciseName.bind(this, i)}
                />
                <label>Exercise {i + 1} Sets:</label>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={this.state.exercises[i].sets}
                  onChange={this.onChangeExerciseSets.bind(this, i)}
                />
                <label>Exercise {i + 1} Reps:</label>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={this.state.exercises[i].reps}
                  onChange={this.onChangeExerciseReps.bind(this, i)}
                />
              </div>
            );
          })}
          <div className="form-group">
            <label>Duration (in mins): </label>
            <input
              type="number"
              className="form-control"
              value={this.state.duration}
              min="1"
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Update workout"
              className="btn btn-primary"
            />
          </div>
          <Button size="sm" variant="danger" onClick={this.deleteWorkout}>
            Delete
          </Button>
        </form>
      </UpdateDiv>
    );
  }
}
