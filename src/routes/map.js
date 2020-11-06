const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
   res.render("map.html", {
      title: "Show location of selfies",
      leafletRequired: "true",
      jsonObject: JSON.stringify({
         contacts: [
            {
               name: "name1",
               imageUrl: "https://picsum.photos/id/100/100/100",
               lat: 51.5,
               lon: -0.09,
               emotion: "happy",
            },
            {
               name: "name2",
               imageUrl: "https://picsum.photos/id/200/100/100",
               lat: 52.5,
               lon: -5.09,
               emotion: "sad",
            },
            {
               name: "name3",
               imageUrl: "https://picsum.photos/id/300/100/100",
               lat: 40.5,
               lon: 7.09,
               emotion: "gorgous",
            },
         ],
      }),
   });
});

module.exports = router;
