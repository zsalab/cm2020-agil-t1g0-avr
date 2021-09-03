// Required External Modules
const express = require("express");
const path = require("path");

// App Variables
const app = express();
const port = process.env.PORT || "8000";

// App Configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Routes Definitions
app.get("/", (req, res) => {
	res.render("index", { title: "Breath, 60 seconds of Clarity. Peace. Serenity." });
});

let abCount = 0;
app.get("/ab", (req, res) => {
	abCount++
	if (abCount % 2 == 0)
		res.redirect('https://forms.gle/9GYeLTKXcYRyCfnr5'); // VERSION: PROTOTYPE
	else
		res.redirect('https://forms.gle/HwVPq2Corweropey6'); // VERSION: ENHANCED BREATHING ANIMATION
});

// Server Activation
app.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
});
