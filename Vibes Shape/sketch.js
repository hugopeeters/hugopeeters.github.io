let logoData;
let scl = 0.6666667;

function preload() {
    logoData = loadJSON('logo/vibes.json');
}

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(scl * 800, scl * 800);
    canvas.parent('canvas');
    createP().parent('canvas');
    colorMode(HSB, 360, 255, 255, 255);
}

function draw() {
    background(5);
    if (random(1) < 0.1) {
        changeColors();
    }
    for (let v of logoData.vibes) {
        beginShape();
        for (let p of v.points) {
            vertex(scl * p.x, scl * p.y);
        }
        endShape(CLOSE);
    }
}

function changeColors() {
    fill(floor(random(0, 360)), 255, 255, 255);
}