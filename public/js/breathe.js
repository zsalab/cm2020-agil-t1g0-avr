// This global gets changed by the selector buttons
textColour = [0xED,0xEB,0xEC];
outlineColour = [0x32,0x69,0x6E];
breathingAnimationColour = [0x9D,0xB7,0xB8];

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

var durationFadeRate = 10;
var durationOpacity = 255;
var durationSelSize = 35;
var durations = [
	{ x: 20, y:  90, minutes: 1, selected: true },
	{ x: 20, y: 160, minutes: 2, selected: false },
	{ x: 20, y: 230, minutes: 5, selected: false },
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
	
	frameRate(25);
}

function draw() {
	clear();
	noStroke();

	drawBreathingAnimation();
	drawDurationSelector();
	
	if (running)
		breathe();
	
}

function drawBreathingAnimation() {
	drawGradient()
	drawChakra();
	drawText();
}

function drawGradient() {
	for (var r = 0; r < currentDiameter; ++r) {
		var alphaFactor = 1.0 - (r / diameter);
		fill(breathingAnimationColour[0], breathingAnimationColour[1], breathingAnimationColour[2], alphaFactor * 255.0);
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

function drawDurationSelector() {
	for (var i = 0; i < durations.length; i++) {
		fill(breathingAnimationColour[0], breathingAnimationColour[1], breathingAnimationColour[2], durationOpacity);
		strokeWeight(2);
		if (durations[i].selected || animLength == durations[i].minutes*60)
			stroke(outlineColour[0], outlineColour[1], outlineColour[2], durationOpacity);
		else
			stroke(255, 255, 255, Math.min(40, durationOpacity));
		ellipse(durations[i].x, durations[i].y, durationSelSize);
		textAlign(CENTER, CENTER);
		noStroke();
		fill(textColour[0], textColour[1], textColour[2], durationOpacity);
		textSize(16);
		text(""+durations[i].minutes+'"', durations[i].x, durations[i].y);
	}
	if (!running)
		durationOpacity = Math.min(durationOpacity + durationFadeRate, 255)
	else
		durationOpacity = Math.max(durationOpacity - durationFadeRate, 0)
}

function breathe() {
	var secAngle = 360 / (animLength % 360);
	var archSize = (getCurrentSec() - startedAt) * secAngle;
	var sw = map(currentDiameter, 0, diameter, 1, 10, 50);
	strokeWeight(sw);
	stroke(outlineColour[0], outlineColour[1], outlineColour[2]);
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
	if (!running) {
		mousePressedIfOnBreathingAnimation();
		mousePressedIfOnDurationSelector();
	}
}

function mousePressedIfOnBreathingAnimation() {
	var d = dist(mouseX, mouseY, width / 2, height / 2);
	var clickedOnStart = (d < diameter/2);
	if (clickedOnStart) {
		running = true;
		currentDiameter = diameter * minDiameterProportion;
		startedAt = getCurrentSec();
		if (animLength == 0) {
			var selectedDuration = durations[0];
			for (var i = 0; i < durations.length; i++)
				if (durations[i].selected) {
					selectedDuration = durations[i];
					break;
				}
			animLength = selectedDuration.minutes*60;
		}
	}
}

function mousePressedIfOnDurationSelector() {
	for (var i = 0; i < durations.length; i++) {
		var duration = durations[i];
		var d = dist(mouseX, mouseY, duration.x, duration.y);
		var clickedOnSelector = (d < durationSelSize / 2);
		if (clickedOnSelector) {
			for (var j = 0; j < durations.length; j++) durations[j].selected = false;
			duration.selected = true;
			return;
		}
	}
}

function getCurrentSec() {
	return new Date().getTime() / 1000;
}
