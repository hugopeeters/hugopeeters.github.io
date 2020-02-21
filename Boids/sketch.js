let boids = [];
let numBoids = 100

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas');
    createP().parent('canvas');
    for (let i = 0; i < numBoids; i++) {
        boids.push(new Boid(random(width), random(height)));
    }
    console.log(boids);
}

function draw() {
    background(52);
    for (let i = 0; i < numBoids; i++) {
        boids[i].render();
        boids[i].update();
    }
}