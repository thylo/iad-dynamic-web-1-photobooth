const express = require("express");
const router = express.Router();
const db = require("../config/database");


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		console.log(file);
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const moods = require('../config/moods.json');
const upload = multer({ storage: storage, fileFilter: fileFilter });

/* GET users listing. */
router.get("/", async function (req, res, next) {
	console.log(res.locals);
	res.render("form/create.html", {
		title: "Create new selfie",
		moods,
		errors: res.locals.errors || [],
	});
});

router.post("/", upload.single("uploaded_file"), function (req, res, next) {
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
	if (!body.lat || !body.lon) {
		hasError = true;
		req.flash("errors", { field: "lat", msg: "Please input a position" });
	}
	if (!req.file) {
		hasError = true;
		req.flash("errors", { field: "selfie", msg: "Please select a selfie" });
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
			time: Date.now(), //optional

			position: {
				lat: req.body.lat,
				lon: req.body.lon,
			},
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
