const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const path = require("path");
//Get the server port from env variables
const port = process.env.PORT;

//Setup templating language
nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.use(express.static(path.join("..", "public")));
app.get("/", function (req, res) {
  res.render("index.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
