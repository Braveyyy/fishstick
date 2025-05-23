const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    targetedMuscles: {
        type: String,
        required: true
    },
    equipmentUsed: {
        type: String,
        default: 'Bodyweight'
    }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);