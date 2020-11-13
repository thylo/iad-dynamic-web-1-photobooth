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
               lat: 50,
               lon: 0,
               emotion: entry["mood"],
            };
            data.push(curObj);
         });

         res.render("map.html", {
            title: "Show location of selfies",
            leafletRequired: "true",
            jsonObject: JSON.stringify({
               contacts: data,
            }),
         });
      }
   });
});

module.exports = router;
