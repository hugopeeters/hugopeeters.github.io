let myTextSize = 20;
let mono;

function preload() {
    mono = loadFont("matrix.ttf");
}

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas');
    createP().parent('canvas');
    streams = [];
    let x = 0;
    let dx = myTextSize / 2;
    for (let i = 0; i < width / dx; i++) {
        streams.push(new Stream(x));
        x += dx + random(-4, 4);
    }
}

function draw() {
    background(0, 50);
    rectMode(CENTER);
    textFont(mono);
    for (let s of streams) {
        textSize(s.size);
        s.render();
    }
}