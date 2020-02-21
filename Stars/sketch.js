let maxSpeed = 50;
let minSpeed = 1;
let numStars = 1500;
let speedSlider;
let stars;
let speed;

function setup() {
  createP().parent('canvas');
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas');
    createP().parent('canvas');
  stars = new Array(numStars);
  for (let i = 0; i < stars.length; i++){
    stars[i] = new Star();
  }
  createP('<h3>Speed:</h3>').parent('canvas');
  speedSlider = createSlider(1, 50, 5, 1);
  speedSlider.parent('canvas');
}

function draw() {
  background(0);
  translate(width/2,height/2);
  speed = speedSlider.value();
  for (let i = 0; i < stars.length; i++){
    stars[i].update();
    stars[i].show();
    
    //speedometer
    fill(128);
    noStroke();
    rect(25 - width/2, 25 - height/2, 200, 50);
    fill(map(speed, minSpeed, maxSpeed, 0, 255), map(speed, minSpeed, maxSpeed, 255, 0), 0);
    rect(30 - width/2, 30 - height/2, map(speed, minSpeed, maxSpeed, 0, 190), 40);
  }
}