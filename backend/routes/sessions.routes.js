const express = require("express");
const router = express.Router();
const { getSessions, saveSession } = require("../controllers/session.controller.js");


router.get('/', getSessions);
router.post('/', saveSession);

module.exports = router;