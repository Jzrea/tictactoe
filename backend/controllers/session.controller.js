const Sessions = require("../models/session.model");
const asyncHandler = require('express-async-handler');

// @desc    Lazy Load get game sessions
// @route   GET /api/sessions
// @access  Public
const getSessions = asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10 } = req.query;
    console.log(req.query);
    try {
        const sessions = await Sessions.find().skip(offset).limit(limit);
        if (!sessions) return res.status(404).json({ message: 'No session found.' });

        res.status(200).json({ payload: sessions, hasMore: offset - limit < sessions.length });
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

// @desc    Delete All Sessions
// @route   DELETE /api/sessions
// @access  Public
const deleteSessions = asyncHandler(async (req, res) => {
    try {
        const deletedSessions = await Sessions.deleteMany({});

        if (!deletedSessions) throw Error('Something went wrong clearing Sessions');

        res.status(200).json({ message: 'database cleared' });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: err.message });

    }
});

// @desc    Delete By Sessions IDs
// @route   DELETE /api/sessions
// @access  Public
const deleteBySessionIds = asyncHandler(async (req, res) => {
    try {
        const deletedSessions = await Sessions.deleteMany({
            _id: {
                $in: req.body
            },
        });
        if (!deletedSessions) throw Error('Something went wrong saving the item');
        // console.log(deleteSessions);
        res.status(200).json({ message: 'sessions deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: err.message });

    }
});

module.exports = {
    getSessions,
    saveSession,
    deleteSessions,
    deleteBySessionIds
};