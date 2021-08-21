// Define the selectors

let button1 = document.querySelector('#butt-1');
let button2 = document.querySelector('#butt-2');
let button3 = document.querySelector('#butt-3');
let button4 = document.querySelector('#butt-4');
let button5 = document.querySelector('#butt-5');

let logoText = document.querySelector('#logo-text');
let explanationText = document.querySelector("#explanation");



// Event listeners to change look and feel when each button is clicked

button1.addEventListener('click', () =>{
    console.log("button1 clicked");
    document.body.style.background = "url('lnf/look-feel-1/sean-oulashin-KMn4VEeEPR8-unsplash.jpeg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    logoText.style.color = "#EDEBEC";
    explanationText.style.color = "#EDEBEC";
});

button2.addEventListener('click', () =>{
    console.log("button2 clicked");
    document.body.style.background = "url('lnf/look-feel-1/elizeu-dias-RN6ts8IZ4_0-unsplash.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    logoText.style.color = "#056B06";
    explanationText.style.color = "#056B06";
});

button3.addEventListener('click', () =>{
    console.log("button3 clicked");
    document.body.style.background = "url('lnf/look-feel-1/katerina-kerdi-yt1-v0TrOi8-unsplash.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    logoText.style.color = "#ECEAEB";
    explanationText.style.color = "#ECEAEB";
});

button4.addEventListener('click', () =>{
    console.log("button4 clicked");
    document.body.style.background = "url('lnf/look-feel-1/yang-wewe-H869_y8UJoI-unsplash.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    logoText.style.color = "#E9EBE8";
    explanationText.style.color = "#E9EBE8";
});

button5.addEventListener('click', () =>{
    console.log("button5 clicked");
    document.body.style.background = "url('lnf/look-feel-1/anastasia-taioglou-EEDLURXCpqg-unsplash.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    logoText.style.color = "#FFFFFF";
    explanationText.style.color = "#FFFFFF";
});




