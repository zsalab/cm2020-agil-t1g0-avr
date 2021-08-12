var chakraImage;
var chakraProportion = 0.8;
var running = false;

var diameter = 0;
var currentDiameter = 0;
var minDiameterProportion = 0.05;

var breathingIn = true;
var breathCount = 0;

var startedAt = 0;
var animLength = 0;
var animWidth = 0;
var midnight = Math.PI*1.5;

function preload() {
	sarinaFont = loadFont('fonts/Sarina-Regular.ttf');
	chakraImage = loadImage('img/logo-chakra.png')
}

function setup() {
	var parent = document.getElementById('breathe')
	var myCanvas = createCanvas(parent.offsetWidth, parent.offsetHeight)
	myCanvas.parent(parent.id);
	animWidth = parent.offsetWidth;
	currentDiameter = diameter = animWidth;
}

function draw() {
	clear();
	noStroke();

	drawGradient()
	drawChakra();
	drawText();

	if (running) {
		breathe();
	}
}

function drawGradient() {
	for (var r = 0; r < currentDiameter; ++r) {
		var alphaFactor = 1.0 - (r / diameter);
		fill(157, 183, 184, alphaFactor * 255.0);
		ellipse(diameter / 2, diameter / 2, r);
	}
}

function drawChakra() {
	tint(255, 63);
	var width = diameter * chakraProportion;
	var height = diameter * chakraProportion;
	var x = (diameter - width) / 2;
	var y = (diameter - height) / 2;
	image(chakraImage, x, y, width, height)
}

function drawText() {
	textFont(sarinaFont);
	textAlign(CENTER, CENTER);
	noStroke();
	fill(255, 255, 255);
	if (!running) {
		textSize(32);
		text('Start', diameter / 2, diameter / 2)
	}
	else {
		textSize(24);
		if (breathingIn)
			text('breath in', diameter / 2, diameter / 2)
		else
			text('breath out', diameter / 2, diameter / 2)
	}
}

function breathe() {
	var secAngle = 360 / (animLength % 360);
	var archSize = (getCurrentSec() - startedAt) * secAngle;
	var sw = map(currentDiameter, 0, diameter, 1, 4);
	strokeWeight(sw);
	stroke(255, 204, 0);
	noFill();
	arc(diameter / 2, diameter / 2, currentDiameter-(sw+1), currentDiameter-(sw+1), midnight, midnight + archSize * (Math.PI/180));

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
		currentDiameter = diameter = animWidth;
		running = false;
	}
}

function getCurrentSec() {
	return new Date().getTime() / 1000;
}

document.getElementById('breathe').addEventListener('click', function() {
	if (!running) {
		running = true;
		currentDiameter = diameter * minDiameterProportion;
		startedAt = getCurrentSec();
		animLength = 60;
	}
})