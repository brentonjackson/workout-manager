const routes = require("express").Router();
const mongoose = require("mongoose");

let Workout = require("../model").Workout;
// let Exercise = require("../model").Exercise;
// let ExerciseSet = require("../model").ExerciseSet;

// endpoint to deliver all available workout items
// get workouts when result is available using find method
routes
  .route("/")
  .get((req, res) => {
    Workout.find((err, workouts) => {
      if (err) {
        console.log(err);
      } else {
        if (Object.keys(req.query).length > 0) {
          let query = req.query;
          let keys = Object.keys(query);
          let values = Object.values(query);
          const result = workouts.filter(
            (workout) => workout[keys[0]] === values[0]
          );
          const response = {
            count: result.length,
            workouts: result,
          };
          res.json(response);
        } else {
          const response = {
            count: workouts.length,
            workouts: workouts,
          };
          res.json(response);
        }
      }
    });
  })
  .post((req, res) => {
    // validate unique exercise names
    let exerciseNames = req.body.exercises.map((exercise) => exercise.name);
    const s = new Set(req.body.exercises.map((exercise) => exercise.name));
    if (exerciseNames.length !== s.size) {
      res.status(400).send("Error: Exercise names must be unique");
    }

    let workout = new Workout({
      _id: new mongoose.Types.ObjectId(),
      workout_title: req.body.workout_title,
      exercises: req.body.exercises,
      date: req.body.date,
      duration: req.body.duration,
    });

    if (workout.exercises.length < 1) {
      res
        .status(400)
        .send("Error: At least one exercise is required in a workout.");
    }

    workout
      .save(workout)
      .then((workout) => {
        res.status(200).json({
          message: "workout added successfully",
          createdWorkout: workout,
        });
      })
      .catch((err) => {
        res.status(400).send("adding new workout failed:" + " " + err);
      });
  });

routes
  .route("/:id")
  .get((req, res) => {
    let id = req.params.id;
    Workout.findById(id, (err, workout) => {
      if (Object.keys(req.query).length > 0) {
        let query = req.query;
        let keys = Object.keys(query);
        workout[keys[0]]
          ? res.json(workout[keys[0]])
          : res.status(400).send("Error: invalid query");
      } else {
        res.json(workout);
      }
    });
  })
  .delete((req, res, next) => {
    Workout.findByIdAndRemove(req.params.id, (err, workout) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).json({
          msg: workout,
        });
      }
    });
  })
  .patch((req, res) => {
    Workout.findById(req.params.id, (err, workout) => {
      if (!workout) {
        res.status(404).send("data is not found");
      } else {
        (workout.workout_title = req.body.workout_title),
          (workout.exercises = req.body.exercises),
          (workout.date = req.body.date),
          (workout.duration = req.body.duration);

        workout
          .save()
          .then((workout) => {
            res.json({ message: "Workout updated!", updatedWorkout: workout });
          })
          .catch((err) => {
            // let error = workout.validateSync()
            res
              .status(400)
              .send(String(err).split("ValidationError:")[1].split(","));
          });
      }
    });
  });

module.exports = routes;
