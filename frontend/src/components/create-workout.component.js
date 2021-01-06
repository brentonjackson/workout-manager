import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const WorkoutContainer = styled.div`
  height: 100vh;
  margin-top: 7.5em;
  color: white;
`;

export default class CreateWorkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workout_title: "",
      workout_tags: [""],
      workout_description: [""],
      workout_responsible: "",
      workout_difficulty: "",
      workout_times_completed: 0,
      workout_completed_date: new Date().toUTCString(),
    };

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
  }

  // methods to update state
  onChangeWorkoutTitle(e) {
    this.setState({
      workout_title: e.target.value,
    });
  }

  onChangeWorkoutTags(e) {
    this.setState({
      workout_tags: e.target.value,
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
      workout_completed_date: e.target.value,
    });
  }

  onSubmit(e) {
    // backend not setup yet
    e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Workout title: ${this.state.workout_title}`);


    const newWorkout = {
      workout_title: this.state.workout_title,
      workout_tags: this.state.workout_tags,
      workout_description: this.state.workout_description,
      workout_responsible: this.state.workout_responsible,
      workout_difficulty: this.state.workout_difficulty,
      workout_times_completed: this.state.workout_times_completed,
      workout_completed_date: this.state.workout_completed_date,
    };

    axios
      .post("https://intense-ridge-39955.herokuapp.com/workouts/add", newWorkout)
      .then((res) => console.log(res.data));

    this.props.history.push("/workouts");

    // reset form
    this.setState({
      workout_title: "",
      workout_tags: [""],
      workout_description: [""],
      workout_responsible: "",
      workout_difficulty: "",
      workout_times_completed: 0,
      workout_completed_date: new Date().toUTCString(),
    });
  }

  render() {
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
          <div className="form-group">
            <label>Description: </label>
            <textarea
              name="description"
              className="form-control"
              value={this.state.workout_description}
              onChange={this.onChangeWorkoutDescription}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.workout_responsible}
              onChange={this.onChangeWorkoutResponsible}
            />
          </div>
          <div className="form-group">
            <label>Difficulty: </label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="difficultyOptions"
                id="difficultyEasy"
                value="Easy"
                checked={this.state.workout_difficulty === "Easy"}
                onChange={this.onChangeWorkoutDifficulty}
              />
              <label className="form-check-label">Easy</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="difficultyOptions"
                id="difficultyMedium"
                value="Medium"
                checked={this.state.workout_difficulty === "Medium"}
                onChange={this.onChangeWorkoutDifficulty}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="difficultyOptions"
                id="difficultyHard"
                value="Hard"
                checked={this.state.workout_difficulty === "Hard"}
                onChange={this.onChangeWorkoutDifficulty}
              />
              <label className="form-check-label">Hard</label>
            </div>
          </div>
          <div className="form-group">
            <label>Times Completed: </label>
            <input
              type="number"
              className="form-control"
              min="0"
              value={this.state.workout_times_completed}
              onChange={this.onChangeWorkoutTimesCompleted}
            />
          </div>
          <div className="form-group">
            <label>Date Last Completed: </label>
            <input
              type="date"
              className="form-control"
              value={this.state.workout_completed_date}
              onChange={this.onChangeWorkoutCompletedDate}
            />
          </div>
          <div className="form-group">
            <label>Tags: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.workout_tags}
              onChange={this.onChangeWorkoutTags}
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
