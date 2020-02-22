let brain;
let lr = 0.1;
let oo = [0, 0];
let ol = [0, 1];
let lo = [1, 0];
let ll = [1, 1];
let o = [0];
let l = [1];
let origin;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 400);
    canvas.parent('canvas');
    createP().parent('canvas');
    origin = createVector(width / 2, 0);
    brain = new NN(2, 5, 4, 1);
}

function draw() {
    background(51);
    noStroke();
    rectMode(CORNERS);
    brain.render();
    let r = floor(random(4));
    for (let i = 0; i < 10; i++) {
        if (r == 0) {
            brain.train(ol, l);
        } else if (r == 1) {
            brain.train(lo, l);
        } else if (r == 2) {
            brain.train(oo, o);
        } else {
            brain.train(ll, o);
        }
    }
    push();
    translate(origin.x, origin.y);
    for (let x = 0; x < 400; x += 10) {
        for (let y = 0; y < 400; y += 10) {
            let _in = [(x / 400), (y / 400)];
            let out = brain.predict(_in);
            //println(in[0] + ", " + in[1] + " = " + out[0]);
            fill(map(out[0], 0, 1, 0, 255));
            rect(x, y, x + 10, y + 10);
        }
    }
    pop();
}