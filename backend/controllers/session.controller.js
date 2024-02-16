const Sessions = require("../models/session.model");
const asyncHandler = require('express-async-handler');

// @desc    Lazy Load get game sessions
// @route   GET /api/sessions
// @access  Public
const getSessions = asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10 } = req.body;

    try {
        const sessions = await Sessions.find().skip(offset).limit(limit);
        if (!sessions) return res.status(404).json({ message: 'No session found.' });
        res.status(200).json(sessions);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: err.message });
    }
});


// @desc    Save game session
// @route   POST /api/sessions
// @access  Public
const saveSession = asyncHandler(async (req, res) => {
    const { playerOne, playerTwo, result } = req.body;
    if (!playerOne || !playerTwo || !result) return res.status(400).json({ message: 'Invalid request' });

    try {
        const newSession = await Sessions.create({
            playerOne,
            playerTwo,
            result
        });

        if (!newSession) throw Error('Something went wrong saving the item');

        res.status(200).json(newSession);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: err.message });

    }



});

module.exports = {
    getSessions,
    saveSession
};