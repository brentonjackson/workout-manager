import React, {Component} from 'react';
import axios from 'axios';

export default class EditWorkout extends Component {
	constructor(props) {
		super(props);

		this.onChangeWorkoutDescription = this.onChangeWorkoutDescription.bind(this);
        this.onChangeWorkoutResponsible = this.onChangeWorkoutResponsible.bind(this);
        this.onChangeWorkoutDifficulty = this.onChangeWorkoutDifficulty.bind(this);
        this.onChangeWorkoutTimesCompleted = this.onChangeWorkoutTimesCompleted.bind(this);
        this.onChangeWorkoutCompletedDate = this.onChangeWorkoutCompletedDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			workout_description: '',
			workout_responsible: '',
			workout_difficulty: '',
			workout_times_complecated: 0,
			workout_completed_date: ''

		}
	}

	componentDidMount() {
        axios.get('http://localhost:4000/workouts/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    workout_description: response.data.workout_description,
                    workout_responsible: response.data.workout_responsible,
                    workout_difficulty: response.data.workout_difficulty,
                    workout_times_complecated: response.data.workout_times_complecated,
                    workout_completed_date: response.data.workout_completed_date
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // methods to update state
    onChangeWorkoutDescription(e) {
        this.setState({
            workout_description: e.target.value
        });
    }

    onChangeWorkoutResponsible(e) {
        this.setState({
            workout_responsible: e.target.value
        });
    }

    onChangeWorkoutDifficulty(e) {
        this.setState({
            workout_difficulty: e.target.value
        });
    }

    onChangeWorkoutTimesCompleted(e) {
        this.setState({
            workout_times_completed: e.target.value
        });
    }

    onChangeWorkoutCompletedDate(e) {
        this.setState({
            workout_completed_date: e.target.value
        });
    }

    onSubmit(e) {
        // backend not setup yet
        e.preventDefault();

        const obj = {
            workout_description: this.state.workout_description,
            workout_responsible: this.state.workout_responsible,
            workout_difficulty: this.state.workout_difficulty,
            workout_times_completed: this.state.workout_times_completed,
            workout_completed_date: this.state.workout_completed_date
        };
       	console.log(obj);
       	axios.post('http://localhost:4000/workouts/update/' + this.props.match.params.id, obj)
       		.then(res => console.log(res.data));

       	this.props.history.push('');
    }

	render() {
		return (
			<div style={{marginTop: 10}}>
				<h3>Update Workout</h3>
				<form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
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
                    	<label>Difficulty: </label><br />
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="difficultyOptions" 
                                    id="difficultyEasy" 
                                    value="Easy"
                                    checked={this.state.workout_difficulty==='Easy'} 
                                    onChange={this.onChangeWorkoutDifficulty}
                                    />
                            <label className="form-check-label">Easy</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="difficultyOptions" 
                                    id="difficultyMedium" 
                                    value="Medium" 
                                    checked={this.state.workout_difficulty==='Medium'} 
                                    onChange={this.onChangeWorkoutDifficulty}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="difficultyOptions" 
                                    id="difficultyHard" 
                                    value="Hard" 
                                    checked={this.state.workout_difficulty==='Hard'} 
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
                        <input type="submit" value="Update workout" className="btn btn-primary" />
                    </div>
                </form>
			</div>

		)
	}
}