const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstTimeLogin: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', UserSchema);