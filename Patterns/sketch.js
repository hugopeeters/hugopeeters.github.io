let polys = [];
let angle = 60;
let delta = 10;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas');
    createP().parent('canvas');
    let inc = 100;
    for (let x = 0; x < width; x += inc) {
        for (let y = 0; y < height; y += inc) {
            let poly = new Polygon();

            //square pattern
            poly.addVertex(x, y);
            poly.addVertex(x + inc, y);
            poly.addVertex(x + inc, y + inc);
            poly.addVertex(x, y + inc);

            poly.close();
            polys.push(poly);
        }
    }
}

function draw() {
    background(51);
    for (let poly of polys) {
        poly.hankin();
        poly.show();
    }
}

function keyPressed() {
    if (key == 'a') {
        angle -= 5;
    }
    if (key == 's') {
        angle += 5;
    }
    if (key == 'z') {
        delta -= 1;
    }
    if (key == 'x') {
        delta += 1;
    }
}