import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const CreateDiv = styled.div`
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

export default class CreateWorkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      workout_title: "",
      duration: undefined,
      exercises: [{ name: "", sets: 0, reps: 0 }],
      date: new Date().toString(),
      exerciseFields: 1,
    };

    this.onChangeWorkoutTitle = this.onChangeWorkoutTitle.bind(this);
    this.onChangeExerciseName = this.onChangeExerciseName.bind(this);
    this.onChangeExerciseSets = this.onChangeExerciseSets.bind(this);
    this.onChangeExerciseReps = this.onChangeExerciseReps.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.removeExercise = this.removeExercise.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
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

  onChangeDate(e) {
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

  addExercise(e) {
    e.preventDefault();
    let stateCopy = Object.assign({}, this.state);
    stateCopy.exercises.push({ name: "", sets: 0, reps: 0 });
    this.setState(stateCopy);
  }

  removeExercise(e) {
    e.preventDefault();
    let stateCopy = Object.assign({}, this.state);
    stateCopy.exercises.pop();
    this.setState(stateCopy);
  }

  render() {
    if (this.state.redirect) {
      setTimeout(500);
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <CreateDiv>
        <Title>Create New Workout</Title>
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
                  className="form-control"
                  value={this.state.exercises[i].sets}
                  onChange={this.onChangeExerciseSets.bind(this, i)}
                />
                <label>Exercise {i + 1} Reps:</label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.exercises[i].reps}
                  onChange={this.onChangeExerciseReps.bind(this, i)}
                />
              </div>
            );
          })}
          <button onClick={this.addExercise}>Add exercise</button>
          {this.state.exercises.length > 1 && (
            <button onClick={this.removeExercise}>Remove exercise</button>
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
              onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group" style={{ marginTop: "50px" }}>
            <input
              type="submit"
              value="Create workout"
              className="btn btn-primary"
            />
          </div>
        </form>
      </CreateDiv>
    );
  }
}
