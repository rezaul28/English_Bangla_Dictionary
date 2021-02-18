const express = require('express');
const router = express.Router();
const controller = require("./controller")
router.get("/get_data",controller.read_data)

module.exports = router;