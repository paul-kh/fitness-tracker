const db = require("../models");
const path = require("path");


module.exports = function (app) {

    // ************** API ROUTES ***********************************

    // Get all workouts
    app.get("/api/workouts", (req, res) => {

        console.log("getting last workout");
        db.Workout.find({}).then(workouts => {
            res.json(workouts);
            console.log(workouts);

        }).catch(err => console.log(err));
    });

    // Update workout with a new exercise
    app.put("/api/workouts/:id", function (req, res) {
        const id = req.params.id;
        db.Workout.findOneAndUpdate({ _id: id }, { $push: { exercises: req.body } })
            .then(workout => {
                res.json(workout)
            })

            .catch(err => console.log(err))
    });

    // Get workouts by range
    app.get("/api/workouts/range", function (req, res) {
        console.log("Getting workouts by range");
        db.Workout.find()
            .limit(7)
            .sort({ day: -1 })
            .then(workout => res.json(workout))
            .catch(err => console.log(err))
    })

    // Create a new workout
    app.post("/api/workouts", function (req, res, next) {
        console.log(req.body)
        db.Workout.create({})
            .then(workout => res.json(workout))
            .catch(err => console.log(err))
    });


    // **** HTML ROUTE ****************************************
    // // supply exercise.html file
    app.get("/exercise", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/exercise.html"))
    })

    // supply stats.html file
    app.get("/stats", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/stats.html"))
    });

}
