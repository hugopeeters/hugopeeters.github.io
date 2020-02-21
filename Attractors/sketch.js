///Attractors///
// by HugoPeeters
// Based on the CodingTrain challenge 56
// A few thousand particles get attracted by a handful of moving attractors
// The particles' paths are colored by their speed
// The initial conditions and speed restrictions are adjustable to create different results.

let attractors, particles;
let numParticles, numAttactors, alphaX, colorOffset;
let maxSpeed, speed, vinit, spread, strW, dimX, dimY;
let margin = 50;
let button, numParticlesSlider, maxSpeedSlider, speedSlider, numAttactorsSlider, vinitSlider, spreadSlider, strWSlider, colorOffsetSlider, rndButton;

function resetX() {
  frameCount = 0; //the framecount is being used to slowly decrease the alpha
  numParticles = numParticlesSlider.value();
  maxSpeed = maxSpeedSlider.value();
  speed = speedSlider.value();
  numAttactors = numAttactorsSlider.value();
  vinit = vinitSlider.value();
  spread = spreadSlider.value();
  strW = sqrt(strWSlider.value());
  colorOffset = round(colorOffsetSlider.value());
  background(0);
  
  //create attractors and particles
  particles = new Array(numParticles);

  //pick random position
  let x = random(margin, width - margin);
  let y = random(margin, height - margin);
  for (let i = 0; i < particles.length; i++) {
    //add spread
    let xi = x * random(1 + spread, 1 - spread);
    let yi = y * random(1 + spread, 1 - spread);
    particles[i] = new Particle(createVector(xi, yi));
  }

  attractors = new Array(numAttactors);
  for (let i = 0; i < numAttactors; i++) {
    attractors[i] = new Attractor();
  }
}

function setup() {
  createCanvas(1000, 800);
  initSliders();
  button = createButton('restart');
  button.position(20, height + 200);
  button.mousePressed(resetX);
  rndButton = createButton('random');
  rndButton.position(80, height + 200);
  rndButton.mousePressed(randomize);
  resetX();
}

function randomize() {
  removeSliders();
  initSliders();
  resetX();
}

function removeSliders() {
  numParticlesSlider.remove();
  maxSpeedSlider.remove()
  speedSlider.remove();
  numAttactorsSlider.remove();
  vinitSlider.remove();
  spreadSlider.remove();
  strWSlider.remove();
  colorOffsetSlider.remove();
}

function initSliders() {
  numParticlesSlider = createSlider(100, 5000, round(random(100, 5000)));
  numParticlesSlider.position(20, height + 220);
  maxSpeedSlider = createSlider(1, 25, random(1, 25), 0.01);
  maxSpeedSlider.position(20, height + 240);
  speedSlider = createSlider(0, 3, random(0, 3), 0.01);
  speedSlider.position(20, height + 260);
  numAttactorsSlider = createSlider(1, 10, round(1, 10));
  numAttactorsSlider.position(20, height + 280);
  vinitSlider = createSlider(3, 7, random(3, 7), 0.01);
  vinitSlider.position(20, height + 300);
  spreadSlider = createSlider(0, 0.1, random(0, 0.1), 0.0001);
  spreadSlider.position(20, height + 320);
  strWSlider = createSlider(1, 16, random(1, 16), 0.1);
  strWSlider.position(20, height + 340);
  colorOffsetSlider = createSlider(0, 255, random(0, 255));
  colorOffsetSlider.position(20, height + 360);
}

function draw() {
  numParticles = numParticlesSlider.value();
  alphaX = 0.075 - frameCount / random(5000, 50000);
  if (alphaX <= 0) {
    console.log("resetting");
    resetX();
  }
  //loop throught the attractors
  for (let j = 0; j < attractors.length; j++) {
    //attractors[j].render(); //uncomment to see the attractors and their paths
    attractors[j].update(); //update the attractors' positions
  }
  //loop through the particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].render(); //draw the particles
    for (let j = 0; j < attractors.length; j++) {
      particles[i].getAttracted(attractors[j]); //apply attraction forces
    }
    particles[i].update(); //update the particles physics
  }
}