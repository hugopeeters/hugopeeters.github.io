let fieldResolution = 50;
let fieldScale = 0.001;
let changeRate = 0.0025;
let x, y;
let xoff, yoff;
let zoff = 0;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas');
    createP().parent('canvas');
    colorMode(HSB, 255, 255, 255);
    rectMode(CENTER);
}

function draw() {
    background(0);

    for (x = 0; x < width + 10; x += fieldResolution) {
        for (y = 0; y < height + 10; y += fieldResolution) {
            xoff = x * fieldScale;
            yoff = y * fieldScale;
            let r = noise(xoff, yoff, zoff);
            let v = p5.Vector.fromAngle(r * TWO_PI);

            //DRAW MODE COLORED VECTORS
            push();
            translate(x, y);
            rotate(v.heading());
            stroke(255 * r, 255, 255);
            line(0, 0, fieldResolution * 0.75, 0);
            pop();

            //DRAW MODE COLORS
            //fill(255*r, 255, 255);
            //rect(x, y, fieldResolution, fieldResolution);
        }
    }
    zoff += changeRate;
}