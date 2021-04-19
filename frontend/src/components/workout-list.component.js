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
  margin: 25px 0 20px;

  @media (min-width: 992px) {
    margin: 0 0 50px;
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

// const WorkoutList = () => {
// 	const [workouts, setWorkouts] = useState([])
// 	const deleteWorkout = () => {
// 		const obj = {
// 			workout_title: this.state.workout_title,
// 			workout_tags: this.state.workout_tags,
//             workout_description: this.state.workout_description,
//             workout_responsible: this.state.workout_responsible,
//             workout_difficulty: this.state.workout_difficulty,
//             workout_times_completed: this.state.workout_times_completed,
//             workout_completed_date: this.state.workout_completed_date
// 		}
// 	}
// }
export default class WorkoutList extends Component {
  constructor(props) {
    super(props);
    this.deleteWorkout = this.deleteWorkout.bind(this);
    let workouts = this._loadWorkouts();
    this.state = { workouts: workouts, redirect: null, isLoading: false };
  }

  // method to delete entries
  deleteWorkout(e) {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://intense-ridge-39955.herokuapp.com/"
        : "http://localhost:4000/";
    const obj = {
      workout_title: this.state.workout_title,
      workout_tags: this.state.workout_tags,
      workout_description: this.state.workout_description,
      workout_responsible: this.state.workout_responsible,
      workout_difficulty: this.state.workout_difficulty,
      workout_times_completed: this.state.workout_times_completed,
      workout_completed_date: this.state.workout_completed_date,
    };

    axios
      .delete(baseUrl + "workouts/delete/" + this.props.match.params.id, obj)
      .then((res) => {
        console.log("Student successfully deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ redirect: "/" });
  }

  componentDidMount() {
    this._loadWorkouts();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  _loadWorkouts() {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://intense-ridge-39955.herokuapp.com/"
        : "http://localhost:4000/";
    this.setState({ ...this.state, isLoading: true });

    axios
      .get(baseUrl + "workouts/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({ workouts: response.data.workouts, isLoading: false });
        console.log("workouts", this.state.workouts);
        return response.data.workouts;
      })
      .catch(function (error) {
        console.log(error);
        if (this?.state) {
          this.setState({ ...this.state, isLoading: false });
        }
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
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
