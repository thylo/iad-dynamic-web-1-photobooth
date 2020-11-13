const express = require("express");
const router = express.Router();
const db = require("../config/database");

/* GET users listing. */
router.get("/", async function (req, res, next) {
   data = [];
   db.find({}, function (err, docs) {
      if (err == null) {
         docs.forEach((entry) => {
            curObj = {
               name: entry["name"],
               imageUrl: entry["image"]["path"],
               anchorLink: "#",
            };
            data.push(curObj);
         });

         res.render("index.html", {
            title: "Homepage",
            selfieData: JSON.stringify({
               contacts: data,
            }),
         });
      }
   });
});

module.exports = router;
