let grid;
let n;
let sz;
let selectedColor = 255;

function setup() {
  createP().parent('canvas');
  let canvas = createCanvas(800, 800);
  canvas.parent('canvas');
  createP().parent('canvas');
  let btn = createButton('red');
  btn.parent('canvas');
  btn.mouseClicked(setRed);
  sz = 10;
  n = floor(width / sz);
  grid = new Array(n);
  for (let i = 0; i < n; i++) {
    grid[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
}

function draw() {
  background(51);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      grid[i][j].render();
    }
  }
}

function mouseClicked() {
  let i = floor(mouseX / sz);
  let j = floor(mouseY / sz);
  grid[i][j].toggle();
}

function mouseDragged() {
  let i = floor(mouseX / sz);
  let j = floor(mouseY / sz);
  grid[i][j].paint();
}

function setRed() {
  selectedColor = color(255, 0, 0);
}