let n = 0;
let c = 4;
let deg = 137.3;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(600, 600);
    canvas.parent('canvas');
    createP().parent('canvas');
    background(51);
    colorMode(HSB);
}

function draw() {
    let a = n * radians(deg);
    let r = c * sqrt(n);
    let x = r * cos(a) + width / 2;
    let y = r * sin(a) + height / 2;

    fill((r) % 360, 255, 255);
    noStroke();
    ellipse(x, y, 4, 4);
    n++;
}