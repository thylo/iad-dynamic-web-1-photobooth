const express = require("express");
const router = express.Router();
const db = require("../config/database");
const multer  = require('multer');
const upload = multer({dest:'multer'});

const moods = [{label:"je pète la forme", value: "happy"},{label:"c'est l'ennui", value: "bored"},{label:"je suis tristesse", value: "sad"},{label:"c'est ok", value: "neutral"}];


/* GET users listing. */
router.get("/", async function (req, res, next) {
	console.log(res.locals);
	res.render("form/create.html", {
		title: "Create new selfie",
		moods,
		errors: res.locals.errors || [],
	});
});

router.post("/",upload.single('uploaded_file'), function (req, res, next) {
  const body = req.body;
  console.log(body);
  console.log(req.file);
  let hasError = false;
  if (!body.name) {
    hasError = true;
    req.flash("errors", { field: "name", msg: "Please select a name" });
  }
  if (!body.mood) {
    hasError = true;
    req.flash("errors", { field: "mood", msg: "Please select a mood" });
  }
  if (!req.file) {
    hasError = true;
    req.flash("errors", { field: "selfie", msg: "Please select a selfie" });
  }
  if (hasError) {
    req.flash("messages", {
      level: "error",
      msg: "Ooops something went wrong..."
    });
    res.redirect("/form");
    return;
  }
 
	//insérer données reçues
	db.insert(
		{
			time: Date.now(),
			name: req.body.name,
      mood: req.body.mood,
      image: req.file,
		},
		function (error, data) {
			if (error) {
				//si erreur
				req.flash("messages", {
					level: "error",
					msg: "Error: could not save in database, try again",
				});
				res.redirect("/form");
				return;
			}
			//si c'est fait, rediriger

			req.flash("messages", { level: "success", msg: "Created" });
			res.redirect("/");
		}
	);

});

module.exports = router;
