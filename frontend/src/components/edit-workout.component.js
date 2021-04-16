import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const UpdateDiv = styled.div`
  height: 100vh;
  padding-top: 25px;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export default class EditWorkout extends Component {
  constructor(props) {
    super(props);

    this.onChangeWorkoutTitle = this.onChangeWorkoutTitle.bind(this);
    this.onChangeWorkoutTags = this.onChangeWorkoutTags.bind(this);
    this.onChangeWorkoutDescription = this.onChangeWorkoutDescription.bind(
      this
    );
    this.onChangeWorkoutResponsible = this.onChangeWorkoutResponsible.bind(
      this
    );
    this.onChangeWorkoutDifficulty = this.onChangeWorkoutDifficulty.bind(this);
    this.onChangeWorkoutTimesCompleted = this.onChangeWorkoutTimesCompleted.bind(
      this
    );
    this.onChangeWorkoutCompletedDate = this.onChangeWorkoutCompletedDate.bind(
      this
    );
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);

    this.state = {
      redirect: null,
      workout_title: "",
      duration: undefined,
      exercises: [],
      date: new Date().toString(),
    };
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

  // methods to update state
  onChangeWorkoutTitle(e) {
    this.setState({
      workout_title: e.target.value,
    });
  }

  onChangeWorkoutTags(e) {
    this.setState({
      workout_tags: e.target.value.split(","),
    });
  }

  onChangeWorkoutDescription(e) {
    this.setState({
      workout_description: e.target.value,
    });
  }

  onChangeWorkoutResponsible(e) {
    this.setState({
      workout_responsible: e.target.value,
    });
  }

  onChangeWorkoutDifficulty(e) {
    this.setState({
      workout_difficulty: e.target.value,
    });
  }

  onChangeWorkoutTimesCompleted(e) {
    this.setState({
      workout_times_completed: e.target.value,
    });
  }

  onChangeWorkoutCompletedDate(e) {
    this.setState({
      date: e.target.value,
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
      <UpdateDiv style={{ marginTop: "0px", color: "white" }}>
        <h3 className="text-center text-white" style={{ marginBottom: "70px" }}>
          Update Workout
        </h3>
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
                  name="name"
                  className="form-control"
                  value={this.state.exercises[i].name}
                  onChange={this.onChangeExerciseName}
                />
                <label>Exercise {i + 1} Sets:</label>
                <input
                  type="number"
                  name="sets"
                  min="1"
                  className="form-control"
                  value={this.state.exercises[i].sets}
                  onChange={this.onChangeExerciseSets}
                />
                <label>Exercise {i + 1} Reps:</label>
                <input
                  type="number"
                  name="reps"
                  min="1"
                  className="form-control"
                  value={this.state.exercises[i].reps}
                  onChange={this.onChangeExerciseReps}
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
