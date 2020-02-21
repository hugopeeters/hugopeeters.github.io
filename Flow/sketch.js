let fieldResolution = 10;
let fieldScale = 0.01;
let changeRate = 0.00005;
let numP = 5000;
let lineOpacity = 0.075;
let fieldForce = 1;
let maxVel = 5;
let showVectors = false;
let flowfield = [];

let xoff, yoff;
let zoff = 0;
let cols, rows, particles;

function setup() {
  createP().parent('canvas');
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas');
  createP().parent('canvas');
  cols = floor(width/fieldResolution);
  rows = floor(height/fieldResolution);
  colorMode(HSB, 255, 255, 255);
  rectMode(CENTER);
  ellipseMode(CENTER);
  particles = new Array(numP);
  for (let i = 0; i < numP; i++) {
    particles[i] = new Particle(createVector(random(width), random(height)));
  }
  background(0);
}

function draw() {
  //background(0);

  for (let x = 0; x < cols + 1; x += 1) {
    flowfield[x] = [];
    for (let y = 0; y < rows + 1; y += 1) {
      xoff = x * fieldScale;
      yoff = y * fieldScale;
      flowfield[x][y] = p5.Vector.fromAngle(noise(xoff, yoff, zoff) * TWO_PI);
      
      if (showVectors) {
        //DRAW VECTORS
        push();
        translate(x * fieldResolution, y * fieldResolution);
        rotate(flowfield[x][y].heading());
        stroke(255, 0.01);
        line(0, 0, fieldResolution*0.75, 0);
        pop();
      }
    }
  }
  zoff += changeRate;

  for (let i = 0; i < particles.length; i++) {
    particles[i].render();
    particles[i].update();
  }
}
