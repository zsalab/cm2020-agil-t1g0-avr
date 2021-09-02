// This global gets changed by the selector buttons
textColour = [0xED,0xEB,0xEC];
outlineColour = [0x32,0x69,0x6E];
breathingAnimationColour = [0x9D,0xB7,0xB8];
bgAudio = 'S1';

//animation vars
const breathInOutLenSec = 5;
const animFrameRate = 30;
const breathInOutFrameCnt = breathInOutLenSec * animFrameRate;
const breathHoldSec = 2;
const breatHoldFrameCnt = breathHoldSec * animFrameRate;
var diameter = 0.0;
var currentDiameter = 0.0;
var minDiameterProportion = 0.05;
var animPadding = 80;
var running = false;
const BREATH_IN = 'BI';
const BREATH_OUT = 'BO';
const HOLD_IN = 'HI';
const HOLD_OUT = 'HO';
var breathing = BREATH_IN;
var breathCount = 0;
var breathHold = 0;
var startedAt = 0;
var animLength = 0;
var animWidth = 0;
var animStep = 0;
var midnight = Math.PI*1.5;
var durationFadeRate = 10;
var durationOpacity = 255;
var durationSelSize = 35;
var durations = [
	{ x: 20, y:  90, minutes: 1, selected: true },
	{ x: 20, y: 160, minutes: 2, selected: false },
	{ x: 20, y: 230, minutes: 5, selected: false },
];

//chakra image vars
var chakraImage;
var chakraProportion = 0.8;

var bgSound = {}; //music var


function preload() {
	/*
	 * Preload font and sound files
	 */
	sarinaFont = loadFont('fonts/Sarina-Regular.ttf');
	chakraImage = loadImage('img/logo-chakra.png');

	for (i = 1; i <= 5; i++) {
		bgSound['S'+i] = loadSound('/audio/'+i+'.mp3');
	}
}

function setup() {
	/*
	 * Set canvas within parent element
	 */
	var parent = document.getElementById('breathe');
	var myCanvas = createCanvas(parent.offsetWidth, parent.offsetHeight);
	myCanvas.parent(parent.id);
	animWidth = parent.offsetWidth;
	currentDiameter = diameter = animWidth - animPadding;
	
	var diameterMaxChange = diameter - (diameter * minDiameterProportion);
	animStep = diameterMaxChange / breathInOutFrameCnt;
	
	frameRate(animFrameRate); //set static framerate
}

function draw() {
	/*
	 * Draw the canvas and content
	 */
	clear();
	noStroke();

	drawBreathingAnimation();
	drawDurationSelector();
	
	if (running) {
		breathe();
	}
}

function drawBreathingAnimation() {
	/*
	 * Draw the animation gradient, chakra image and overlay text
	 */
	drawGradient()
	drawChakra();
	drawText();
}

function drawGradient() {
	/*
	 * Animatie the loading bar gradient around the breathing animation
	 */
	for (var r = 0; r < currentDiameter; ++r) {
		var alphaFactor = 1.0 - (r / diameter);
		fill(breathingAnimationColour[0], breathingAnimationColour[1], breathingAnimationColour[2], alphaFactor * 255.0);
		ellipse(width / 2, height / 2, r);
	}
}

function drawChakra() {
	/*
	 * Draw chakra image logo for breathing animation
	 */
	tint(255, 63);
	var w = diameter * chakraProportion;
	var h = diameter * chakraProportion;
	image(chakraImage, (width-w)/2, (height-h)/2, w, h)
}

function drawText() {
	/*
	 * Draw the breathing in, hold, breathing out text
	 */
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
		switch (breathing) {
			case BREATH_IN:
				text('breathe in', width / 2, height / 2)
				break;
			case BREATH_OUT:
				text('breathe out', width / 2, height / 2)
				break;
			default:
				text('hold', width / 2, height / 2)
				break;
		}
	}
}

function drawDurationSelector() {
	/*
	 * Draw the duration buttons
	 */
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
	/*
	 * Draw the breathing animation
	 */
	if (breathing != HOLD_OUT) {
		var secAngle = 360 / (animLength % 360);
		var archSize = (getCurrentSec() - startedAt) * secAngle;
		var sw = map(currentDiameter, 0, diameter * (1-minDiameterProportion), 1, 10, 50);
		strokeWeight(sw);
		stroke(outlineColour[0], outlineColour[1], outlineColour[2]);
		noFill();
		arc(width / 2, height / 2, currentDiameter-(sw+1), currentDiameter-(sw+1), midnight, midnight + archSize * (Math.PI/180));
	}

	switch (breathing) {
		case BREATH_IN:
			//Adjust the animation to expand in size
			currentDiameter += animStep;
			if (currentDiameter >= diameter) {
				breathing = HOLD_IN;
				breathHold = 0;
			}
			break;
		case BREATH_OUT:
			//Adjust the animation to reduce in size
			currentDiameter -= animStep;
			if (currentDiameter <= (diameter * minDiameterProportion)) {
				breathing = HOLD_OUT;
				breathHold = 0;
			}
			break;
		case HOLD_IN:
			//Adjust the breathing animation to hold in
			breathHold++;
			if (breathHold >= breatHoldFrameCnt) {
				breathing = BREATH_OUT;
			}
			break;
		case HOLD_OUT:
			//Adjust the breathing animation to hold out
			breathHold++;
			if (breathHold >= breatHoldFrameCnt) {
				breathing = BREATH_IN;
				breathCount++;
			}
			break;
	}

	if (getCurrentSec() >= startedAt+animLength) {
		//reset the animation as the breathing exercise is complete
		reset();
	}
}

function reset() {
	/*
	 * Reset the breathing animation to the default start position
	 */
	running = false;
	startedAt = 0;
	currentDiameter = diameter = animWidth - animPadding;
	breathing = BREATH_IN;
	breathCount = 0;
	breathHold = 0;
	bgSound[bgAudio].stop();
}

function mousePressed() {
	mousePressedIfOnBreathingAnimation();
	mousePressedIfOnDurationSelector();
}

function mousePressedIfOnBreathingAnimation() {
	/*
	 * Start the breathing animation
	 */
	var d = dist(mouseX, mouseY, width / 2, height / 2);
	var clickedOnStart = (d < diameter/2);
	if (clickedOnStart) {
		if (running) {
			reset();
		} else {
			running = true;
			bgSound[bgAudio].play();
			bgSound[bgAudio].setLoop(true);
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
}

function mousePressedIfOnDurationSelector() {
	/*
	 * Set the breathing animation duration
	 */
	if (!running) {
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
}

function getCurrentSec() {
	//Get the current time for rendering purposes on the arch
	return new Date().getTime() / 1000;
}
