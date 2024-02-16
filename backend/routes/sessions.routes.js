const express = require("express");
const router = express.Router();
const { getSessions, saveSession, deleteBySessionIds, deleteSessions } = require("../controllers/session.controller.js");


router.get('/', getSessions);
router.post('/', saveSession);
router.put('/', deleteBySessionIds);//NOT GOOD PRACTICE
router.delete('/', deleteSessions);

module.exports = router;