const express = require("express");
const router = express.Router();
const formRouter = require("./form");
const homepageRouter = require("./homepage");

const routeName = (name) => (req, res, next) => {
   res.locals.routename = name;
   next();
};

router.use("/", routeName("home"), homepageRouter);
router.use("/form", routeName("form"), formRouter);
router.use("/about", routeName("about"), formRouter);

module.exports = router;
