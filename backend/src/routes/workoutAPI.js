const expreess = require('express');
const router = expreess.Router();
const UserWorkout = require('../models/UserWorkoutModel');

// Get specific UserWorkout by username
router.get("/username/:username", async (req, res) => {
    try {
        const userWorkoutPlan = await UserWorkout.findOne({username: req.params.username});
        res.status(200).json(userWorkoutPlan);
    } 
    catch (error) {
        res.status(500).json({ error: "!!FAILED TO FETCH ALL USER WORKOUTS"});
    }
});

// Create a new UserWorkout
router.post("/", async (req, res) => {
    try {
        const newUserWorkout = await UserWorkout.create(req.body);
        res.status(201).json(newUserWorkout);
    } 
    catch (error) {
        res.status(500).json({ error: "!!FAILED TO CREATE NEW USER WORKOUT"});
    }
});

module.exports = router;