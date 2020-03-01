let logo;
let pxl;
let x = 0;
let fireworks = [];
let gravity;

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

    background(52);
    stroke(255);
    strokeWeight(4);
    gravity = createVector(0, 0.2);
}

function draw() {
    background(0);

    if (random(1) < 0.3) {
        fireworks.push(new Firework());
    }
    for (let i = fireworks.length - 1; i >= 0; i--) {
        let f = fireworks[i];
        f.update();
        f.show();
        if (f.done()) {
            fireworks.splice(i, 1);
        }
    }
}