const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
   res.render("index.html", {
      title: "Homepage",
      selfieData: [
         ["raph", "https://picsum.photos/id/100/100/100", "#1",],
         ["robin", "https://picsum.photos/id/102/200/100", "#2",],
         ["hugo", "https://picsum.photos/id/104/100/200", "#3",],
      ],
   });
});

module.exports = router;
