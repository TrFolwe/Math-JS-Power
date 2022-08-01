const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const DARK_BACKGROUND__ = false;
const COLORFUL_MODE__ = true;

if(DARK_BACKGROUND__) document.getElementsByTagName("body")[0].style.backgroundColor = "black";

const startPosition = {
    x: canvas.width/2,
    y: canvas.height/2
};

function circleDrawF(x, y, color, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawRect(x, y, width, height, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.closePath();
}

const objectOptions = {
    "object": "circle",
    "randomObject": true,
    "circle": {
        "initialRadian": 0,
        "initialRadius": 3,
        "minScale": 10,
        "maxScale": 10,
        "movementRadius": 1,
        "maxRadius": 800,
        "speed": 25,
        "color": "RANDOM"
    },
    "cube": {
        "initialRadian": 0,
        "initialRadius": 3,
        "minScale": 25,
        "maxScale": 25,
        "movementRadius": 1,
        "maxRadius": 800,
        "speed": 25,
        "color": "RANDOM"
    }
};

const myObject = {
    "radian": objectOptions[objectOptions.object].initialRadian,
    "radius": objectOptions[objectOptions.object].initialRadius,
};

function resetObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(objectOptions.randomObject) objectOptions.object = objectOptions.object === "circle" ? "cube" : "circle";
    myObject.radian = objectOptions[objectOptions.object].initialRadian;
    myObject.radius = objectOptions[objectOptions.object].initialRadius;
}

function render() {
    if(!Object.keys(objectOptions).includes(objectOptions.object)) {
        console.error("Object type not found!!!");
        return;
    }
    let posX = Math.cos(myObject.radian) * myObject.radius + startPosition.x;
    let posY = Math.sin(myObject.radian) * myObject.radius + startPosition.y;
    let selectedObject = objectOptions[objectOptions.object];
    let color = selectedObject.color === "RANDOM" ? "#" + Math.floor(Math.random()*16777215).toString(16) : selectedObject.color;
    let scale = random(selectedObject.minScale, selectedObject.maxScale);

    if(myObject.radius > selectedObject.maxRadius) {
        resetObjects();
    }

    objectOptions.object === "circle" ? circleDrawF(posX, posY, color, scale) : drawRect(posX, posY, scale, scale, color);
    myObject.radian += (Math.PI / 180) * selectedObject.speed;
    myObject.radius += selectedObject.movementRadius;
    requestAnimationFrame(render);
}
render();
