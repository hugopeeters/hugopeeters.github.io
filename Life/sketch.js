let grid;
let next;
let n;
let running;
let sz;

function setup() {
  createP().parent('canvas');
  let canvas = createCanvas(800, 800);
  canvas.parent('canvas');
  createP().parent('canvas');
  sz = 10;
  n = floor(width / sz);
  grid = new Array(n);
  next = new Array(n);
  for (let i = 0; i < n; i++) {
    grid[i] = new Array(n);
    next[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  running = false;
}

function draw() {
  background(51);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      grid[i][j].render();
    }
  }
  if (running && frameCount % 5 == 0) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        next[i][j] = grid[i][j].next();
      }
    }
    grid = next;
  }
}


function mouseClicked() {
  let i = floor(mouseX / sz);
  let j = floor(mouseY / sz);
  grid[i][j].toggle();
}

function keyPressed() {
  if (key == ' ') {
    running = !running;
  }
}