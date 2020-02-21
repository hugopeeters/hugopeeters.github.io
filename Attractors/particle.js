class Particle {

  constructor(pos) {
    this.pos = pos;
    this.prev = pos.copy();
    this.vel = createVector(random(-vinit, vinit), random(-vinit, vinit));
    this.acc = createVector(0, 0);
  }

  render() {
    strokeWeight(strW);
    let v = round(this.vel.mag()); //the magnitude of the velocity
    let c = round(map(v * random(0.9, 1.1), 0, maxSpeed, 0, 100)); //color is mapped to the speed of the particle with some random difference to smooth out the gradients
    c = (c + colorOffset + frameCount/10) % 255; //drifting colors with frameCount and rolling over with modulo
    colorMode(HSB, 255, 100, 100);
    stroke(c, 100, 100, alphaX);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    //point(this.pos.x, this.pos.y);
    this.prev = this.pos.copy();
  }

 update() {
    this.vel.add(this.acc); //apply acceleration
    //limit speed
    if (this.vel.mag() > maxSpeed) {
      this.vel.setMag(maxSpeed);
    }
    this.acc = createVector(0, 0); //reset the acceleration
    this.pos.add(this.vel); //update the position
    //bounce off the walls
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  getAttracted(attractor) {
    //attraction algorithm
    let force = attractor.pos.copy().sub(this.pos); //get the direction of the force
    let strength = attractor.mass / force.magSq(); //calculate the strength of the force
    strength = constrain(strength, 0.1, 50); //constrain the force's strength to prevent issues
    force.setMag(strength); //set the strength of the force
    this.acc.add(force); //apply the force
  }
}