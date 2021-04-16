const routes = require("express").Router();
let Exercise = require("../model").Exercise;

routes
  .route("/")
  .get((req, res) => {
    Exercise.find((err, exercises) => {
      if (err) {
        console.log(err);
      } else {
        res.json(exercises);
      }
    });
  })
  .post((req, res) => {
    let exercise = new Exercise(req.body);
    exercise
      .save(exercise)
      .then((exercise) => {
        res.status(200).json({ exercise: "exercise added successfully" });
      })
      .catch((err) => {
        res.status(400).send("adding new exercise failed");
      });
  });

routes
  .route("/:id")
  .delete((req, res, next) => {
    Exercise.findByIdAndRemove(req.params.id, (err, exercise) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).json({
          msg: exercise,
        });
      }
    });
  })
  .patch((req, res) => {
    Exercise.findById(req.params.id, (err, exercise) => {
      if (!exercise) {
        res.status(404).send("data is not found");
      } else {
        exercise.name = req.body.name;
        exercise.category = req.body.category;

        workout
          .save()
          .then((workout) => {
            res.json("Exercise updated!");
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
