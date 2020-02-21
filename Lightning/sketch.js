//Diffusion Limited Aggregation
// NOTE: this runs really really slow in p5js. Much better in Processing.

let tree;
let walkers;
let maxWalkers = 50;
let iterations = 200;
let radius = 6;
let showAll = true;
let shrinkage = 0.995;
let h = 0; //rainbow colors
//float h = 100; //lightning colors

function setup() {
  createP().parent('canvas');
  let canvas = createCanvas(400, 300);
  canvas.parent('canvas');
  createP().parent('canvas');
  colorMode(HSB);
  tree = new Array(0);
  walkers = new Array(0);
  tree[0] = new Walker(createVector(width / 2, 0));
  tree[0].stuck = true;
}

function draw() {

  background(0);

  for (let i = 0; i < tree.length; i++) {
    tree[i].show();
  }
  if (radius > 1) {
    if (showAll) {
      for (let i = 0; i < walkers.length; i++) {
        walkers[i].show();
      }
    }
    for (let n = 0; n < iterations; n++) {
      for (let i = walkers.length - 1; i >= 0; i--) {
        walkers[i].walk();
        if (walkers[i].isStuck(tree)) {
          radius *= shrinkage;
          walkers[i].r = radius;
          h += 0.5; //rainbow
          //h += 0.25; //lightning
          walkers[i].hue = floor(h);
          tree.push(walkers[i]);
          walkers.splice(i, 1);
        }
      }
    }

    while (walkers.length < maxWalkers) {
      walkers.push(new Walker(bottomHalf()));
    }
  }
}


function bottomHalf() {
  return createVector(random(width), random(height / 2, height));
}