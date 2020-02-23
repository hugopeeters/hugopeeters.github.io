let ground;
let ship;
let ui;
let G;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas');
    createP().parent('canvas');
    ground = new Ground();
    ship = new Spaceship();
    G = createVector(0, 0.001);
    ui = new GUI();
}

function draw() {
    background(0);
    ground.render();
    ship.update();
    ship.render();
    ui.render();
}

function keyPressed() {
    //rotate
    if (keyCode == RIGHT_ARROW) {
        ship.dir = 1;
    } else if (keyCode == LEFT_ARROW) {
        ship.dir = -1;
    }
    //thrust
    if (keyCode == UP_ARROW) {
        ship.boosting = true;
    }
}

function keyReleased() {
    ship.dir = 0;
    ship.boosting = false;
}