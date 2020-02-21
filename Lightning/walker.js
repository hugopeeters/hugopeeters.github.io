class Walker {

  constructor(pos) {
    this.pos = pos;
    this.stuck = false;
    this.r = radius;
    this.hue = 0;
  }

 walk() {
    let vel = p5.Vector.random2D();
    this.pos.add(vel);
    this.pos.x = constrain (this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }

 isStuck(others) {
    for (let i = 0; i < others.length; i++) {
      let d = p5.Vector.dist(others[i].pos, this.pos);
      if (d < this.r + others[i].r) {
        this.stuck = true;
        return true;
      }
    }
    return false;
  }

 show() {
    colorMode(HSB);
    noStroke();
    if (this.stuck) {
      //fill(180, 255, this.hue % 255); //lightning fill
      fill(this.hue % 360, 255, 255); //rainbow fill
      ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    } else {
      fill(0, 255, 255);
      ellipse(this.pos.x, this.pos.y, 2, 2);
    }
  }
}