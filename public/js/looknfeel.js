// Define the selectors
var logoText = document.querySelector('#logo-text');
var explanationText = document.querySelector("#explanation");

// Look & Feel Definitions
var lookAndFeelDefinitions = [
    {
        audioFile: 'audio/1.mp3',
        bgImage: 'img/sean-oulashin-KMn4VEeEPR8-unsplash.jpeg',
        logoTextColour: '#EDEBEC',
        explanationTextColour: '#EDEBEC',
        generalTextColour: [0xED,0xEB,0xEC],
        outlineColour: [0xED,0xEB,0xEC],
        breathingAnimationColour: [0x9D,0xB7,0xB8],
    },
    {
        audioFile: 'audio/2.mp3',
        bgImage: 'img/elizeu-dias-RN6ts8IZ4_0-unsplash.jpg',
        logoTextColour: '#ffffff',
        explanationTextColour: '#ffffff',
        generalTextColour: [0xff,0xff,0xff],
        outlineColour: [0xff,0xff,0xff],
        breathingAnimationColour: [0xb1, 0x99, 0x39],
    },
    {
        audioFile: 'audio/3.mp3',
        bgImage: 'img/katerina-kerdi-yt1-v0TrOi8-unsplash.jpg',
        logoTextColour: '#ECEAEB',
        explanationTextColour: '#ECEAEB',
        generalTextColour: [0xEC,0xEA,0xEB],
        outlineColour: [0xED,0xEB,0xEC],
        breathingAnimationColour: [0x13, 0x56, 0x80],
    },
    {
        audioFile: 'audio/4.mp3',
        bgImage: 'img/yang-wewe-H869_y8UJoI-unsplash.jpg',
        logoTextColour: '#E9EBE8',
        explanationTextColour: '#E9EBE8',
        generalTextColour: [0xE9,0xEB,0xE8],
        outlineColour: [0xED,0xEB,0xEC],
        breathingAnimationColour: [0x1c,0x44,0x89],
    },
    {
        audioFile: 'audio/5.mp3',
        bgImage: 'img/anastasia-taioglou-EEDLURXCpqg-unsplash.jpg',
        logoTextColour: '#FFFFFF',
        explanationTextColour: '#FFFFFF',
        generalTextColour: [0xE9,0xEB,0xE8],
        outlineColour: [0xED,0xEB,0xEC],
        breathingAnimationColour: [0x17,0x05,0x39],
    }
]

// Event listeners to change look and feel when each button is clicked
// The textColour variable is within the breathe.js file and changes the
// colour of the text in the p5.js animation
function loadLookAndFeel(definitions) {
    document.body.style.background = "url('" + definitions.bgImage + "') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    logoText.style.color = definitions.logoTextColour;
    explanationText.style.color = definitions.explanationTextColour;
    textColour=definitions.generalTextColour;
    outlineColour=definitions.outlineColour;
    breathingAnimationColour=definitions.breathingAnimationColour;
    bgAudio = definitions.audioFile;
    preloadSound(definitions.audioFile);
}

var btnSelectors = document.getElementsByClassName('btn-looknfeel');
for (var i = 0; i < btnSelectors.length; i++) {
    var btnSelector = btnSelectors[i];
    btnSelector.addEventListener('click', (evt) => {
        var button = evt.target;
        var lookAndFeelIndex = parseInt(button.getAttribute("data-looknfeel"));
        var definitions = lookAndFeelDefinitions[lookAndFeelIndex];
        loadLookAndFeel(definitions);
    });
}

// Preloads default audio
afterP5jsSetupSync = function () {
    var defaultDefinitions = lookAndFeelDefinitions[0];
    loadLookAndFeel(defaultDefinitions);
}

afterP5jsSetupAsync = function() {
    var defaultDefinitions = lookAndFeelDefinitions[0];
    preloadSound(defaultDefinitions.audioFile);
}