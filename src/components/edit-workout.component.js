import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

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
      workout_title: "",
      workout_tags: [""],
      workout_description: [""],
      workout_responsible: "",
      workout_difficulty: "",
      workout_times_complecated: 0,
      workout_completed_date: new Date().toString(),
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/workouts/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          workout_title: response.data.workout_title,
          workout_tags: response.data.workout_tags,
          workout_description: response.data.workout_description,
          workout_responsible: response.data.workout_responsible,
          workout_difficulty: response.data.workout_difficulty,
          workout_times_complecated: response.data.workout_times_complecated,
          workout_completed_date: response.data.workout_completed_date,
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
    e.preventDefault();

    const obj = {
      workout_title: this.state.workout_title,
      workout_tags: this.state.workout_tags,
      workout_description: this.state.workout_description,
      workout_responsible: this.state.workout_responsible,
      workout_difficulty: this.state.workout_difficulty,
      workout_times_completed: this.state.workout_times_completed,
      workout_completed_date: this.state.workout_completed_date,
    };
    console.log(obj.workout_completed_date);
    axios
      .post(
        "/workouts/update/" + this.props.match.params.id,
        obj
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/");
  }

  deleteWorkout(e) {
    const obj = {
      workout_title: this.state.workout_title,
      workout_tags: this.state.workout_tags,
      workout_description: this.state.workout_description,
      workout_responsible: this.state.workout_responsible,
      workout_difficulty: this.state.workout_difficulty,
      workout_times_completed: this.state.workout_times_completed,
      workout_completed_date: this.state.workout_completed_date,
    };

    // axios.delete('http://localhost:4000/workouts/delete/' + this.props.match.params.id, obj)
    // 	.then((res) => {
    //               console.log('Workout successfully deleted!')
    //           }).catch((error) => {
    //               console.log(error)
    //           })
    //       this.props.history.push('/');
    axios
      .delete(
        "http://localhost:4000/workouts/delete/" + this.props.match.params.id,
        obj
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/workouts");
  }

  render() {
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
          <div className="form-group">
            <label>Description: </label>
            <textarea
              style={{ whiteSpace: "pre-wrap" }}
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
              value={new Date(this.state.workout_completed_date) || new Date()}
              type="date"
              className="form-control"
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
