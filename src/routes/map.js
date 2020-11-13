const express = require("express");
const router = express.Router();
const db = require("../config/database");

/* GET users listing. */
router.get("/", async function (req, res, next) {
   data = [];

   db.find({}, function (err, docs) {
      if (err == null) {
         docs.forEach((entry) => {
            console.log(entry);
            curObj = {
               name: entry["name"],
               imageUrl: "https://picsum.photos/id/100/100/100",
               lat: 50,
               lon: 0,
               emotion: entry["mood"],
            };
            data.push(curObj);
            console.log(data);
         });
      }
   });

   console.log(
      "string" +
         JSON.stringify({
            contacts: data,
         })
   );

   res.render("map.html", {
      title: "Show location of selfies",
      leafletRequired: "true",
      jsonObject: JSON.stringify({
         contacts: data,
      }),
   });
});

module.exports = router;
