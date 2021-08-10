var chakraImage;
var chakraProportion = 0.8;
var running = false;

var diameter = 0;
var currentDiameter = 0;
var minDiameterProportion = 0.05;

var breathingIn = true;
var breathCount = 0;

function preload() {
    sarinaFont = loadFont('fonts/Sarina-Regular.ttf');
    chakraImage = loadImage('img/logo-chakra.png')
}

function setup() {
    var parent = document.getElementById('breathe')
    var myCanvas = createCanvas(parent.offsetWidth, parent.offsetHeight)
    myCanvas.parent(parent.id);
    currentDiameter = diameter = parent.offsetWidth;
}

function draw() {
    clear();
    noStroke();

    drawGradient()
    drawChakra();
    drawText();

    if (running)
        breathe();
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
    if (currentDiameter > diameter) {
        breathingIn = false;
    }

    if (currentDiameter < (diameter * minDiameterProportion)) {
        breathingIn = true;
        breathCount++;
    }

    if (breathingIn) currentDiameter++
    else if (!breathingIn) currentDiameter--
}

document.getElementById('breathe').addEventListener('click', function () {
    running = true;
    currentDiameter = diameter * minDiameterProportion;
})