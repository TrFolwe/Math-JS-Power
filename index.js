const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");

const DARK_BACKGROUND__ = false;
const COLORFUL_MODE__ = true;

if(DARK_BACKGROUND__) document.getElementsByTagName("body")[0].style.backgroundColor = "black";

let startPosition = {
    x: canvas.width/2,
    y: canvas.height/2
}

let hexColors = [
    "#d6def9",
    "#dee8fd",
    "#e7f4f3",
    "#fbf8dc",
    "#fbfaeb",
    "#e0ded8",
    "#e3c5d2",
    "#d5a5be",
    "#c1e2e5",
    "#85cddb"
];

function circleDrawF(x, y) {
    const RANDOM_COLORS = "#"+Math.floor(Math.random()*16777215).toString(16);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = COLORFUL_MODE__ ? RANDOM_COLORS : hexColors[Math.floor(Math.random() * hexColors.length)];
    ctx.fill();
    ctx.closePath();
}

function drawRect(x, y) {
    const RANDOM_COLORS = "#"+Math.floor(Math.random()*16777215).toString(16);
    ctx.beginPath();
    ctx.fillStyle = COLORFUL_MODE__ ? RANDOM_COLORS : hexColors[Math.floor(Math.random() * hexColors.length)];
    ctx.fillRect(x, y, 25, 25);
    ctx.closePath();
}

let options = ["circle","cube"];
let selectedOption = options[0];

let Ball = {
    rad: 0,
    RADIUS: 3,
    speed: 25,
    RadiusBlob: 1,
    maxRadius: 800
};

function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Ball.rad = 0;
    Ball.RADIUS = 0;
    let randomMode = false;
    if(randomMode) selectedOption = selectedOption === "circle" ? options[1] : options[0];
}

function render() {    
    if(Ball.RADIUS > Ball.maxRadius) reset();
    selectedOption ==="circle" ? circleDrawF(Math.cos(Ball.rad)*Ball.RADIUS+startPosition.x, Math.sin(Ball.rad)*Ball.RADIUS+startPosition.y) : drawRect(Math.cos(Ball.rad)*Ball.RADIUS+startPosition.x, Math.sin(Ball.rad)*Ball.RADIUS+startPosition.y);
    Ball.rad += (Math.PI/180)*Ball.speed;
    Ball.RADIUS+=Ball.RadiusBlob;
    requestAnimationFrame(render);
}
render();