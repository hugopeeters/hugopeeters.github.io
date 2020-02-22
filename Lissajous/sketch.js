let leftDrivers, topDrivers;
let curves = [];
let baseSpeed = 0.02;
let cellSize = 100;
let rows, cols;
let pos;
let speed, diameter;
let type;

function setup() {
  createP().parent('canvas');
  let canvas = createCanvas(800, 800);
  canvas.parent('canvas');
  createP().parent('canvas');
  rows = floor(height / cellSize);
  cols = floor(width / cellSize);
  leftDrivers = new Array(rows - 1);
  topDrivers = new Array(cols - 1);
  curves = new Array(rows - 1);

  for (let i = 0; i < leftDrivers.length; i++) {
    leftDrivers[i] = new Driver(createVector(cellSize / 2, (i + 1.5) * cellSize), type = "left", i + 1, 0.8 * cellSize);
  }
  for (let i = 0; i < topDrivers.length; i++) {
    topDrivers[i] = new Driver(createVector((i + 1.5) * cellSize, cellSize / 2), type = "top", -i - 1, 0.8 * cellSize);
  }
  for (let i = 0; i < rows - 1; i++) {
    curves[i] = new Array(cols - 1);
    for (let j = i; j < cols - 1; j++) {
      curves[i][j] = new Curve(createVector((i + 1.5) * cellSize, (j + 1.5) * cellSize));
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < leftDrivers.length; i++) {
    leftDrivers[i].update();
    leftDrivers[i].render();
  }
  for (let i = 0; i < topDrivers.length; i++) {
    topDrivers[i].update();
    topDrivers[i].render();
  }
  for (let i = 0; i < rows - 1; i++) {
    for (let j = i; j < cols - 1; j++) {
      curves[i][j].update(topDrivers[i].dotPos.x - topDrivers[i].pos.x, leftDrivers[j].dotPos.y - leftDrivers[j].pos.y);
      curves[i][j].render();
    }
  }
}