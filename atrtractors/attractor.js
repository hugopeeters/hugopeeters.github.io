class Attractor {
  
  constructor() {
    //the margin prevents attractors starting too far from the center of the screen
    this.pos = createVector(random(margin, width - margin), random(margin, height - margin));
    this.vel = createVector(0, 0);
    this.dimX = random(10);
    this.dimY = random(10);
    this.acc = createVector(noise(this.dimX, 0)-0.5, noise(0, this.dimY)-0.5);
    this.mass = random(1, 10);
  }
  
  update(){
    this.acc = createVector(noise(this.dimX, 0)-0.5, noise(0, this.dimY)-0.5);
    this.vel.add(this.acc);
    this.vel.setMag(this.speed);
    this.acc = createVector(0, 0);
    this.pos.add(this.vel); //update the position
    this.pos.x += noise(this.dimX);
    //bounce off the walls
    if(this.pos.x < 0  && this.vel.x < 0){
      this.vel.x *= -1;
    }
    if(this.pos.y < 0 && this.vel.y < 0){
      this.vel.y *= -1;
    }
    if(this.pos.x > width && this.vel.x > 0){
      this.vel.x *= -1;
    }
    if(this.pos.y > height && this.vel.y > 0){
      this.vel.y *= -1;
    }
    this.dimX += 0.1;
    this.dimY += 0.1;
  }
  
  render(){
    colorMode(RGB);
    strokeWeight(4);
    stroke(0, 255, 0);
    point(this.pos.x, this.pos.y);
  }
  
}