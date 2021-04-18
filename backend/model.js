const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  _id: Schema.Types.ObjectId,
  workout_title: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
    required: true,
  },
  duration: Number,
  exercises: [
    {
      name: { type: String, required: true, unique: false },
      sets: Number,
      reps: Number,
      duration: Number,
    },
  ],
  // location: String,
  // exercises: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "ExerciseSet",
  //     // required: [true, "why no exercises?"],
  //   },
  // ],
});

// const ExerciseSchema = new Schema({
//   name: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   category: {
//     type: String,
//     required: false,
//   },
// });

// const ExerciseSetSchema = new Schema({
//   // exercise: {
//   //   type: Schema.Types.ObjectId,
//   //   ref: "Exercise",
//   // },
//   exercise: {
//     name: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     category: String,
//   },
//   sets: Number,
//   reps: Number,
// });

let Workout = mongoose.model("Workout", WorkoutSchema);
// let Exercise = mongoose.model("Exercise", ExerciseSchema);
// let ExerciseSet = mongoose.model("ExerciseSet", ExerciseSetSchema);

module.exports = {
  Workout: Workout,
  // Exercise: Exercise,
  // ExerciseSet: ExerciseSet,
};
