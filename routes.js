"use-strict";

const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get('/', controller.getJft)

module.exports = router;