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
let abVersions = [
	'https://forms.gle/ARE44MHuAmeMbhCK9',
	'https://forms.gle/qmyfAVDaGAH5KpwVA',
	'https://forms.gle/HAKbNP3PsJHfGXcF7'
];
app.get("/survey", (req, res) => {
	abCount++
	let abIndex = abCount % abVersions.length
	let abUrl = abVersions[abIndex];
	res.redirect(abUrl);
});

// Server Activation
app.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
});
