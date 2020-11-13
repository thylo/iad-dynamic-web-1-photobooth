const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const router = require("./routes");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const configureErrorHandlers = require("./errors");

//Make it work with codesandbox secrets
if (!process.env.PORT) {
   require("dotenv").config();
}
//Get the server port from env variables
const port = process.env.PORT;

//Setup templating language
nunjucks.configure("views", {
   autoescape: true,
   express: app,
});

app.use(
   session({
      secret: "laTVestMorte",
      saveUninitialized: false,
      resave: false,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      cookie: { maxAge: 60000 },
   })
);

app.use((req, res, next) => {
   res.locals.applicationName = "Photobooth app";
   next();
});

app.use(flash());
app.use(function (req, res, next) {
   const flash = req.flash();
   res.locals.messages = flash.messages;
   res.locals.errors = flash.errors;
   next();
});

//Inner logic
app.use(
   bodyParser.urlencoded({
      extended: true,
   })
);
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(router);

configureErrorHandlers(app);

app.listen(port, () => {
   console.log(`Photobooth app listening at http://localhost:${port}`);
});
