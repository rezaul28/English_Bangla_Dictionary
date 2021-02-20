const express = require('express');
const router = express.Router();
const controller = require("./controller")
router.get("/get_word",controller.get_words)

module.exports = router;