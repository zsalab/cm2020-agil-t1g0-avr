// Required External Modules
const express = require("express");
const path = require("path");
const fs = require('fs');

// App Variables
const app = express();
const port = process.env.PORT || "8000";

// variables
const BREATHS_PATH = 'data/breaths';

// App Configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Routes Definitions
app.get("/", (req, res) => {
	res.render("index", { 
		title: "Home",
		breath: {
			id: "tulip",
			title: "Tulip field",
			image: "/breath/tulip/image.jpg",
		}
	});
});

app.get("/breaths", (req, res) => {
	var retval = [];
	var files = fs.readdirSync(BREATHS_PATH);
	files.forEach(file => {
		var data = fs.readFileSync(BREATHS_PATH+'/'+file+"/settings.json")
		console.log(file+" "+JSON.parse(data));
		retval.push(JSON.parse(data));
	});
	res.status(200).type('json').send(JSON.stringify(retval));
});

app.get("/breaths/:id", (req, res) => {
	var f = BREATHS_PATH+'/'+parseInt(req.params.id)+"/settings.json";
	if (fs.existsSync(f)) {
		res.status(200).type('json').send(JSON.stringify(JSON.parse(fs.readFileSync(f))));
	} else {
		res.status(404).send("Breath not found");
	}
});

app.get("/breaths/:id/image", (req, res) => {
	var f = BREATHS_PATH+'/'+parseInt(req.params.id)+"/image.jpg";
	if (fs.existsSync(f)) {
		res.status(200).type('jpg').send(fs.readFileSync(f));
	} else {
		res.status(404).send("Breath image not found");
	}
});

app.get("/breaths/:id/animation", (req, res) => {
	var f = BREATHS_PATH+'/'+parseInt(req.params.id)+"/sketch.js";
	if (fs.existsSync(f)) {
		res.status(200).type('js').send(fs.readFileSync(f));
	} else {
		res.status(404).send("Breath image not found");
	}
});

// Server Activation
app.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
});
