const express = require("express");
const router = express.Router();
const contactRouter = require("./contact");
const formRouter = require("./form");
const mapRouter = require("./map");
const homepageRouter = require("./homepage");
const aboutRouter = require("./about");
const db = require("../config/database");

const routeName = (name) => (req, res, next) => {
  res.locals.routename = name;
  next();
};

router.use("/", routeName("home"), homepageRouter);
router.use("/form", routeName("form"), formRouter);
router.use("/map", routeName("map"), mapRouter);
router.use("/contact", routeName("contact"), contactRouter);
router.use("/about", routeName("about"), aboutRouter);
router.use("/selfies/:selfieId", (req, res) => {
  const id = req.params.selfieId;
  db.find({ _id: id }, (error, doc) => {
    if (error) {
      res.send("il n y a pas de document");
      return;
    }
    res.render("selfie.html", { doc });
  });
});
module.exports = router;
