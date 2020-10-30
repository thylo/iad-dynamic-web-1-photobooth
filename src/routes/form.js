const express = require("express");
const router = express.Router();
const db = require("../config/database");

const moods = ["happy", "bored", "sad", "neutral"];

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
  const errors = [];
  if (!body.name) {
    errors.push({ field: "mood", msg: "Please select a mood" });
  }
  if (!body.mood) {
    errors.push({ field: "mood", msg: "Please select a mood" });
  }
  if (errors.length) {
    req.flash(
      "messages",
      JSON.stringify({ level: "error", msg: "Ooops something went wrong..." })
    );
    req.flash("errors", JSON.stringify(errors));
    res.redirect("/form");
    return;
  }
  req.flash(
      "messages",
      JSON.stringify({ level: "success", msg: "Created" })
  );
  res.redirect("/");
});

module.exports = router;
