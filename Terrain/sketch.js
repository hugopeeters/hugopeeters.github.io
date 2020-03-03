let cols, rows;
let scl = 40;
let w = 3200;
let h = 3200;
let terrain = [];

let flying = 0;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800, WEBGL);
    canvas.parent('canvas');
    createP().parent('canvas');

    cols = w / scl;
    rows = h / scl;
    terrain = new Array(cols);
    for (let i = 0; i < cols; i++) {
        terrain[i] = new Array(rows);
    }
}

function draw() {

    flying -= 0.025;

    let yoff = flying;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -300, 300);
            xoff += 0.075;
        }
        yoff += 0.075;
    }
    background(75, 75, 255);
    translate(width / 2, height / 2 + 50);
    rotateX(PI / 3);
    translate(-w / 2, -h / 2);
    ambientLight(255);
    //directionalLight(255, 1, -1, 10000);
    specularMaterial(180, 180, 160);
    for (let y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < cols; x++) {
            vertex(x * scl, y * scl, terrain[x][y]);
            vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
        }
        endShape();
    }
}