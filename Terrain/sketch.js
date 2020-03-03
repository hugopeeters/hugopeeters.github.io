let cols, rows;
let scl = 10;
let terrain = [];

let flying = 0;
let xSlider;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800, WEBGL);
    canvas.parent('canvas');
    createP().parent('canvas');

    cols = width / scl;
    rows = height / scl;
    terrain = new Array(cols);
    for (let i = 0; i < cols + 1; i++) {
        terrain[i] = new Array(rows);
    }

    xSlider = createSlider(-1, 1, 0, 0.01);
    xSlider.parent('canvas');
}

function draw() {

    flying -= 0.025;

    let yoff = flying;
    for (let y = 0; y < rows; y++) {
        let xoff = xSlider.value();
        for (let x = 0; x < cols + 1; x++) {
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
            xoff += 0.075;
        }
        yoff += 0.075;
    }
    
    background(75, 75, 255);
    translate(-width / 2, -height / 4);
    rotateX(PI / 3);
    for (let y = 0; y < rows; y++) {
        beginShape(LINES);
        for (let x = 0; x < cols + 1; x++) {
            vertex(x * scl, y * scl, terrain[x][y]);
            vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
        }
        endShape();
    }
}