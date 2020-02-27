let logo;

function preload() {
    logo = loadImage('logo/Eindhoven_ZW_Beeldmerk_BB.png');
}

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas');
    createP().parent('canvas');
}

function draw() {
    background(51);
    image(logo, 0, 0, width, height);
    let x = width / 4;
    let y = height / 2;
    fill(255);
    textSize(64);
    text('Coming Soon', x, y);
}