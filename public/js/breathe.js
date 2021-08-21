// This global gets changed by the selector buttons
textColour = [0xED,0xEB,0xEC];

var chakraImage;
var chakraProportion = 0.8;
var running = false;

var diameter = 0;
var currentDiameter = 0;
var minDiameterProportion = 0.05;
var animPadding = 80;

var breathingIn = true;
var breathCount = 0;

var startedAt = 0;
var animLength = 0;
var animWidth = 0;
var midnight = Math.PI*1.5;

var lengthSelSize = 30;
var lengths = [
	{ x: 20, y: 30, minutes: 1},
	{ x: 20, y: 70, minutes: 2},
	{ x: 20, y: 110, minutes: 5},
];

function preload() {
	sarinaFont = loadFont('fonts/Sarina-Regular.ttf');
	chakraImage = loadImage('img/logo-chakra.png')
}

function setup() {
	var parent = document.getElementById('breathe')
	var myCanvas = createCanvas(parent.offsetWidth, parent.offsetHeight)
	myCanvas.parent(parent.id);
	animWidth = parent.offsetWidth;
	currentDiameter = diameter = animWidth - animPadding;
}

function draw() {
	clear();
	noStroke();

	drawGradient()
	drawChakra();
	drawText();

	drawLengthSelector();
	
	if (running) {
		breathe();
	}
	
}

function drawLengthSelector() {
	for (var i = 0; i < lengths.length; i++) {
		fill(157, 183, 184);
		if (animLength == lengths[i].minutes*60) {
			strokeWeight(2);
			stroke(0, 0, 0);
		} else {
			strokeWeight(1);
			stroke(100, 100, 100);
		}
		ellipse(lengths[i].x, lengths[i].y, lengthSelSize);
		textAlign(CENTER, CENTER);
		noStroke();
		fill(textColour[0], textColour[1], textColour[2]);
		textSize(16);
		text(""+lengths[i].minutes+'"', lengths[i].x, lengths[i].y);
	}
}

function drawGradient() {
	for (var r = 0; r < currentDiameter; ++r) {
		var alphaFactor = 1.0 - (r / diameter);
		fill(157, 183, 184, alphaFactor * 255.0);
		ellipse(width / 2, height / 2, r);
	}
}

function drawChakra() {
	tint(255, 63);
	var w = diameter * chakraProportion;
	var h = diameter * chakraProportion;
	image(chakraImage, (width-w)/2, (height-h)/2, w, h)
}

function drawText() {
	textFont(sarinaFont);
	textAlign(CENTER, CENTER);
	noStroke();
	fill(textColour[0], textColour[1], textColour[2]);
	if (!running) {
		textSize(32);
		text('Start', width / 2, height / 2)
	}
	else {
		textSize(24);
		if (breathingIn)
			text('breath in', width / 2, height / 2)
		else
			text('breath out', width / 2, height / 2)
	}
}

function breathe() {
	var secAngle = 360 / (animLength % 360);
	var archSize = (getCurrentSec() - startedAt) * secAngle;
	var sw = map(currentDiameter, 0, diameter, 1, 4);
	strokeWeight(sw);
	stroke(255, 204, 0);
	noFill();
	arc(width / 2, height / 2, currentDiameter-(sw+1), currentDiameter-(sw+1), midnight, midnight + archSize * (Math.PI/180));

	if (currentDiameter > diameter) {
		breathingIn = false;
	}

	if (currentDiameter < (diameter * minDiameterProportion)) {
		breathingIn = true;
		breathCount++;
	}

	if (breathingIn) currentDiameter++
	else if (!breathingIn) currentDiameter--

	if (getCurrentSec() >= startedAt+animLength) {
		startedAt = 0;
		currentDiameter = diameter = animWidth - animPadding;
		running = false;
	}
}

function mousePressed() {
	let d = dist(mouseX, mouseY, width / 2, height / 2);
	if ((d < diameter/2) && !running) {
		running = true;
		currentDiameter = diameter * minDiameterProportion;
		startedAt = getCurrentSec();
		if (animLength == 0) {
			animLength = lengths[1].minutes*60;
		}
//		animLength = 5;
	}
	for (var i = 0; i < lengths.length; i++) {
		let d = dist(mouseX, mouseY, lengths[i].x, lengths[i].y);
		if ((d < lengthSelSize/2) && !running) {
			animLength = lengths[i].minutes*60;
		}
	}
}

function getCurrentSec() {
	return new Date().getTime() / 1000;
}
