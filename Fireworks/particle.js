class Particle {
    
    constructor(x_, y_, f_, h_) {  
      this.hue = h_;
      this.firework = f_;
      this.lifespan = 255;
      this.pos = createVector(x_, y_);
      if(this.firework){
        this.vel = createVector(0, random(-14, -8));
      } else {
        this.vel = p5.Vector.random2D();
        //this.vel.mult(8);
        this.vel.mult(random(1, 8));
      }
      this.acc = createVector(0, 0); 
    }
    
    applyForce(force){
      this.acc.add(force);
    }
    
    update() {
      if(!this.firework){
        this.vel.mult(0.9);
        this.lifespan -= 6;
      }
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
    
    show(){
      if (!this.firework){
        strokeWeight(2);
        stroke(this.hue, 255, 255, this.lifespan);
      } else {
        strokeWeight(4);
        stroke(this.hue, 255, 255);
      }
      point(this.pos.x, this.pos.y);
    }
    
    done(){
      if (this.lifespan < 0){
        return true;
      } else {
        return false;
      }
    }
  }