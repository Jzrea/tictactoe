const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe
} = require('../controllers/user.controller.js');
const { protect } = require('../middlewares/authMiddleware.js');



router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;