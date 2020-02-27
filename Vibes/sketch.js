function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas');
    createP().parent('canvas');
}

function draw() {
    background(51);
    let x = width / 4;
    let y = height / 2;
    fill(255);
    textSize(64);
    text('Coming Soon', x, y);
}