import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardDeck } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Dashboard from "./Dashboard";
import styled from 'styled-components';

const WorkoutContainer = styled(Container)`
	height: 100vh;
	padding-top: 25px;
`


const Workout = props => (
	<Card>
		<Card.Body>
			<Card.Title>{props.workout.workout_title}</Card.Title>
			<Card.Subtitle className="mb-4 text-muted">{props.workout.workout_tags}</Card.Subtitle>
			<Card.Text>Description: {props.workout.workout_description}</Card.Text>
			<Card.Text>For: {props.workout.workout_responsible}</Card.Text>
			<Card.Text>Difficulty Level: {props.workout.workout_difficulty}</Card.Text>
			<Card.Text>Times Completed: {props.workout.workout_times_completed}</Card.Text>
			<Card.Link>
				<Link to={'edit/'+ props.workout._id}>Edit</Link>
			</Card.Link>
		</Card.Body>
		<Card.Footer>
				<small className="text-muted">Last completed on: {props.workout.workout_completed_date}</small>
		</Card.Footer>
	</Card>
)

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
	constructor(props){
		super(props);
		this.deleteWorkout = this.deleteWorkout.bind(this);
		this.state = {workouts: []};
		console.log(this.state)
	}

	// method to delete entries
	deleteWorkout(e) {
		const obj = {
			workout_title: this.state.workout_title,
			workout_tags: this.state.workout_tags,
            workout_description: this.state.workout_description,
            workout_responsible: this.state.workout_responsible,
            workout_difficulty: this.state.workout_difficulty,
            workout_times_completed: this.state.workout_times_completed,
            workout_completed_date: this.state.workout_completed_date
        };

		axios.delete('/workouts/delete/' + this.props.match.params.id, obj)
			.then((res) => {
                console.log('Student successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
        this.props.history.push('/');
    }

	componentDidMount() {
        axios.get('/workouts/',  {
    headers: {
    'Content-Type': 'application/json'
    }
  })
            .then(response => {
				this.setState({ workouts: response.data });
				console.log('workouts',workouts)
            })
            .catch(function (error){
                console.log(error);
            })
    }

    // populate cards with workouts from database
    workoutList() {
		let workouts = this.state.workouts
		console.log('workouts: ',this.state.workouts);
		return (workouts.length > 1 && typeof(workouts) === Array) ? 
		workouts.map((currentWorkout, i) => <Workout workout={currentWorkout} key={i} />)
		: []
    }
    
	render() {
		return (
			<div>
			<WorkoutContainer>
				<h3 className="text-center text-white" style={{marginBottom: "25px", marginTop: '20px'}}> Workout Hub</h3>
				<CardDeck>
					{this.workoutList()}
				</CardDeck>
				
			</WorkoutContainer>
			</div>

		)
	}
}