const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Workout  = new Schema({
    workout_title: {
        type: String
    },
    workout_tags: {
        type: [String]
    },
    workout_description: {
        type: [String]
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
    	type: Date, default: Date.now
    }
});

module.exports = mongoose.model('Workout', Workout);