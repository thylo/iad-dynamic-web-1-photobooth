const express = require("express");
const router = express.Router();
const passport = require("passport");

const Characters = require("../models/Character");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.render("form/create", {});
});

module.exports = router;
