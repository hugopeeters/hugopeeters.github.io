let fireworks = [];
let gravity;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 600, P2D);
    canvas.parent('canvas');
    createP().parent('canvas');
    colorMode(HSB);
    stroke(255);
    strokeWeight(4);
    gravity = createVector(0, 0.2);
    background(0);
}

function draw() {
    background(0, 255);
    if (random(1) < 0.08) {
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