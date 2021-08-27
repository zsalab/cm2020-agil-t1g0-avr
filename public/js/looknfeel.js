// Define the selectors

let button1 = document.querySelector('#butt-1');
let button2 = document.querySelector('#butt-2');
let button3 = document.querySelector('#butt-3');
let button4 = document.querySelector('#butt-4');
let button5 = document.querySelector('#butt-5');

let logoText = document.querySelector('#logo-text');
let explanationText = document.querySelector("#explanation");



// Event listeners to change look and feel when each button is clicked
// The textColour variable is within the breathe.js file and changes the
// colour of the text in the p5.js animation

button1.addEventListener('click', () =>{
    console.log("button1 clicked");
    document.body.style.background = "url('img/sean-oulashin-KMn4VEeEPR8-unsplash.jpeg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    logoText.style.color = "#EDEBEC";
    explanationText.style.color = "#EDEBEC";
    textColour=[0xED,0xEB,0xEC];
    outlineColour=[0xED,0xEB,0xEC];
    breathingAnimationColour=[0x9D,0xB7,0xB8];
    bgAudio = 'S1';
});

button2.addEventListener('click', () =>{
    console.log("button2 clicked");
    document.body.style.background = "url('img/elizeu-dias-RN6ts8IZ4_0-unsplash.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    logoText.style.color = "#ffffff";
    explanationText.style.color = "#ffffff";
    textColour=[0xff,0xff,0xff];
    outlineColour=[0xff,0xff,0xff];
    breathingAnimationColour=[0xb1, 0x99, 0x39];
    bgAudio = 'S2';
});

button3.addEventListener('click', () =>{
    console.log("button3 clicked");
    document.body.style.background = "url('img/katerina-kerdi-yt1-v0TrOi8-unsplash.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    logoText.style.color = "#ECEAEB";
    explanationText.style.color = "#ECEAEB";
    textColour=[0xEC,0xEA,0xEB];
    outlineColour=[0xED,0xEB,0xEC];
    breathingAnimationColour=[0x13, 0x56, 0x80];
    bgAudio = 'S3';
});

button4.addEventListener('click', () =>{
    console.log("button4 clicked");
    document.body.style.background = "url('img/yang-wewe-H869_y8UJoI-unsplash.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    logoText.style.color = "#E9EBE8";
    explanationText.style.color = "#E9EBE8";
    textColour=[0xE9,0xEB,0xE8];
    outlineColour=[0xED,0xEB,0xEC];
    breathingAnimationColour=[0x1c,0x44,0x89];
    bgAudio = 'S4';
});

button5.addEventListener('click', () =>{
    console.log("button5 clicked");
    document.body.style.background = "url('img/anastasia-taioglou-EEDLURXCpqg-unsplash.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    logoText.style.color = "#FFFFFF";
    explanationText.style.color = "#FFFFFF";
    textColour=[0xFF,0xFF,0xFF];
    outlineColour=[0xED,0xEB,0xEC];
    breathingAnimationColour=[0x17,0x05,0x39];
    bgAudio = 'S5';
});
