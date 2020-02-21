class Particle {

  constructor(pos) {
    this.pos = pos;
    this.ppos = pos.copy();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.radius = 2;
  }

  render() {
    //noStroke();
    //fill(frameCount / 10 % 255, 255, 255, 100);
    //ellipse(pos.x, pos.y, radius, radius);
    strokeWeight(1);
    stroke(frameCount / 10 % 255, 255, 255, lineOpacity);
    //stroke(random(25), 255, 255, lineOpacity);
    line(this.ppos.x, this.ppos.y, this.pos.x, this.pos.y);
  }

 update() {
    let force = flowfield[round(this.pos.x/fieldResolution)][round(this.pos.y/fieldResolution)];
    force.setMag(fieldForce);
    this.acc.add(force);
    this.vel.add(this.acc);
    this.vel.limit(maxVel);
    this.ppos = this.pos.copy();
    this.pos.add(this.vel);
    if (this.pos.x <= 0) { 
      this.pos.x += width;
      this.ppos.x += width;
    }
    if (this.pos.x >= width) { 
      this.pos.x -= width;
      this.ppos.x -= width;
    }
    if (this.pos.y <= 0) { 
      this.pos.y += height;
      this.ppos.y += height;
    }
    if (this.pos.y >= height) { 
      this.pos.y -= height;
      this.ppos.y -= height;
    }
    this.acc.setMag(0);
  }
}