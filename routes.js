"use strict";

const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get('/just-for-today', controller.getJft)
router.get('/meditations', controller.getMeditations)

module.exports = router;
