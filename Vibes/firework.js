class Firework {
  
    constructor() {
      this.hue = floor(random(0, 50));
      this.firework = new Particle(random(width), height, true, this.hue);
      this.exploded = false;
      this.particles = [];
    }
    
    update(){
      if (!this.exploded){
        this.firework.applyForce(gravity);
        this.firework.update();
        if(this.firework.vel.y >= 0){
          this.exploded = true;
          this.explode();
        }
      }
      for (let i = this.particles.length - 1; i >= 0; i--) {
        let p = this.particles[i];
        p.applyForce(gravity);
        p.update();
        if(p.done()){
          this.particles.splice(i, 1);
        }
      }
    }
    
    show() {
      if (!this.exploded){
        this.firework.show();
      }
      for(let p of this.particles){
        p.show();
      }
    }
    
    explode(){
      for(let i = 0; i < 200; i++){
        let p = new Particle(this.firework.pos.x, this.firework.pos.y, false, this.hue);
        this.particles.push(p);
      }
    } 
    
    done(){
      if (this.exploded && this.particles.length == 0){
        return true;
      } else {
        return false;
      }
    }
  
  }