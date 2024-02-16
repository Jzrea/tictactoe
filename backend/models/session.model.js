const { Schema, model } = require('mongoose');

// Custom validator to check that playerTwo is not equal to playerOne
const validatePlayerTwoNotEqualToPlayerOne = function (value) {
    return value.toLowerCase() != this.playerOne.toLowerCase();
};

// Custom validator to check that results only contain 0, 1, or 2
const validateResults = function (value) {
    return /^[012]+$/.test(value);
};

// Create Schema
const SessionSchema = new Schema({
    playerOne: {
        type: String,
        required: true
    },
    playerTwo: {
        type: String,
        required: true,
        validate: [validatePlayerTwoNotEqualToPlayerOne, 'playerTwo must be different from playerOne']
    },
    results: {
        type: String,
        required: true,
        validate: [validateResults, 'results must only contain 0, 1, or 2']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Sessions = model('session', SessionSchema);

module.exports = Sessions;
