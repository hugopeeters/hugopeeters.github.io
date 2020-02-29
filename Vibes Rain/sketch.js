let logo;
let pxl;
let gravity;
let rain;
let wind;
let w;
let wOff;


function preload() {
    logo = loadImage('logo/logo.png');
}

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas');
    createP().parent('canvas');

    pxl = new Array(width);
    logo.loadPixels();
    let d = pixelDensity();
    for (let x = 0; x < width; x++) {
        pxl[x] = new Array(height);
        for (let y = 0; y < height; y++) {
            let off = (y * width + x) * 4;
            if (logo.pixels[off + 3] == 255) {
                pxl[x][y] = 255;
            }
        }
    }

    gravity = createVector(0, 1);
    w = createVector(0, 0);
    wOff = 0;
    rain = new Array(0);
    for (let i = 0; i < 4500; i++) {
        let d = new Drop();
        d.randomize();
        rain.push(d);
    }
}

function draw() {
    background(5);
    for (let i = 0; i < rain.length; i++) {
        rain[i].update();
        rain[i].render();
    }
}