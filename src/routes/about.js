const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
   res.render("about.html", {
      title: "Aboutpage",
      
   });
});

module.exports = router;
