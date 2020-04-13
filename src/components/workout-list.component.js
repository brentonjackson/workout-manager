import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Workout = props => (
	<tr>
		<td>{props.workout.workout_description}</td>
		<td>{props.workout.workout_responsible}</td>
		<td>{props.workout.workout_difficulty}</td>
		<td>{props.workout.workout_times_completed}</td>
		<td>{props.workout.workout_completed_date}</td>
		<td>
			<Link to={'edit/' + props.workout._id}>Edit</Link>
		</td>
	</tr>
)

export default class WorkoutList extends Component {
	constructor(props){
		super(props);
		this.state = {workouts: []};
	}

	componentDidMount() {
        axios.get('http://localhost:4000/workouts/')
            .then(response => {
                this.setState({ workouts: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    workoutList() {
    	return this.state.workouts.map((currentWorkout, i) => <Workout workout={currentWorkout} key={i} />)
    }
    

	render() {
		return (
			<div>
				<h3> Workout List</h3>
				<table className="table table-striped" style={{marginTop: 20}} >
					<thead>
						<tr>
							<th>Description</th>
							<th>Responsible</th>
							<th>Difficulty</th>
							<th>Times Completed</th>
							<th>Last Completed</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.workoutList()}
					</tbody>
				</table>
			</div>

		)
	}
}