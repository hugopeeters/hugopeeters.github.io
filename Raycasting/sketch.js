let walls = [];
let particle;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas');
    createP().parent('canvas');
    for (let i = 0; i < 5; i++) {
        walls.push(new Boundary(random(100, 700), random(100, 700), random(100, 700), random(100, 700)));
        walls.push(new Boundary(0, 0, width, 0));
        walls.push(new Boundary(width, 0, width, height));
        walls.push(new Boundary(width, height, 0, height));
        walls.push(new Boundary(0, height, 0, 0));
    }
    particle = new Particle();
}

function draw() {
    background(0);
    for (let wall of walls) {
        wall.render();
        particle.look(walls);
    }
    particle.render();
    particle.update(mouseX, mouseY);
}