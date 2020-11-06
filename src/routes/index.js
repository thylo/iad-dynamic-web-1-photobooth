const express = require("express");
const router = express.Router();
const contactRouter = require("./contact");
const formRouter = require("./form");
const homepageRouter = require("./homepage");
const aboutRouter = require("./about");

const routeName = (name) => (req, res, next) => {
   res.locals.routename = name;
   next();
};

router.use("/", routeName("home"), homepageRouter);
router.use("/form", routeName("form"), formRouter);
router.use("/contact", routeName("contact"), contactRouter);
router.use("/about", routeName("about"), aboutRouter);

module.exports = router;