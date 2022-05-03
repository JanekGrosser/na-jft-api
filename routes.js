"use strict";

//PR TEST
const express = require("express");
const router = express.Router();
const cors =require("cors")

const controller = require("./controller");

router.get('/just-for-today', cors(), controller.getJft)
router.get('/meditations', cors(), controller.getMeditations)

module.exports = router;
