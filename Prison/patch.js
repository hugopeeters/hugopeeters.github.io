class Patch {

  constructor(k) {
    this.k = k;
    this.sz = floor(canvasSize / N);
    this.score = 0;
    this.reset();
    this.setColor();
    this.i = this.k % N;
    this.j = floor(this.k / N);
    let x = (this.i + 0.5) * this.sz;
    let y = (this.j + 0.5) * this.sz;
    this.pos = createVector(x, y);
    this.neighbours = new Array(8);
  }

  reset() {
    this.coop = random(1) >= 0.5;
    this.prevCoop = this.coop;
  }

  setColor() {
    if (this.coop && this.prevCoop) {
      this.c = color(255, 0, 0);
    } else if (this.coop && !this.prevCoop) {
      this.c = color(255, 100, 100);
    } else if (!this.coop && !this.prevCoop) {
      this.c = color(0, 0, 255);
    } else {
      this.c = color(100, 100, 255);
    }
  }

  update() {
    this.findNeighbours();
    this.calculateScore();
    this.updateStrategy();
    this.setColor();
  }

  render() {
    noStroke();
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, this.sz, this.sz);
  }

  findNeighbours() {
    let z = 0;
    for (var a = -1; a <= 1; a++) {
      for (var b = -1; b <= 1; b++) {
        let iN = (this.i + a + N) % N;
        let jN = (this.j + b + N) % N;
        let kN = jN * N + iN;
        this.neighbours[z] = grid[kN];
        z++;
      }
    }
  }

  calculateScore() {
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      if (this.neighbours[i].isCooperating()) {
        sum++;
      }
    }
    if (this.coop) {
      this.score = sum;
    } else {
      this.score = daf * sum;
    }
  }

  updateStrategy() {
    let highScore = this.score;
    let topStrategy = this.coop;
    for (let i = 0; i < this.neighbours.length; i++) {
      if (this.neighbours[i].getScore() > highScore) {
        highScore = this.neighbours[i].getScore();
        topStrategy = this.neighbours[i].isCooperating();
      }
    }
    this.nextCoop = topStrategy;
  }

  next() {
    this.prevCoop = this.coop;
    this.coop = this.nextCoop;
  }

  isCooperating() {
    return this.coop;
  }

  getScore() {
    return this.score;
  }
}