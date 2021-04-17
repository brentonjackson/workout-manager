import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const WorkoutContainer = styled.div`
  min-height: 80vh;
  // margin-top: 7.5em;
  color: white;
`;

export default class CreateWorkout extends Component {
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
  }

  // methods to update state
  onChangeWorkoutTitle(e) {
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
    // this.setState({
    //   exercises: { sets: e.target.value },
    // });
    let stateCopy = Object.assign({}, this.state);
    stateCopy.exercises[i].sets = e.target.value;
    this.setState(stateCopy);
  }
  onChangeExerciseReps(i, e) {
    // this.setState({
    //   exercises: { reps: e.target.value },
    // });
    let stateCopy = Object.assign({}, this.state);
    stateCopy.exercises[i].reps = e.target.value;
    this.setState(stateCopy);
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeWorkoutDate(e) {
    this.setState({
      date: e.target.value,
    });
  }

  onSubmit(e) {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://intense-ridge-39955.herokuapp.com/"
        : "http://localhost:4000/";
    e.preventDefault();

    const newWorkout = {
      workout_title: this.state.workout_title,
      date: this.state.date,
      duration: this.state.duration,
      exercises: this.state.exercises,
    };

    axios
      .post(baseUrl + "workouts/", newWorkout)
      .then((res) => console.log(res.data));

    this.setState({ redirect: "/workouts" });
  }

  render() {
    if (this.state.redirect) {
      setTimeout(500);
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <WorkoutContainer>
        <h3>Create New Workout</h3>
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
          {this.state.exercises.length > 0 ? (
            this.state.exercises.map((element, i) => {
              console.log("first condition");
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
            })
          ) : (
            <div className="form-group">
              <label>Exercise 1 Name:</label>
              <input
                type="text"
                className="form-control"
                value={this.state.exercises[0].name}
                onChange={this.onChangeExerciseName}
              />
              <label>Exercise 1 Sets:</label>
              <input
                type="number"
                min="1"
                className="form-control"
                value={this.state.exercises[0].sets}
                onChange={this.onChangeExerciseSets}
              />
              <label>Exercise 1 Reps:</label>
              <input
                type="number"
                min="1"
                className="form-control"
                value={this.state.exercises[0].reps}
                onChange={this.onChangeExerciseReps}
              />
            </div>
          )}
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
            <label>Date: </label>
            <input
              type="date"
              className="form-control"
              value={this.state.date}
              onChange={this.onChangeWorkoutCompletedDate}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create workout"
              className="btn btn-primary"
            />
          </div>
        </form>
      </WorkoutContainer>
    );
  }
}
