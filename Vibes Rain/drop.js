class Drop {

  constructor() {
    this.ppos = createVector(0, 0);
    this.pos = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.terminalvelocity = 10;
    this.z = 0;
  }

  randomize() {
    this.pos = createVector(random(0, width), random(-2 * height, -100));
    this.ppos = this.pos.copy();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.z = 3 * pow(random(0.5, 1), 3);
  }

  update() {
    this.ppos = this.pos.copy();
    this.acc.add(gravity);
    let xOff = this.pos.x / width;
    let yOff = this.z;
    wind = w.copy();
    wind.x += 0.9 * (noise(xOff, yOff, wOff) - 0.2);
    wOff += 0.5;

    this.acc.add(wind);

    this.vel.add(this.acc);
    this.vel.limit(this.terminalvelocity * this.z);
    this.pos.add(this.vel);
    if (this.pos.y > height && this.ppos.y > height) {
      this.randomize();
    }
    if (this.pos.x < 0 && this.ppos.x < 0) {
      this.pos.x = width;
      this.ppos.x = width;
    }
    if (this.pos.x > width && this.ppos.x > width) {
      this.pos.x = 0;
      this.ppos.x = 0;
    }
  }

  render() {
    noFill();
    let x = floor(this.pos.x);
    let y = floor(this.pos.y);
    if (x >= 0 && x < width && y >= 0 && y < height) {
      if (pxl[x][y]) {
        stroke(255, 0, 0, 150);
      } else {
        stroke(220, 220, 255, 150);
      }
      strokeWeight(1 * this.z);
      line(this.ppos.x, this.ppos.y, this.pos.x, this.pos.y);
    }
  }
}