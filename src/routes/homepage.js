const express = require("express");
const router = express.Router();
const db = require("../config/database");
const moods = require('../config/moods.json');
/* GET http://localhost:3000/ */

router.get("/", async function (req, res, next) {
  db.find({}, function (err, docs) {
    if (err == null) {
      const selfies = docs.map((doc) => ({
        ...doc,
        imageUrl: doc.image.path,
      }));
      res.render("index.html", {
        title: "Homepage",
        moods,
        selfies,
      });
    }
  });
});

module.exports = router;
