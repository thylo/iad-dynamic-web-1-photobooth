const express = require("express");
const router = express.Router();
const db = require("../config/database");

const moods = ["happy", "bored", "sad", "neutral"];

/* GET users listing. */
router.get("/", async function (req, res, next) {
	console.log(res.locals);
	res.render("form/create.html", {
		title: "Create new selfie",
		moods,
		errors: res.locals.errors || [],
	});
});

router.post("/", function (req, res, next) {
	const body = req.body;
	console.log(body);
	let hasError = false;
	if (!body.name) {
		hasError = true;
		req.flash("errors", { field: "name", msg: "Please select a name" });
	}
	if (!body.mood) {
		hasError = true;
		req.flash("errors", { field: "mood", msg: "Please select a mood" });
	}
	if (hasError) {
		req.flash("messages", {
			level: "error",
			msg: "Ooops something went wrong...",
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
