const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema  = new Schema({
    workout_title: {
        type: String,
        required: true
    },
    workout_tags: {
        type: [String]
    },
    workout_description: {
        type: [String],
        required: true
    },
    workout_responsible: {
    	type: String
    },
    workout_difficulty: {
    	type: String
    },
    workout_times_completed: {
    	type: Number
    },
    workout_completed_date: {
    	type: String, default: new Date().toString()
    }
});

module.exports = mongoose.model('Workout', WorkoutSchema);