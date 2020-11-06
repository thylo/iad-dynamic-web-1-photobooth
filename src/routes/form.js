const express = require("express");
const router = express.Router();
const db = require("../config/database");


const moods = [{label:"je pète la forme", value: "happy"},{label:"c'est l'ennui", value: "bored"},{label:"je suis tristesse", value: "sad"},{label:"c'est ok", value: "neutral"}];

/* GET users listing. */
router.get("/", async function (req, res, next) {
  console.log(res.locals);
  res.render("form/create.html", {
    title: "Create new selfie",
    moods,
    errors: res.locals.errors || [],
  });
});

router.post("/", function (req, res, next) {
  const body = req.body;
  console.log(body);
  let hasError = false;
  if (!body.name) {
    hasError = true;
    req.flash("errors", { field: "name", msg: "Please select a name" });
  }
  if (!body.mood) {
    hasError = true;
    req.flash("errors", { field: "mood", msg: "Please select a mood" });
  }
  if (hasError) {
    req.flash("messages", {
      level: "error",
      msg: "Ooops something went wrong..."
    });
    res.redirect("/form");
    return;
  }
  req.flash("messages", { level: "success", msg: "Created" });
  res.redirect("/");
});

module.exports = router;
