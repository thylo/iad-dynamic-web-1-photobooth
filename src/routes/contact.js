const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
   res.render("contact.html", {
      title: "Homepage",
      names: ["Matis", "Hugo", "Robin", "Guillen", "Julien", "Raphael"],
   });
});

module.exports = router;
