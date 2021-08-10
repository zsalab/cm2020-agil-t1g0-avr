var diam = 100;
var inOut = true;
var breath_counter = 0;
var num_breath_slider;
var start = 0;

function preload() {
  sarinaFont = loadFont('sarina.regular.ttf');
}

function setup() {
    createCanvas(400, 600);
  
    num_breath_slider = createSlider(10, 50, 20, 2);
    num_breath_slider.position(150, 20);
    num_breath_slider.style('width', '80px');
}

function draw() {
  clear();
    textSize(20);
    textFont('Georgia');
    noStroke();
    fill(157, 183, 184);
    textSize(15);
    text("Number of breaths: ", 80, 30);
    text(num_breath_slider.value(), 250, 30);
    
    if (start){
      textSize(50);
      fill(157, 183, 184);
      ellipse(width / 2, (height / 2) * 0.9, diam);
      breathe();
    }
    else{
      fill(157, 183, 184);
      ellipse(width / 2, (height / 2) * 0.9, diam*2);
      textSize(30);
      textAlign(CENTER, CENTER);
      textFont(sarinaFont);
      fill(255,255,255);
      text("Start", width / 2, height/2 - 30);
    }
}

function breathe(){
    if (diam > 400) {
        inOut = false;
        breath_counter = breath_counter + 1;
    }

    if (diam < 50) {
        inOut = true;
        breath_counter = breath_counter + 1;
    }
    fill(110, 161, 164);
    if (inOut) {
        textFont(sarinaFont);
        text("Breathe In", width / 2, height - 80);
        diam++
    }

    if (!inOut) {
        textFont(sarinaFont);
        text("Breathe Out", width / 2, height - 80);
        diam--
    }
    textSize(20);
    textFont('Georgia');
    if (num_breath_slider.value() - breath_counter == 0){
        noLoop();
        }
    text(
      "Breaths remaining: " + (num_breath_slider.value() - breath_counter), 
      width / 2, height - 30
    );
}

function mouseClicked(event) {
  start = 1;
}