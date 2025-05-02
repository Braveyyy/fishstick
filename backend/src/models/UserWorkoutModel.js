const mongoose = require('mongoose');

const UserWorkoutSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    numworkoutdays: {
        type: Number,
        required: true
    },
    targetedmuscle: {
        type: String,
        required: true
    },
    requestedrestdays: {
        type: [String],
        required: true
    },
});

module.exports = mongoose.model('UserWorkout', UserWorkoutSchema);