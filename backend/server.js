// node/ express server implementation on port 4000

// web framework
const express = require('express');
const app = express();

// node body parsing middleware
const bodyParser = require('body-parser');

// allows restricted resources on web page to be requested from another domain
// outside domain first resource was served
const cors = require('cors');

// add mongodb
const mongoose = require('mongoose');
let Workout = require('./workout.model');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/workouts', { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})



//****************************************************** setup api endpoints *************************************************************************
const workoutRoutes = express.Router();


// endpoint to deliver all available workout items
// get workouts when result is available using find method
workoutRoutes.route('/').get((req,res) => {
	Workout.find((err, workouts) => {
		if (err) {
			console.log(err + 'man');
		} else {
			res.json(workouts);
		}
	});
});

// endpoint to retrieve workout item
workoutRoutes.route('/:id').get((req, res) => {
	let id = req.params.id;
	Workout.findById(id, (err, workout) => {
		res.json(workout);
	});
});

// Post endpoint route
workoutRoutes.route('/add').post((req, res) => {
	let workout = new Workout(req.body);
	workout.save()
		.then(workout => {
			res.status(200).json({'workout': 'workout added successfully'});
		})
		.catch(err => {
			res.status(400).send('adding new workout failed');
		});
});

// delete workout
workoutRoutes.route('/delete/:id').delete((req, res, next) => {
	Workout.findByIdAndRemove(req.params.id, (err, workout) => {
		if (err) {
			return next(err);
		} else {
			res.status(200).json({
				msg: workout
			})
		}
	})
})

// update endpoint route
workoutRoutes.route('/update/:id').post((req, res) => {
	Workout.findById(req.params.id, (err, workout) => {
		if (!workout) {
			res.status(404).send('data is not found');
		} else {
			workout.workout_description = req.body.workout_description;
			workout.workout_responsible = req.body.workout_responsible;
			workout.workout_difficulty = req.body.workout_difficulty;
			workout.workout_times_completed = req.body.workout_times_completed;
			workout.workout_completed_date = req.body.workout_completed_date;

			workout.save().then(workout => {
				res.json('Workout updated!');
			})
			.catch(err => {
				res.status(400).send('Update not possible');
			});
		}
	})
})

app.use('/workouts', workoutRoutes);

app.listen(PORT, function() {
    console.log(`Server is running on Port: ${PORT}`);
});