import React, {Component} from 'react';

export default class CreateWorkout extends Component {
	constructor(props) {
        super(props);

        this.state = {
            workout_description: '',
            workout_responsible: '',
            workout_difficulty: '',
            workout_times_completed: 0,
            workout_completed_date: ''
        }

        this.onChangeWorkoutDescription = this.onChangeWorkoutDescription.bind(this);
        this.onChangeWorkoutResponsible = this.onChangeWorkoutResponsible.bind(this);
        this.onChangeWorkoutDifficulty = this.onChangeWorkoutDifficulty.bind(this);
        this.onChangeWorkoutTimesCompleted = this.onChangeWorkoutTimesCompleted.bind(this);
        this.onChangeWorkoutCompletedDate = this.onChangeWorkoutCompletedDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        
        console.log(`Form submitted:`);
        console.log(`Workout Description: ${this.state.workout_description}`);
        console.log(`Workout Responsible: ${this.state.workout_responsible}`);
        console.log(`Workout Difficulty: ${this.state.workout_difficulty}`);
        console.log(`Times Workout Completed: ${this.state.workout_times_completed}`);

        const newWorkout = {
            workout_description: this.state.workout_description,
            workout_responsible: this.state.workout_responsible,
            workout_difficulty: this.state.workout_difficulty,
            workout_times_completed: this.state.workout_times_completed,
            workout_completed_date: this.state.workout_completed_date
        };
        
        // reset form
        this.setState({
            workout_description: '',
            workout_responsible: '',
            workout_difficulty: '',
            workout_times_completed: 0,
            workout_completed_date: Date.now
        })
    }

	render() {
		return (
			<div style={{marginTop: 10}}>
				<h3>Create New Workout</h3>
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
                                type="string" 
                                className="form-control"
                                value={this.state.workout_completed_date}
                                onChange={this.onChangeWorkoutCompletedDate}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create workout" className="btn btn-primary" />
                    </div>
                </form>
			</div>

		)
	}
}